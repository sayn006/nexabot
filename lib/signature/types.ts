// Types partages pour le portail Signature (API Symfony app.emcorp.io)

export interface SignatureUser {
  id: number;
  email: string;
  name?: string | null;
  createdAt?: string;
}

export interface SignatureSigner {
  name: string;
  email: string;
  status?: "pending" | "signed" | "declined";
  signedAt?: string | null;
}

export type SubmissionStatus =
  | "draft"
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "expired";

export interface SignatureSubmission {
  id: number | string;
  documentName: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt?: string;
  signers: SignatureSigner[];
  signedDocumentUrl?: string | null;
}

export interface SignatureAuthResponse {
  token: string;
  user?: SignatureUser;
}

export interface SignatureApiError {
  error?: string;
  message?: string;
  detail?: string;
}

// --------- Billing / Subscription ---------

export type SignaturePlan = "pay_per_use" | "pack_50" | "illimite";

export type SignatureSubscriptionStatus =
  | "active"
  | "past_due"
  | "cancelled";

export interface SignatureSubscriptionInfo {
  plan: SignaturePlan | null;
  status: SignatureSubscriptionStatus | null;
  signaturesUsed: number;
  signaturesQuota: number;
  startedAt: string | null;
  nextRenewalAt: string | null;
}

export interface SignaturePaymentIntent {
  id: string;
  amount: number; // cents
  currency: string;
  status: string;
  created: number; // unix timestamp (seconds)
  description: string | null;
}

export interface SignatureInvoice {
  id: string;
  amount_paid: number;
  currency: string;
  status: string;
  created: number;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
}

export interface SignatureBillingData {
  subscription: SignatureSubscriptionInfo | null;
  paymentIntents: SignaturePaymentIntent[];
  invoices: SignatureInvoice[];
}

// Reponse brute renvoyee par l'API Symfony /api/signature/billing
export interface SignatureBillingApiResponse {
  success: boolean;
  subscription: {
    plan: string | null;
    statut: string | null;
    quota: number;
    used: number;
    stripe_subscription_id?: string | null;
    started_at?: string | null;
    next_renewal_at?: string | null;
  } | null;
  month_stats?: {
    since: string;
    ca_ht: number | string;
    nb_signed: number;
  };
  recent_usages?: unknown[];
  payment_intents: SignaturePaymentIntent[];
  invoices: SignatureInvoice[];
}
