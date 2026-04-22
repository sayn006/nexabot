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
