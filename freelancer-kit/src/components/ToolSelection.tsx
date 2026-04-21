import React from 'react';
import { FileText, FileSignature, Lock } from 'lucide-react';

interface Props {
  onSelect: (tool: 'invoice' | 'contract' | 'nda') => void;
}

export default function ToolSelection({ onSelect }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border-none shadow-none md:p-8 rounded-xl md:shadow-sm md:border md:border-gray-100 md:dark:border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">Which document do you need?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onSelect('invoice')}
          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all hover:scale-[1.02]"
        >
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Invoice</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">Bill clients and request payments professionally.</p>
        </button>

        <button
          onClick={() => onSelect('contract')}
          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all hover:scale-[1.02]"
        >
          <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
            <FileSignature className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Contract</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">Establish legal terms and conditions for projects.</p>
        </button>

        <button
          onClick={() => onSelect('nda')}
          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all hover:scale-[1.02]"
        >
          <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">NDA</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">Protect confidential information and trade secrets.</p>
        </button>
      </div>
    </div>
  );
}
