import React from 'react';
import { FormData } from '@/types';

interface Props {
  data: FormData;
  isPaid?: boolean;
  isPreview?: boolean;
  selectedTool?: 'invoice' | 'contract' | 'nda' | null;
}

export default function DocumentTemplates({ data, isPaid = false, isPreview = false, selectedTool = null }: Props) {
  const wrapperClass = isPreview 
    ? "" 
    : "absolute top-[200vh] -left-[9999px] pointer-events-none";

  return (
    <div className={wrapperClass} style={{ color: '#000000', backgroundColor: '#ffffff', borderColor: '#000000', textDecorationColor: '#000000', outlineColor: '#000000', columnRuleColor: '#000000' }}>
      {/* 1. Invoice Template */}
      {(!isPreview || selectedTool === 'invoice') && (
        <div id={isPreview ? undefined : "invoice-template"} className="bg-[#ffffff] text-[#1e293b] w-[800px] px-[40px] box-border text-[13px] font-sans border border-[#f3f4f6]">
        {/* Top Header Block */}
        <div className="px-12 pt-16 pb-12">
          <div className="flex justify-between items-start mb-12">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Logo" className="max-h-16 max-w-[200px] object-contain" />
            ) : (
              <h1 className="text-4xl font-bold tracking-tight" style={{ color: data.themeColor }}>Invoice</h1>
            )}
            {data.logoUrl && <h1 className="text-4xl font-bold tracking-tight" style={{ color: data.themeColor }}>Invoice</h1>}
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-bold mb-2 uppercase" style={{ color: data.themeColor }}>Your Company Name</h3>
              {data.companyName ? <p className="font-semibold">{data.companyName}</p> : <p className="font-semibold">{data.name || 'Your Name'}</p>}
              <p className="whitespace-pre-wrap leading-relaxed mt-1">{data.freelancerAddress || 'Building name\n123 Your Street\nCity, State, Country\nPostcode\nPhone'}</p>
            </div>
            <div className="pt-[22px] leading-relaxed">
              {data.companyPhone && <p>{data.companyPhone}</p>}
              <p>{data.email || 'your@email.com'}</p>
              {data.companyWebsite && <p>{data.companyWebsite}</p>}
            </div>
            <div>
              <h3 className="text-xs font-bold mb-2 uppercase" style={{ color: data.themeColor }}>Invoice Number</h3>
              <p>{data.invoiceNumber || '00001'}</p>
              <h3 className="text-xs font-bold mt-6 mb-2 uppercase" style={{ color: data.themeColor }}>Invoice Date</h3>
              <p>{data.startDate || 'MM/DD/YYYY'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-xs font-bold mb-2 uppercase" style={{ color: data.themeColor }}>Billed To</h3>
              <p className="font-semibold">{data.clientName || 'Client Name'}</p>
              <p className="whitespace-pre-wrap leading-relaxed mt-1 text-[#334155]">{data.clientAddress || 'Street address\nCity, State, Country\nZIP Code\nPhone'}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold mb-2 uppercase" style={{ color: data.themeColor }}>Project Details</h3>
              <p className="font-semibold">{data.projectName || 'Project name'}</p>
              <p className="whitespace-pre-wrap leading-relaxed mt-1 text-[#334155]">{data.projectDescription || 'Project Description'}</p>
            </div>
          </div>
        </div>

        {/* Middle Gray Block */}
        <div className="bg-[#f8fafc] px-12 py-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#cbd5e1]">
                <th className="py-3 font-bold text-[11px] uppercase tracking-widest w-1/2" style={{ color: data.themeColor }}>Description</th>
                <th className="py-3 font-bold text-[11px] uppercase tracking-widest text-right w-1/4" style={{ color: data.themeColor }}>Hrs/Qty</th>
                <th className="py-3 font-bold text-[11px] uppercase tracking-widest text-right w-1/4" style={{ color: data.themeColor }}>Rate</th>
                <th className="py-3 font-bold text-[11px] uppercase tracking-widest text-right w-1/4" style={{ color: data.themeColor }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.invoiceItems && data.invoiceItems.map((item, i) => (
                <tr key={i} className="border-b border-[#f1f5f9] last:border-0">
                  <td className="py-4 align-top text-[#334155] pr-4">{item.description || '-'}</td>
                  <td className="py-4 align-top text-right text-[#334155] pr-4">{item.hours || '0'}</td>
                  <td className="py-4 align-top text-right text-[#334155] pr-4">{data.currency}{item.rate || '0.00'}</td>
                  <td className="py-4 align-top text-right text-[#1e293b] font-medium">{data.currency}{item.amount || '0.00'}</td>
                </tr>
              ))}
              {(!data.invoiceItems || data.invoiceItems.length === 0) && (
                <tr>
                  <td className="py-4 align-top text-[#334155] pr-4">Freelance Services</td>
                  <td className="py-4 align-top text-right text-[#334155] pr-4">0</td>
                  <td className="py-4 align-top text-right text-[#334155] pr-4">{data.currency}0.00</td>
                  <td className="py-4 align-top text-right text-[#1e293b] font-medium">{data.currency}0.00</td>
                </tr>
              )}
              <tr>
                <td colSpan={4} className="border-b border-[#cbd5e1] pt-6"></td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mt-8">
            <div className="w-[280px]">
              <div className="flex justify-between py-1.5 text-xs font-bold uppercase" style={{ color: data.themeColor }}>
                <span>Subtotal</span>
                <span className="text-[#1e293b]">{data.currency}{data.amount || '0.00'}</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs font-bold uppercase" style={{ color: data.themeColor }}>
                <span>Discount</span>
                <span className="text-[#1e293b]">-{data.currency}{data.discount || '0.00'}</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs font-bold uppercase" style={{ color: data.themeColor }}>
                <span>{data.taxName || 'Tax'} ({data.taxRate || '0'}%)</span>
                <span className="text-[#1e293b]">{data.currency}{((Number(data.amount || 0) - Number(data.discount || 0)) * (Number(data.taxRate || 0) / 100)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom White Block */}
        <div className="bg-[#ffffff] px-12 py-10 pb-16">
          <div className="flex justify-end mb-16 border-b border-[#f1f5f9] pb-4">
            <div className="w-[280px] flex justify-between items-center text-xs font-bold uppercase" style={{ color: data.themeColor }}>
              <span>Invoice Total</span>
              <span className="text-xl font-bold" style={{ color: data.themeColor }}>
                {data.currency}{((Number(data.amount || 0) - Number(data.discount || 0)) * (1 + Number(data.taxRate || 0) / 100)).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold mb-2 uppercase" style={{ color: data.themeColor }}>Terms & Notes</h3>
              <p className="text-[#64748b] mb-2">Please pay invoice by <span className="font-bold text-[#1e293b]">{data.endDate || 'MM/DD/YYYY'}</span></p>
              {data.notes && <p className="text-[#64748b] whitespace-pre-wrap text-xs">{data.notes}</p>}
            </div>
            <div>
              <h3 className="text-xs font-bold mb-3 uppercase" style={{ color: data.themeColor }}>Bank Account Details</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-1.5 text-sm">
                <span className="text-[#334155]">Account holder:</span>
                <span className="text-[#1e293b] font-medium">{data.accountHolder || '__________'}</span>

                <span className="text-[#334155]">Account number:</span>
                <span className="text-[#1e293b] font-medium">{data.accountNumber || '__________'}</span>

                <span className="text-[#334155]">ABA rtn:</span>
                <span className="text-[#1e293b] font-medium">{data.abaRouting || '__________'}</span>

                <span className="text-[#334155]">Wire rtn:</span>
                <span className="text-[#1e293b] font-medium">{data.wireRouting || '__________'}</span>
              </div>
            </div>
          </div>
        </div>

        {!isPaid && (
          <div className="pt-4 pb-8 text-center text-[10px] text-[#9ca3af] uppercase tracking-widest font-sans">
            Generated by FreelanceKit – Upgrade for full access
          </div>
        )}
      </div>
      )}

      {/* 2. Contract Template */}
      {(!isPreview || selectedTool === 'contract') && (
        <div id={isPreview ? undefined : "contract-template"} className="relative pb-16 bg-[#ffffff] text-[#111827] w-[800px] px-[40px] box-border text-[14px] leading-[1.8] font-serif">
        <div className="text-center mb-12 border-b-2 border-[#111827] pb-8 pt-8">
          <h1 className="text-3xl font-bold tracking-[0.15em] uppercase">Freelance Contract</h1>
        </div>

        <p className="mb-8 text-justify">
          This Freelance Contract (this "Agreement") is made as of this <span className="font-bold">{data.startDate || '__________'}</span> (the "Effective Date"),
          by and between <span className="font-bold">{data.clientName || '__________'}</span> located at <span className="font-bold">{data.clientAddress || '__________'}</span> ("Client")
          and <span className="font-bold">{data.name || '__________'}</span> located at <span className="font-bold">{data.freelancerAddress || '__________'}</span> ("Independent Contractor").
          Client and Independent Contractor may each be referred to in this Agreement as a "Party" and collectively as the "Parties."
        </p>

        <div className="space-y-6 text-justify">
          <p><strong>1. Services.</strong> Independent Contractor shall provide the following services to Client (the "Services"): <span className="font-bold ml-1">{data.projectName ? `${data.projectName} - ${data.projectDescription}` : '__________'}</span>. In addition, Independent Contractor shall perform such other duties and tasks, or changes to the Services, as may be agreed upon by the Parties.</p>

          <p><strong>2. Compensation.</strong> In consideration for Independent Contractor's performance of the Services, Client shall pay Independent Contractor <span className="font-bold">{data.currency || '₹'}{data.amount || '0'}</span>.</p>

          <p><strong>3. Expenses.</strong> All costs and expenses incurred by Independent Contractor in connection with the performance of the Services shall be the sole responsibility of and paid by Independent Contractor.</p>

          <p><strong>4. Term and Termination.</strong> Independent Contractor's engagement with Client under this Agreement shall commence on <span className="font-bold">{data.startDate || '__________'}</span>. The Parties agree and acknowledge that this Agreement and Independent Contractor's engagement with Client under this Agreement shall terminate on <span className="font-bold">{data.endDate || '__________'}</span>. At the time of termination, Independent Contractor agrees to return all Client property used in performance of the Services, including but not limited to computers, cell phones, keys, reports and other equipment and documents. Independent Contractor shall reimburse Client for any Client property lost or damaged in an amount equal to the market price of such property.</p>

          <p><strong>5. Independent Contractor.</strong> The Parties agree and acknowledge that Independent Contractor is an independent contractor and is not, for any purpose, an employee of Client. Independent Contractor does not have any authority to enter into agreements or contracts on behalf of Client, and shall not represent that it possesses any such authority. Independent Contractor shall not be entitled to any of Client's benefits, including, but not limited to, coverage under medical, dental, retirement or other plans. Client shall not be obligated to pay worker's compensation insurance, unemployment compensation, social security tax, withholding tax or other taxes or withholdings for or on behalf of the Independent Contractor in connection with the performance of the Services under this Agreement. Nothing contained in this Agreement shall be deemed or construed by the Parties to create the relationship of a partnership, a joint venture or any other fiduciary relationship.</p>

          <div>
            <strong>6. Confidentiality.</strong>
            <p className="mt-4"><strong>a. Confidential and Proprietary Information.</strong> In the course of performing the Services, Independent Contractor will be exposed to confidential and proprietary information of Client. "Confidential Information" shall mean any data or information that is competitively sensitive material and not generally known to the public, including, but not limited to, information relating to development and plans, marketing strategies, finance, operations, systems, proprietary concepts, documentation, reports, data, specifications, computer software, source code, object code, flow charts, data, databases, inventions, know-how, trade secrets, customer lists, customer relationships, customer profiles, supplier lists, supplier relationships, supplier profiles, pricing, sales estimates, business plans and internal performance results relating to the past, present or future business activities, technical information, designs, processes, procedures, formulas or improvements, which Client considers confidential and proprietary. Independent Contractor acknowledges and agrees that the Confidential Information is valuable property of Client, developed over a long period of time at substantial expense and that it is worthy of protection.</p>
            <p className="mt-4"><strong>b. Confidentiality Obligations.</strong> Except as otherwise expressly permitted in this Agreement, Independent Contractor shall not disclose or use in any manner, directly or indirectly, any Confidential Information either during the term of this Agreement or at any time thereafter, except as required to perform the Services or with Client's prior written consent.</p>
            <p className="mt-4"><strong>c. Rights in Confidential Information.</strong> All Confidential Information disclosed to Independent Contractor by Client (i) is and shall remain the sole and exclusive property of Client, and (ii) is disclosed or permitted to be acquired by Independent Contractor solely in reliance on Independent Contractor's agreement to maintain the Confidential Information in confidence and not to use or disclose the Confidential Information to any other person. Except as expressly provided herein, this Agreement does not confer any right, license, ownership or other interest in or title to the Confidential Information to Independent Contractor.</p>
            <p className="mt-4"><strong>d. Irreparable Harm.</strong> Independent Contractor acknowledges that use or disclosure of any Confidential Information in a manner inconsistent with this Agreement will give rise to irreparable injury for which damages would not be an adequate remedy. Accordingly, in addition to any other legal remedies which may be available at law or in equity, Client shall be entitled to equitable or injunctive relief against the unauthorized use or disclosure of Confidential Information. Client shall be entitled to pursue any other legally permissible remedy available as a result of such breach, including but not limited to, damages, both direct and consequential. In any action brought by Client under this Section, Client shall be entitled to recover its attorney's fees and costs from Independent Contractor.</p>
          </div>

          <p><strong>7. Ownership of Work Product.</strong> The Parties agree that all work product, information or other materials created and developed by Independent Contractor in connection with the performance of the Services under this Agreement and any resulting intellectual property rights (collectively, the "Work Product") are the sole and exclusive property of Client. The Parties acknowledge that the Work Product shall, to the extent permitted by law, be considered a "work made for hire" within the definition of Section 101 of the Copyright Act of 1976, as amended, (the "Copyright Act") and that Client is deemed to be the author and is the owner of all copyright and all other rights therein. If the work product is not deemed to be a "work made for hire" under the Copyright Act, then Independent Contractor hereby assigns to Client all of Independent Contractor's rights, title and interest in and to the Work Product, including but not limited to all copyrights, publishing rights and rights to use, reproduce and otherwise exploit the Work Product in any and all formats, media, or all channels, whether now known or hereafter created.</p>

          <p><strong>8. Insurance.</strong> For the term of this Agreement, Independent Contractor shall obtain and maintain a policy of insurance, with appropriate and adequate coverage and limits, to cover any claims for bodily injury, property damage or other losses which might arise out of any negligent act or omission committed by Independent Contractor or Independent Contractor's employees or agents, if any, in connection with the performance of the Services under this Agreement.</p>

          <p><strong>9. Non-Compete.</strong> Independent Contractor agrees and covenants that during the term of this Agreement, and for a period of <span className="font-bold">{data.nonCompeteMonths || '__________'}</span> months following the termination of this Agreement, Independent Contractor will not, directly or indirectly, perform or engage in the same or similar activities as were performed for Client for any business that is directly or indirectly in completion with Client.</p>

          <p><strong>10. Non-Solicit.</strong> Independent Contractor agrees and covenants that for a period of <span className="font-bold">{data.nonSolicitMonths || '__________'}</span> months following the termination of this Agreement, Independent Contractor will not, directly or indirectly, solicit any officer, director or employee, or any customer, client, supplier or vendor of Client for the purpose of inducing such party to terminate its relationship with Client in favor of Independent Contractor or another business directly or indirectly in competition with Client.</p>

          <p><strong>11. Mutual Representations and Warranties.</strong> Both Client and Independent Contractor represent and warrant that each Party has full power, authority and right to execute and deliver this Agreement, has full power and authority to perform its obligations under this Agreement, and has taken all necessary action to authorize the execution and delivery of this Agreement. No other consents are necessary to enter into or perform this Agreement.</p>

          <p><strong>12. Independent Contractor Representation and Warranties.</strong> Independent Contractor represents and warrants that it has all the necessary licenses, permits and registrations, if any, required to perform the Services under this Agreement in accordance with applicable federal, state and local laws, rules and regulations and that it will perform the Services according to the Client's guidelines and specifications and with the standard of care prevailing in the industry.</p>

          <p><strong>13. Indemnification.</strong> The Independent Contractor shall indemnify and hold harmless Client from any damages, claims, liabilities, loss and expenses, including reasonable attorney's fees, arising out of any act or omission of Independent Contractor in performing the Services or the breach of any provision of this Agreement by Independent Contractor.</p>

          <p><strong>14. Governing Law.</strong> The terms of this Agreement and the rights of the Parties hereto shall be governed exclusively by the laws of the State of <span className="font-bold">{data.governingState || '__________'}</span>, without regarding its conflicts of law provisions.</p>

          <p><strong>15. Disputes.</strong> Any dispute arising from this Agreement shall be resolved through mediation. If the dispute cannot be resolved through mediation, then the dispute will be resolved through binding arbitration conducted in accordance with the rules of the American Arbitration Association.</p>

          <p><strong>16. Binding Effect.</strong> This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.</p>

          <p><strong>17. Assignment.</strong> The interests of Independent Contractor are personal to Independent Contractor and cannot be assigned, transferred or sold without the prior written consent of Client.</p>

          <p><strong>18. Entire Agreement.</strong> This Agreement constitutes the entire agreement between the Parties hereto with respect the subject matter hereof, and supersedes all prior negotiations, understandings and agreements of the Parties.</p>

          <p><strong>19. Amendments.</strong> No supplement, modification or amendment of this Agreement will be binding unless executed in writing by both of the Parties.</p>

          <p><strong>20. Notices.</strong> Any notice or other communication given or made to either Party under this Agreement shall be in writing and delivered by hand, sent by overnight courier service or sent by certified or registered mail, return receipt requested, to the address stated above or to another address as that Party may subsequently designate by notice, and shall be deemed given on the date of delivery.</p>

          <p><strong>21. Waiver.</strong> Neither Party shall be deemed to have waived any provision of this Agreement or the exercise of any rights held under this Agreement unless such waiver is made expressly and in writing. Waiver by either Party of a breach or violation of any provision of this Agreement shall not constitute a waiver of any subsequent or other breach or violation.</p>

          <p><strong>22. Further Assurances.</strong> At the request of one Party, the other Party shall execute and deliver such other documents and take such other actions as may be reasonably necessary to effect the terms of this Agreement.</p>

          <p><strong>23. Severability.</strong> If any provision of this Agreement is held to be invalid, illegal or unenforceable in whole or in part, the remaining provisions shall not be affected and shall continue to be valid, legal and enforceable as though the invalid, illegal or unenforceable parts had not been included in this Agreement.</p>

          <div className="mt-16 pt-12" style={{ pageBreakInside: 'avoid' }}>
            <p className="font-bold mb-20">IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.</p>

            <div className="flex justify-between gap-16">
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-widest text-[#6b7280] mb-12">Client</p>
                <div className="border-t-[1.5px] border-[#111827] pt-2">
                  <p className="text-[15px] font-bold mt-1">{data.clientName || '__________'}</p>
                  <p className="text-sm text-[#374151] mt-1">Title: _______________</p>
                  <p className="text-sm text-[#6b7280] mt-1">Date: <span className="text-[#111827] font-medium">{data.startDate || '__________'}</span></p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-widest text-[#6b7280] mb-12">Independent Contractor</p>
                <div className="border-t-[1.5px] border-[#111827] pt-2">
                  <p className="text-[15px] font-bold mt-1">{data.name || '__________'}</p>
                  <p className="text-sm text-[#374151] mt-1">Title: _______________</p>
                  <p className="text-sm text-[#6b7280] mt-1">Date: <span className="text-[#111827] font-medium">{data.startDate || '__________'}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {!isPaid && (
            <div className="pt-4 pb-8 text-center text-[10px] text-[#9ca3af] uppercase tracking-widest font-sans">
              Generated by FreelanceKit – Upgrade for full access
            </div>
          )}
        </div>
        </div>
      )}

      {/* 3. NDA Template */}
      {(!isPreview || selectedTool === 'nda') && (
        <div id={isPreview ? undefined : "nda-template"} className="relative pb-16 bg-[#ffffff] text-[#111827] w-[800px] px-[40px] box-border text-[14px] leading-[1.8] font-serif">
        <div className="text-center mb-12 border-b-2 border-[#111827] pb-8 pt-8">
          <h1 className="text-3xl font-bold tracking-[0.15em] uppercase">Non-Disclosure Agreement</h1>
        </div>

        <p className="mb-8 font-bold uppercase tracking-wider text-center">Between</p>

        <div className="flex justify-between mb-12 text-justify">
          <div className="flex-1">
            <p className="font-bold text-[15px]">{data.clientName || '__________'}</p>
            <p>{data.clientAddress || '__________'}</p>
            <p className="font-bold italic mt-2 text-[#4b5563]">(the "Discloser")</p>
          </div>
          <div className="px-8 font-bold uppercase tracking-widest flex items-center text-[#9ca3af]">AND</div>
          <div className="flex-1 text-right">
            <p className="font-bold text-[15px]">{data.name || '__________'}</p>
            <p>{data.freelancerAddress || '__________'}</p>
            <p className="font-bold italic mt-2 text-[#4b5563]">(the "Recipient")</p>
          </div>
        </div>

        <div className="space-y-6 text-justify">
          <p><strong>1. Purpose.</strong> The Discloser intends to disclose information (the "Confidential Information") to the Recipient for the purpose of <span className="font-bold">{data.projectName ? `${data.projectName} - ${data.projectDescription}` : '__________'}</span> (the "Purpose").</p>

          <p><strong>2. Confidential Information.</strong> The Confidential Information to be disclosed includes the following: customer lists, contacts, financial data, sales data, supply sources, business opportunities for new or developing businesses, and all other proprietary information related to the Purpose.</p>

          <p><strong>3. Confidentiality Obligations.</strong> The Recipient undertakes not to use the Confidential Information for any purpose except the Purpose, without first obtaining the written agreement of the Discloser.</p>

          <p><strong>4. Security Obligations.</strong> The Recipient undertakes to keep the Confidential Information secure and not to disclose it to any third party except to its employees and professional advisers who need to know the same for the Purpose, who know they owe a duty of confidence to the Discloser and who are bound by obligations equivalent to those in clause 3 above and this clause 4.</p>

          <p><strong>5. Exclusions.</strong> The undertakings in clauses 3 and 4 above apply to all the information disclosed by the Discloser to the Recipient, regardless of the way or form in which it is disclosed or recorded but they do not apply to:<br />
            <strong>a)</strong> Any information which is or in future comes into public domain (unless as a result of the breach of this Agreement); or<br />
            <strong>b)</strong> Any information which is already known to the Recipient and which was not subject to any obligation of confidence before it was disclosed to the Recipient by the Discloser.</p>

          <p><strong>6. Disclosures enforced by Law.</strong> Nothing in this Agreement will prevent the Recipient from making any disclosure of the Confidential Information required by law or by any competent authority.</p>

          <p><strong>7. Return of Information.</strong> The Recipient will, on request from the Discloser, return all copies and records of the Confidential Information to the Discloser and will not retain any copies or records of the Confidential Information.</p>

          <p><strong>8. Property Rights.</strong> Neither this Agreement nor the supply of any information grants the Recipient any license, interest or right in respect of any intellectual property rights of the Discloser except the right to copy the Confidential Information solely for the Purpose.</p>

          <p><strong>9. Duration Period.</strong> The undertakings in clauses 3 and 4 will continue in force for a period of <span className="font-bold">{data.nonCompeteMonths || '24'} months</span>.</p>

          <p><strong>10. Applicable Law.</strong> This Agreement is governed by and is to be construed in accordance with the laws of the State of <span className="font-bold">{data.governingState || '__________'}</span>. The courts located in <span className="font-bold">{data.governingState || '__________'}</span> will have non-exclusive jurisdiction to deal with any dispute which has arisen or may arise out of, or in connection with this Agreement.</p>

          <p><strong>11. Additions or Modifications.</strong> This Agreement states the entire Agreement between the parties concerning the disclosure of Confidential Information. Any addition or modification to this Agreement must be made in writing and signed by both parties.</p>

          <p><strong>12. Final Provisions.</strong> If any of the provisions of this Agreement are found to be unenforceable, the remainder shall be enforced as fully as possible and the unenforceable provision(s) shall be deemed modified to the limited extent required to permit enforcement of the Agreement as a whole.</p>

          <div className="mt-16 pt-12" style={{ pageBreakInside: 'avoid' }}>
            <p className="font-bold mb-20 text-center uppercase tracking-wide leading-relaxed">WHEREFORE, the parties acknowledge that they have read and understood this Agreement and voluntarily accept the duties and obligations set forth herein.</p>

            <div className="flex justify-between gap-16">
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-widest text-[#6b7280] mb-12">Discloser</p>
                <div className="border-t-[1.5px] border-[#111827] pt-2">
                  <p className="text-[15px] font-bold mt-1">{data.clientName || '__________'}</p>
                  <p className="text-sm text-[#374151] mt-1">Title: _______________</p>
                  <p className="text-sm text-[#6b7280] mt-1">Date: <span className="text-[#111827] font-medium">{data.startDate || '__________'}</span></p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-widest text-[#6b7280] mb-12">Recipient</p>
                <div className="border-t-[1.5px] border-[#111827] pt-2">
                  <p className="text-[15px] font-bold mt-1">{data.name || '__________'}</p>
                  <p className="text-sm text-[#374151] mt-1">Title: _______________</p>
                  <p className="text-sm text-[#6b7280] mt-1">Date: <span className="text-[#111827] font-medium">{data.startDate || '__________'}</span></p>
                </div>
              </div>
            </div>
          </div>

          {!isPaid && (
            <div className="mt-16 pt-4 border-t border-[#e5e7eb] text-center text-[10px] text-[#9ca3af] uppercase tracking-widest font-sans">
              Generated by FreelanceKit – Upgrade for full access
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
