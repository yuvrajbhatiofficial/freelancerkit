import React, { useState } from 'react';
import { X, CheckCircle2, Lock, Loader2, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUserRegion } from '@/hooks/useUserRegion';
import { supabase } from '@/utils/supabaseClient';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  priceTag: string;
  paymentLink: string;
}

export default function PricingModal({ isOpen, onClose, priceTag, paymentLink }: Props) {
  const [loadingConfig, setLoadingConfig] = useState<'stripe' | 'razorpay' | null>(null);
  const { isIndia } = useUserRegion();

  if (!isOpen) return null;

  const handlePayment = async (provider: 'stripe' | 'razorpay') => {
    try {
      setLoadingConfig(provider);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast('Please login to continue with your purchase', { icon: '🔐' });
        window.location.href = '/login';
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freelancerkit.onrender.com';
      const endpoint = provider === 'razorpay'
        ? `${API_URL}/api/payments/create-razorpay-order`
        : `${API_URL}/api/payments/create-stripe-session`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'X-User-Region': isIndia ? 'IN' : 'GLOBAL'
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error('Server error JSON:', errorData);
        throw new Error(errorData?.error || 'Payment gateway error');
      }

      const data = await res.json();
      
      if (provider === 'razorpay') {
        const { orderId, amount, currency, keyId } = data;
        
        // Dynamically load Razorpay script
        const loadScript = () => new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

        const isLoaded = await loadScript();
        if (!isLoaded) {
          throw new Error('Razorpay SDK failed to load');
        }

        const options = {
          key: keyId,
          amount: amount,
          currency: currency,
          name: "FreelanceKit",
          description: "Premium Lifetime Access",
          order_id: orderId,
          handler: async function (response: any) {
            // Verify payment on backend
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://freelancerkit.onrender.com';
            const verifyRes = await fetch(`${API_URL}/api/payments/verify-razorpay`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            if (verifyRes.ok) {
              window.location.href = '/success';
            } else {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: "Freelancer",
            email: session.user.email,
          },
          theme: {
            color: "#3399cc"
          }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        onClose(); // close pricing modal
      } else {
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Invalid Stripe session URL');
        }
      }

    } catch (e) {
      toast.error('Failed to initiate payment');
      console.error(e);
    } finally {
      setLoadingConfig(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up ring-1 ring-gray-200 dark:ring-gray-800">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pb-6 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unlock All Documents</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Log in to securely purchase the freelance suite.
          </p>
        </div>

        <div className="p-8 bg-gray-50 dark:bg-gray-950/50">
          <ul className="space-y-4 mb-8">
            {[
              "Freelance Contract PDF",
              "NDA Agreement PDF",
              "No watermarks",
              "Unlimited generated downloads",
              "Lifetime browser access"
            ].map((benefit, i) => (
              <li key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">Usually $50+</p>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {priceTag} <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">one-time</span>
            </div>
          </div>

          <div className="space-y-3">
            {isIndia && (
              <button
                onClick={() => handlePayment('razorpay')}
                disabled={loadingConfig !== null}
                className="w-full flex items-center justify-center py-3.5 px-4 bg-[#3395FF] hover:bg-[#2B80EB] text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingConfig === 'razorpay' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify & Pay via Razorpay"}
              </button>
            )}
            <button
              onClick={() => handlePayment('stripe')}
              disabled={loadingConfig !== null}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingConfig === 'stripe' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (isIndia ? "Verify & Pay via Stripe" : "Verify & Pay to Unlock")}
            </button>
            
            <button
              onClick={onClose}
              disabled={loadingConfig !== null}
              className="w-full py-3.5 px-4 mt-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
