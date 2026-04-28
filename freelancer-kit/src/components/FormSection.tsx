import React from 'react';
import { FormData } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  selectedTool: 'invoice' | 'contract' | 'nda' | null;
}

export default function FormSection({ data, onChange, setFormData, selectedTool }: Props) {
  if (!selectedTool) return null;

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...data.invoiceItems];
    newItems[index] = { ...newItems[index], [field]: value } as any;
    
    if (field === 'hours' || field === 'rate') {
      const h = parseFloat(field === 'hours' ? value : newItems[index].hours) || 0;
      const r = parseFloat(field === 'rate' ? value : newItems[index].rate) || 0;
      newItems[index].amount = (h * r).toFixed(2);
    }
    
    let newTotal = 0;
    newItems.forEach(item => {
      newTotal += parseFloat(item.amount) || 0;
    });

    setFormData(prev => ({ ...prev, invoiceItems: newItems, amount: newTotal.toFixed(2) }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      invoiceItems: [...prev.invoiceItems, { description: '', hours: '', rate: '', amount: '' }]
    }));
  };

  const removeItem = (index: number) => {
    if (data.invoiceItems.length <= 1) return;
    const newItems = data.invoiceItems.filter((_, i) => i !== index);
    
    let newTotal = 0;
    newItems.forEach(item => {
      newTotal += parseFloat(item.amount) || 0;
    });

    setFormData(prev => ({
      ...prev,
      invoiceItems: newItems,
      amount: newTotal.toFixed(2)
    }));
  };

  // Shadcn-like sleek styling constants
  const inputClass = "flex min-h-[40px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:text-slate-50";
  const labelClass = "text-sm font-medium leading-none mb-2 block text-slate-900 dark:text-slate-200";
  const sectionClass = "mb-8 pb-8 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0 last:mb-0";
  const headingClass = "text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-6";

  return (
    <div className="w-full">
      
      {/* 0. Invoice Customization (Invoice Only) */}
      {selectedTool === 'invoice' && (
        <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 shadow-sm">
          <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-300">✨</span> 
            Invoice Customization
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Theme Color</label>
              <div className="flex gap-3 items-center">
                <input type="color" name="themeColor" value={data.themeColor} onChange={onChange} className="h-10 w-16 rounded-md cursor-pointer border border-slate-200 dark:border-slate-800 p-0.5" />
                <span className="text-sm text-slate-500 font-mono bg-white dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">{data.themeColor}</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Logo URL (Optional)</label>
              <input type="text" name="logoUrl" value={data.logoUrl} onChange={onChange} placeholder="https://..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <select name="currency" value={data.currency} onChange={onChange} className={inputClass}>
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="₹">INR (₹)</option>
                <option value="A$">AUD (A$)</option>
                <option value="C$">CAD (C$)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Invoice Number</label>
              <input type="text" name="invoiceNumber" value={data.invoiceNumber} onChange={onChange} placeholder="INV-0001" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* 1. Universal Base Information */}
      <div className={sectionClass}>
        <h2 className={headingClass}>1. Personal & Company Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Your Full Name</label>
            <input type="text" name="name" value={data.name} onChange={onChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" name="email" value={data.email} onChange={onChange} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Full Physical Address</label>
            <input type="text" name="freelancerAddress" value={data.freelancerAddress} onChange={onChange} className={inputClass} />
          </div>
          {selectedTool === 'invoice' && (
            <>
              <div>
                <label className={labelClass}>Company Name (Optional)</label>
                <input type="text" name="companyName" value={data.companyName} onChange={onChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="text" name="companyPhone" value={data.companyPhone} onChange={onChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Website URL</label>
                <input type="text" name="companyWebsite" value={data.companyWebsite} onChange={onChange} className={inputClass} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Client Information */}
      <div className={sectionClass}>
        <h2 className={headingClass}>2. Client Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Client Name / Company</label>
            <input type="text" name="clientName" value={data.clientName} onChange={onChange} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Client Address</label>
            <input type="text" name="clientAddress" value={data.clientAddress} onChange={onChange} className={inputClass} />
          </div>
        </div>
      </div>

      {/* 3. Project Information (Contract/NDA Only) */}
      {selectedTool !== 'invoice' && (
        <div className={sectionClass}>
          <h2 className={headingClass}>3. Project Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className={labelClass}>Project Name</label>
              <input type="text" name="projectName" value={data.projectName} onChange={onChange} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Project Description</label>
              <textarea name="projectDescription" value={data.projectDescription} onChange={onChange} rows={3} className={`${inputClass} resize-none py-3`} />
            </div>
            <div>
              <label className={labelClass}>Effective Date</label>
              <input type="date" name="startDate" value={data.startDate} onChange={onChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input type="date" name="endDate" value={data.endDate} onChange={onChange} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Total Amount ($)</label>
              <input type="number" name="amount" value={data.amount} onChange={onChange} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* 3. Invoice Items & Dates (Invoice Only) */}
      {selectedTool === 'invoice' && (
        <div className={sectionClass}>
          <h2 className={headingClass}>3. Invoice Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className={labelClass}>Invoice Date</label>
              <input type="date" name="startDate" value={data.startDate} onChange={onChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Due Date</label>
              <input type="date" name="endDate" value={data.endDate} onChange={onChange} className={inputClass} />
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Line Items</label>
            
            {data.invoiceItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 relative group">
                <div className="col-span-12 sm:col-span-5">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1 sm:hidden">Description</label>
                  <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Item description" className={inputClass} />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1 sm:hidden">Qty/Hrs</label>
                  <input type="number" value={item.hours} onChange={(e) => handleItemChange(index, 'hours', e.target.value)} placeholder="0" className={inputClass} />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1 sm:hidden">Rate</label>
                  <input type="number" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} placeholder="0.00" className={inputClass} />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1 sm:hidden">Amount</label>
                  <input type="number" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} placeholder="0.00" className={`${inputClass} bg-slate-100 dark:bg-slate-950 font-medium text-slate-900 dark:text-slate-100 cursor-not-allowed border-transparent`} readOnly tabIndex={-1} />
                </div>
                <div className="col-span-1 flex justify-end items-center pt-1 sm:pt-2">
                  <button onClick={() => removeItem(index)} disabled={data.invoiceItems.length <= 1} className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-1.5 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            <button onClick={addItem} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2">
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </button>
          </div>
        </div>
      )}

      {/* 4. Invoice Specific Financials */}
      {selectedTool === 'invoice' && (
        <>
          <div className={sectionClass}>
            <h2 className={headingClass}>4. Financial Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Discount ({data.currency})</label>
                <input type="number" name="discount" value={data.discount} onChange={onChange} placeholder="0" className={inputClass} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>Tax Name</label>
                  <input type="text" name="taxName" value={data.taxName} onChange={onChange} placeholder="Tax" className={inputClass} />
                </div>
                <div className="w-24">
                  <label className={labelClass}>Rate (%)</label>
                  <input type="number" name="taxRate" value={data.taxRate} onChange={onChange} placeholder="0" className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className={headingClass}>5. Bank Details (Receiving)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Account Holder</label>
                <input type="text" name="accountHolder" value={data.accountHolder} onChange={onChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Account Number</label>
                <input type="text" name="accountNumber" value={data.accountNumber} onChange={onChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>ABA / Routing</label>
                <input type="text" name="abaRouting" value={data.abaRouting} onChange={onChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Wire Routing / SWIFT</label>
                <input type="text" name="wireRouting" value={data.wireRouting} onChange={onChange} className={inputClass} />
              </div>
            </div>
          </div>
          
          <div className={sectionClass}>
            <h2 className={headingClass}>6. Additional Notes</h2>
            <div>
              <label className={labelClass}>Notes / Terms</label>
              <textarea name="notes" value={data.notes} onChange={onChange} rows={3} placeholder="Thank you for your business!" className={`${inputClass} resize-none py-3 h-auto`} />
            </div>
          </div>
        </>
      )}

      {/* 4. Contract/NDA Legal Overrides */}
      {selectedTool !== 'invoice' && (
        <div className={sectionClass}>
          <h2 className={headingClass}>4. Legal Parameters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Governing State</label>
              <input type="text" name="governingState" value={data.governingState} onChange={onChange} placeholder="CA" className={inputClass} />
            </div>
            {selectedTool === 'contract' && (
              <div>
                <label className={labelClass}>Non-Compete (Months)</label>
                <input type="number" name="nonCompeteMonths" value={data.nonCompeteMonths} onChange={onChange} className={inputClass} />
              </div>
            )}
            <div>
              <label className={labelClass}>Non-Solicit (Months)</label>
              <input type="number" name="nonSolicitMonths" value={data.nonSolicitMonths} onChange={onChange} className={inputClass} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
