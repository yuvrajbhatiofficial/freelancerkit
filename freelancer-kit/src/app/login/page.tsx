"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/utils/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    let authError = null;
    let authData: any = null;

    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        authError = error;
        authData = data;
      } else {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        authError = error;
        authData = data;
        
        if (!error && data.user && data.user.identities?.length === 0) {
            authError = new Error('User already exists');
        }
      }

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
          router.push('/verify-email');
          return;
        }
        if (authError.message.toLowerCase().includes('rate limit')) {
          toast.error('Email rate limit exceeded! Please try a different email address or wait a few minutes.');
          setLoading(false);
          return;
        }
        throw authError;
      }

      if (!isLogin) {
        // If Supabase confirms signup but returns no session, they must verify their email!
        if (!authData?.session) {
          router.push('/verify-email');
          return;
        }
        toast.success('Account created successfully! Welcome to FreelanceKit.');
      } else {
        toast.success('Logged in safely!');
      }

      router.push('/dashboard');
      router.refresh();
      
    } catch (e: any) {
      toast.error(e.message || 'Authentication failed');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-[420px] bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl z-10 animate-fade-in">
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Sign in to access your premium documents.' : 'Get started to supercharge your freelancing.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="relative space-y-5">
          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 peer-focus:text-blue-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder-slate-600 peer"
                placeholder="freelancer@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 peer-focus:text-blue-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder-slate-600 peer"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="relative mt-8 text-center">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
