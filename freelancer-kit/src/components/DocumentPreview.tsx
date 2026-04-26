"use client";

import React, { useRef, useEffect, useState } from 'react';
import { FormData } from '@/types';
import DocumentTemplates from './DocumentTemplates';

interface Props {
  formData: FormData;
  selectedTool: 'invoice' | 'contract' | 'nda' | null;
  isPaid: boolean;
}

export default function DocumentPreview({ formData, selectedTool, isPaid }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // We want to scale down the 800px document to fit the container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Padding adjustment: container has p-4, so inner width is containerWidth - 32
        // We scale the 800px document to fit perfectly
        const newScale = Math.min((containerWidth - 32) / 800, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (!selectedTool) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <div className="w-full max-w-2xl text-center mb-3">
        <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Live Document Preview</span>
        </span>
      </div>
      
      {/* Glassmorphic Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-2xl relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-gray-800 shadow-2xl rounded-2xl p-4 overflow-hidden flex justify-center transition-colors select-none"
        style={{
          // Set a dynamic height based on scale to avoid huge empty spaces, 
          // 1131px is roughly A4 height at 800px width.
          height: `${1131 * scale + 32}px` 
        }}
      >
        {/* Scaled Inner Content */}
        <div 
          className={`origin-top absolute top-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 ${!isPaid ? 'blur-[1.5px] opacity-80 pointer-events-none' : ''}`}
          style={{ transform: `scale(${scale})`, width: '800px' }}
        >
          <DocumentTemplates 
            data={formData} 
            isPaid={isPaid} 
            isPreview={true} 
            selectedTool={selectedTool} 
          />
        </div>

        {/* Watermark Overlay for screenshot protection */}
        {!isPaid && (
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center overflow-hidden mix-blend-multiply dark:mix-blend-overlay">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="transform -rotate-45 text-[3rem] sm:text-[5rem] font-black text-slate-400 dark:text-white whitespace-nowrap opacity-30 tracking-widest my-4">
                PREVIEW ONLY
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
