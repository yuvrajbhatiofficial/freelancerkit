require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 4000;

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'placeholder'
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder',
});

// Middleware for Stripe webhook (MUST be raw body)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhooks/stripe') {
    express.raw({ type: 'application/json' })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'https://freelancerkit-eosin.vercel.app'], // Add your deployed frontend URLs here or in Render's ENV
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Region'],
  credentials: true
}));

// --- Rate Limiting ---
app.set('trust proxy', 1); // Trust first proxy (Render, Vercel, Nginx, etc)

const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Too many payment requests from this IP, please try again later' }
});

app.use('/api/', globalApiLimiter);
app.use('/api/payments/', paymentLimiter);

// --- Auth Middleware ---
// Validates cryptographic Supabase JWT tokens specifically
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized', details: error });
  }

  req.user = user;

  // Ensure user securely exists in our DB matching their Supabase Auth Record
  try {
    let dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email.split('@')[0],
        }
      });
      // create default un-paid subscription
      await prisma.subscription.create({
        data: {
          userId: user.id,
          isPaid: false,
          lifetimeAccess: false
        }
      });
    }
  } catch (e) {
    console.error("DB Sync Error setup:", e);
  }

  next();
};

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'FreelanceKit Backend API' });
});

// --- API Endpoints ---

// 1. Get User Status
app.get('/api/user/status', authenticate, async (req, res) => {
  try {
    const sub = await prisma.subscription.findUnique({
      where: { userId: req.user.id }
    });
    res.json({ isPaid: sub?.isPaid || false, lifetimeAccess: sub?.lifetimeAccess || false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

// 1.5 Delete User Account
app.delete('/api/user/account', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Delete user from Prisma (Cascade delete will remove relations if set up in DB)
    await prisma.user.delete({
      where: { id: userId }
    });

    // 2. Delete from Supabase Auth explicitly if Service Role Key is provided (Optional but required for full deletion)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const adminSupabase = createClient(
        process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      const { error: deleteAuthError } = await adminSupabase.auth.admin.deleteUser(userId);
      if (deleteAuthError) {
        console.error("Failed to delete user from Supabase Auth:", deleteAuthError);
      }
    } else {
      console.warn("SUPABASE_SERVICE_ROLE_KEY not found. User deleted locally but not from Supabase Auth.");
    }

    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// 2. Create Stripe Checkout Session
app.post('/api/payments/create-stripe-session', authenticate, async (req, res) => {
  try {
    const userRegion = req.headers['x-user-region'] || 'GLOBAL';
    if (userRegion === 'IN') {
      return res.status(403).json({ error: 'Indian users must use Razorpay' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FreelanceKit Premium Lifetime Access',
            },
            unit_amount: 300, // $3.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/dashboard`,
      client_reference_id: req.user.id,
      customer_email: req.user.email,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Create Razorpay Order
app.post('/api/payments/create-razorpay-order', authenticate, async (req, res) => {
  try {
    const userRegion = req.headers['x-user-region'];
    if (userRegion !== 'IN') {
      return res.status(403).json({ error: 'Razorpay is only available for Indian users' });
    }

    const amount = 19900; // ₹199.00
    const currency = 'INR';

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `r_${req.user.id.substring(0,8)}_${Date.now()}`,
      notes: {
        userId: req.user.id,
      }
    });

    res.json({
      orderId: order.id,
      amount,
      currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Verify Razorpay Payment (Client callback)
app.post('/api/payments/verify-razorpay', authenticate, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'placeholder')
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment legitimate
      // Record payment
      await prisma.payment.create({
        data: {
          userId: req.user.id,
          provider: 'razorpay',
          amount: 199,
          currency: 'INR',
          status: 'success'
        }
      });
      // Upgrade subscription
      await prisma.subscription.update({
        where: { userId: req.user.id },
        data: { isPaid: true, lifetimeAccess: true }
      });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Stripe Webhook
app.post('/api/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;

    if (userId) {
      await prisma.payment.create({
        data: {
          userId: userId,
          provider: 'stripe',
          amount: session.amount_total / 100,
          currency: session.currency,
          status: 'success'
        }
      });

      await prisma.subscription.update({
        where: { userId: userId },
        data: { isPaid: true, lifetimeAccess: true }
      });
    }
  }

  res.send();
});

// 6. Razorpay Webhook
app.post('/api/webhooks/razorpay', express.json(), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'placeholder';
  const sig = req.headers['x-razorpay-signature'];

  const body = JSON.stringify(req.body);
  const expectedSig = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (expectedSig === sig) {
    if (req.body.event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      const userId = payment.notes?.userId;

      if (userId) {
        // Create payment explicitly from webhook, if not already handled by verify endpoint
        await prisma.subscription.upsert({
          where: { userId: userId },
          update: { isPaid: true, lifetimeAccess: true },
          create: { userId: userId, isPaid: true, lifetimeAccess: true }
        });
      }
    }
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
