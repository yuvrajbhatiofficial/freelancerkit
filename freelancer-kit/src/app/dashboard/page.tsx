"use client";

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ArrowLeft, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import ToolSelection from '@/components/ToolSelection';
import FormSection from '@/components/FormSection';
import ActionButtons from '@/components/ActionButtons';
import DocumentTemplates from '@/components/DocumentTemplates';
import DocumentPreview from '@/components/DocumentPreview';
import { FormData } from '@/types';
import { usePayment } from '@/hooks/usePayment';
import { useUserRegion } from '@/hooks/useUserRegion';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTool, setSelectedTool] = useState<'invoice' | 'contract' | 'nda' | null>(null);

  const { isPaid, loading: paymentLoading } = usePayment();
  const { getPrice } = useUserRegion();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login');
      } else {
        setAuthLoading(false);
      }
    });
  }, [router]);

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', freelancerAddress: '', companyName: '', companyWebsite: '', companyPhone: '',
    clientName: '', clientAddress: '', projectName: '', projectDescription: '',
    amount: '', hourlyRate: '', hours: '', taxRate: '0', discount: '0',
    startDate: '', endDate: '', nonCompeteMonths: '12', nonSolicitMonths: '12', governingState: '',
    accountHolder: '', accountNumber: '', abaRouting: '', wireRouting: '',
    invoiceItems: [{ description: '', hours: '', rate: '', amount: '' }],
    logoUrl: '', themeColor: '#1e293b', currency: '$', taxName: 'Tax', invoiceNumber: '00001', notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name.trim() !== '' && formData.clientName.trim() !== '';

  const handleToolSelect = (tool: 'invoice' | 'contract' | 'nda') => {
    setSelectedTool(tool);
    setCurrentStep(2);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Securing environment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <Toaster position="top-center" />
      
      <div className={`mx-auto transition-all duration-500 ${currentStep === 2 ? 'max-w-[1400px]' : 'max-w-4xl'}`}>
        
        {!isPaid && (
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200 dark:border-blue-900 rounded-xl p-4 mb-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left transition-colors">
            <div>
              <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Zap className="w-4 h-4" /> <span>Launch Offer – Limited Time</span>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Freelancer legal docs usually cost $50+. <span className="font-bold">Get lifetime access for just {getPrice()}!</span>
              </p>
            </div>
            <div className="mt-3 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-gray-400">
              <span className="flex items-center">✓ No signup</span>
              <span className="flex items-center">✓ 100% In-Browser</span>
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-gray-100 tracking-tight sm:text-5xl mb-4 flex items-center justify-center gap-3">
            Freelancer Document Kit
            {isPaid && (
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-yellow-900 bg-gradient-to-r from-yellow-300 to-yellow-500 py-1 px-3 rounded-lg shadow-sm border border-yellow-400">
                PRO
              </span>
            )}
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-400">
            Professional Invoices, Contracts & NDAs — instantly generated.
          </p>
        </div>

        {/* Stepper Logic */}
        <div className="mb-8 flex items-center justify-center space-x-1 sm:space-x-4">
          <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}>1</span>
            <span className="font-medium hidden sm:block">Select Tool</span>
          </div>
          <div className="w-16 sm:w-24 h-px bg-gray-300 dark:bg-gray-800"></div>
          <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}>2</span>
            <span className="font-medium hidden sm:block">Edit & Preview</span>
          </div>
        </div>

        {currentStep === 1 && (
          <ToolSelection onSelect={handleToolSelect} />
        )}

        {currentStep === 2 && (
          <div className="space-y-6 max-w-full">
            <button onClick={() => setCurrentStep(1)} className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Selection
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
              {/* Form Sidebar */}
              <div className="lg:col-span-5 xl:col-span-4 h-auto lg:h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar pb-8 lg:pb-32">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 p-6 transition-colors duration-300">
                  <FormSection data={formData} onChange={handleInputChange} setFormData={setFormData} selectedTool={selectedTool} />
                </div>
              </div>

              {/* Live Preview & Actions */}
              <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] flex flex-col space-y-6 overflow-y-auto custom-scrollbar pb-8 lg:pr-2">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 p-6 transition-colors duration-300 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Ready to Generate?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review your document below before downloading.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-end">
                    <ActionButtons isFormValid={isFormValid} selectedTool={selectedTool} />
                    {!isFormValid && (
                      <p className="text-xs text-right text-red-500 dark:text-red-400 mt-2">
                        Missing required fields.
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 p-4 sm:p-6 transition-colors duration-300 overflow-x-auto flex justify-center shrink-0">
                  <div className="w-full max-w-[800px] origin-top transition-transform">
                    <DocumentPreview formData={formData} selectedTool={selectedTool} isPaid={isPaid} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden templates for PDF generation */}
        <DocumentTemplates data={formData} isPaid={isPaid} isPreview={false} />
      </div>
    </div>
  );
}
