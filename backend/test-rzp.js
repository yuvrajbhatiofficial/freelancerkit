const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_SbtkswNbu2Zcaf',
  key_secret: 'fWV5GUfyAtvN9wCW5cGHsXzA',
});

razorpay.orders.create({
  amount: 249900,
  currency: 'INR',
  receipt: 'shorter_receipt_id'
}).then(console.log).catch(console.error);
