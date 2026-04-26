"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileSignature, FileText, Lock, CheckCircle2, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen font-sans overflow-hidden transition-colors">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-100/50 dark:from-blue-900/10 to-transparent -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">v2.0 is now live</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight max-w-4xl">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">freelance documents</span> in seconds.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed">
          Stop wasting time in Word. Generate beautifully formatted Invoices, NDAs, and Service Contracts with zero hassle and perfect PDF rendering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <Link
            href="/dashboard"
            className="inline-flex justify-center items-center space-x-2 px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 dark:hover:bg-blue-500 hover:-translate-y-0.5 transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto"
          >
            <span>Start Generating Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="inline-flex justify-center items-center px-8 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Everything you need to run your independent business.</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Skip the expensive legal fees. Our premium templates map dynamically to your project details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Stunning Invoices</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automatically calculates taxes, rates, and discounts. Generates a pixel-perfect, dual-column slate aesthetic invoice ready for your clients.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <FileSignature className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Service Contracts</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Protect your work with formal legal agreements. Customize governing states, non-compete clauses, and payment terms instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Bulletproof NDAs</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Build trust with enterprise clients. Generate comprehensive Non-Disclosure Agreements perfectly formatted on standard legal margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Security */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-900 rounded-full mb-8">
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>

          <h2 className="text-3xl font-bold mb-6">
            100% Secure & Local
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your sensitive client information never leaves your device. Documents are generated directly inside your browser architecture using a native PDF engine. No databases, no tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">No Sign Up Required</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">Total Privacy</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 dark:text-gray-300">Always Free</span>
            </div>

          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="py-32 bg-slate-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Ready to get paid faster?</h2>
          <Link
            href="/dashboard"
            className="inline-flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 px-10 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all w-full sm:w-auto"
          >
            <span>Launch FreelanceKit App</span>
            <ArrowRight className="w-5 h-5 hidden sm:block" />
          </Link>
        </div>
      </section>

    </div>
  );
}
