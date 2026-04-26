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
    amount: '', hourlyRate: '', hours: '', taxRate: '', discount: '',
    startDate: '', endDate: '', nonCompeteMonths: '12', nonSolicitMonths: '12', governingState: '',
    accountHolder: '', accountNumber: '', abaRouting: '', wireRouting: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      
      <div className="max-w-4xl mx-auto">
        
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
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-gray-100 tracking-tight sm:text-5xl mb-4">
            Freelancer Document Kit
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-400">
            Professional Invoices, Contracts & NDAs — instantly generated.
          </p>
        </div>

        {/* Stepper Logic */}
        <div className="mb-8 flex items-center justify-center space-x-1 sm:space-x-4">
          <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}>1</span>
            <span className="font-medium hidden sm:block">Select</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-gray-300 dark:bg-gray-800"></div>
          <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}>2</span>
            <span className="font-medium hidden sm:block">Fill Details</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-gray-300 dark:bg-gray-800"></div>
          <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}>3</span>
            <span className="font-medium hidden sm:block">Generate</span>
          </div>
        </div>

        {currentStep === 1 && (
          <ToolSelection onSelect={handleToolSelect} />
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <button onClick={() => setCurrentStep(1)} className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Selection
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 p-6 md:p-8 transition-colors duration-300">
              <FormSection data={formData} onChange={handleInputChange} selectedTool={selectedTool} />
            </div>
            <div className="flex justify-end pt-4">
              <button
                disabled={!isFormValid}
                onClick={() => setCurrentStep(3)}
                className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm disabled:opacity-50 dark:disabled:opacity-40 transition-colors w-full sm:w-auto"
              >
                Next Step
              </button>
            </div>
            {!isFormValid && (
              <p className="text-sm text-center sm:text-right text-red-500 dark:text-red-400 mt-2">
                Please enter your name and client name to continue.
              </p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <button onClick={() => setCurrentStep(2)} className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Form
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 p-6 md:p-8 transition-colors duration-300">
              <DocumentPreview formData={formData} selectedTool={selectedTool} isPaid={isPaid} />
              <ActionButtons isFormValid={isFormValid} selectedTool={selectedTool} />
            </div>
          </div>
        )}

        {/* Hidden templates for PDF generation */}
        <DocumentTemplates data={formData} isPaid={isPaid} isPreview={false} />
      </div>
    </div>
  );
}
