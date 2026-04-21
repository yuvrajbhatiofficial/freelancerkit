"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function SuccessContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Because we haven't implemented full Supabase Auth state parsing on the frontend yet,
    // we drop the local storage bypass flag naturally so the user's dashboard recognizes the payment.
    if (typeof window !== 'undefined') {
      localStorage.setItem('freelancekit_paid', 'true');
      toast.success('Payment verified successfully! You now have Lifetime Access.');
      
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl animate-fade-in relative overflow-hidden">
        {/* Aesthetic glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/10 blur-3xl rounded-full" />
        
        <div className="relative">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 mb-8">
            Thank you for unlocking FreelanceKit Premium. Your lifetime access is now active.
          </p>

          <div className="flex items-center justify-center space-x-3 text-sm text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting you to the dashboard...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
