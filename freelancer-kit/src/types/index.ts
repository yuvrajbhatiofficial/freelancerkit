export interface FormData {
  name: string;
  email: string;
  freelancerAddress: string;
  companyName: string;
  companyWebsite: string;
  companyPhone: string;

  clientName: string;
  clientAddress: string;

  projectName: string;
  projectDescription: string;
  
  amount: string;
  hourlyRate: string;
  hours: string;
  taxRate: string;
  discount: string;

  startDate: string;
  endDate: string;

  nonCompeteMonths: string;
  nonSolicitMonths: string;
  governingState: string;

  accountHolder: string;
  accountNumber: string;
  abaRouting: string;
  wireRouting: string;

  // Invoice Specific Enhancements
  invoiceItems: { description: string; hours: string; rate: string; amount: string; }[];
  logoUrl: string;
  themeColor: string;
  currency: string;
  taxName: string;
  invoiceNumber: string;
  notes: string;
}
