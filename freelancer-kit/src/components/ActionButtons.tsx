"use client";

import React, { useState } from 'react';
import { DownloadCloud, Loader2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import PricingModal from './PricingModal';
import { usePayment } from '@/hooks/usePayment';
import { useUserRegion } from '@/hooks/useUserRegion';

interface Props {
  isFormValid: boolean;
  selectedTool: 'invoice' | 'contract' | 'nda' | null;
}

export default function ActionButtons({ isFormValid, selectedTool }: Props) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [showPricing, setShowPricing] = useState(false);
  
  const { isPaid, loading } = usePayment();
  const { getPrice, getPaymentLink } = useUserRegion();

  if (!selectedTool) return null;

  const generatePDF = async (toolId: string) => {
    try {
      setGenerating(true);
      
      const elementId = `${toolId}-template`;
      const filename = `Freelance_${toolId.charAt(0).toUpperCase() + toolId.slice(1)}`;

      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      const element = document.getElementById(elementId);
      
      if (!element) {
        toast.error('Template not found');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 10));
      
      const opt = {
        margin:       [20, 0, 20, 0] as [number, number, number, number],
        filename:     `${filename}.pdf`,
        image:        { type: 'jpeg' as const, quality: 1 },
        html2canvas:  { scale: 3, useCORS: true, letterRendering: true, scrollY: 0, windowWidth: 800 },
        jsPDF:        { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const },
        pagebreak:    { mode: ['avoid-all', 'css'] }
      };

      await html2pdf().set(opt).from(element).save();
      toast.success(`${filename} generated!`);
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate document');
    } finally {
      setGenerating(false);
    }
  };

  const isLocked = !isPaid && selectedTool !== 'invoice';

  const handlePrimaryClick = () => {
    if (isLocked) {
      setShowPricing(true);
      return;
    }
    generatePDF(selectedTool);
  };

  const handleDownloadAll = async () => {
    if (isLocked) {
      setShowPricing(true);
      return;
    }
    // Sequential generation prevents dom blocking
    await generatePDF('invoice');
    await generatePDF('contract');
    await generatePDF('nda');
  };

  const displayTitle = selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1);

  return (
    <div className="flex flex-col items-center pt-8 space-y-6">
      <button
        onClick={handlePrimaryClick}
        disabled={generating}
        className={`flex items-center justify-center space-x-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 font-bold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 disabled:cursor-wait
          ${isLocked 
            ? 'bg-amber-500 hover:bg-amber-600 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-75'
          }`}
      >
        {generating ? <Loader2 className="w-6 h-6 animate-spin" /> : (
          isLocked ? <Lock className="w-6 h-6 text-white/90" /> : <DownloadCloud className="w-6 h-6" />
        )}
        <span className="text-lg">
          {isLocked ? `Unlock Content` : `Download ${displayTitle} ${!isPaid ? '(Free)' : ''}`}
        </span>
      </button>

      <button 
        onClick={handleDownloadAll}
        disabled={generating}
        className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
      >
        {!isPaid && <Lock className="w-4 h-4 mr-1 text-gray-400" />}
        <span>Download All Documents</span>
      </button>

      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)} 
        priceTag={getPrice()} 
        paymentLink={getPaymentLink()} 
      />
    </div>
  );
}
