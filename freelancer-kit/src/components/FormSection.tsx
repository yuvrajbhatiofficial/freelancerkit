import React from 'react';
import { FormData } from '@/types';

interface Props {
  data: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  selectedTool: 'invoice' | 'contract' | 'nda' | null;
}

export default function FormSection({ data, onChange, selectedTool }: Props) {
  if (!selectedTool) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border-none shadow-none md:p-8 rounded-xl md:shadow-sm md:border md:border-gray-100 md:dark:border-gray-800">
      
      {/* 1. Universal Base Information */}
      <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">1. Personal & Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Full Name</label>
            <input type="text" name="name" value={data.name} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input type="email" name="email" value={data.email} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Physical Address</label>
            <input type="text" name="freelancerAddress" value={data.freelancerAddress} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          {selectedTool === 'invoice' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name (Optional)</label>
                <input type="text" name="companyName" value={data.companyName} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input type="text" name="companyPhone" value={data.companyPhone} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
                <input type="text" name="companyWebsite" value={data.companyWebsite} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Client Information */}
      <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">2. Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name / Company</label>
            <input type="text" name="clientName" value={data.clientName} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Address</label>
            <input type="text" name="clientAddress" value={data.clientAddress} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
        </div>
      </div>

      {/* 3. Project Information */}
      <div className={`${selectedTool === 'invoice' ? 'mb-8 border-b border-gray-100 dark:border-gray-800 pb-8' : ''}`}>
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">3. Project Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
            <input type="text" name="projectName" value={data.projectName} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description</label>
            <textarea name="projectDescription" value={data.projectDescription} onChange={onChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{selectedTool === 'invoice' ? 'Invoice Date' : 'Effective Date'}</label>
            <input type="date" name="startDate" value={data.startDate} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
          </div>

          {selectedTool !== 'invoice' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <input type="date" name="endDate" value={data.endDate} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Amount ($)</label>
                <input type="number" name="amount" value={data.amount} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Invoice Specific Financials */}
      {selectedTool === 'invoice' && (
        <>
          <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">4. Financial Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Hours</label>
                <input type="number" name="hours" value={data.hours} onChange={onChange} placeholder="e.g. 40" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hourly Rate ($)</label>
                <input type="number" name="hourlyRate" value={data.hourlyRate} onChange={onChange} placeholder="e.g. 50" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount ($)</label>
                <input type="number" name="discount" value={data.discount} onChange={onChange} placeholder="e.g. 100" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tax Rate (%)</label>
                <input type="number" name="taxRate" value={data.taxRate} onChange={onChange} placeholder="e.g. 5" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">5. Bank Details (Receiving)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Holder</label>
                <input type="text" name="accountHolder" value={data.accountHolder} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Number</label>
                <input type="text" name="accountNumber" value={data.accountNumber} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ABA Routing</label>
                <input type="text" name="abaRouting" value={data.abaRouting} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wire Routing</label>
                <input type="text" name="wireRouting" value={data.wireRouting} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Contract/NDA Legal Overrides */}
      {selectedTool !== 'invoice' && (
        <div className="pt-8 mt-2 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">4. Legal Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Governing State</label>
              <input type="text" name="governingState" value={data.governingState} onChange={onChange} placeholder="CA" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
            </div>
            {selectedTool === 'contract' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Non-Compete (Months)</label>
                <input type="number" name="nonCompeteMonths" value={data.nonCompeteMonths} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Non-Solicit (Months)</label>
              <input type="number" name="nonSolicitMonths" value={data.nonSolicitMonths} onChange={onChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100 dark:placeholder-gray-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
