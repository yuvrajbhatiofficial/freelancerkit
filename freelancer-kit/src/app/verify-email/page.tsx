"use client";

import React from 'react';
import { MailOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-[480px] bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl z-10 animate-fade-in text-center">
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex justify-center mb-6 relative">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <MailOpen className="w-10 h-10 text-blue-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
          Check your inbox
        </h1>
        
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          We've sent a verification link to your email address. Please click the link to confirm your account and access your dashboard.
        </p>

        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-8 text-sm text-slate-500 text-left">
          <p className="flex items-center">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            It might take a few minutes to arrive.
          </p>
          <p className="flex items-center mt-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            Don't forget to check your spam folder!
          </p>
        </div>

        <Link 
          href="/login"
          className="inline-flex items-center justify-center w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all shadow-sm group"
        >
          Return to login
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </div>
  );
}
