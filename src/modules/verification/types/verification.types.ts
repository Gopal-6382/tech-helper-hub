import { VerificationStatus } from "@prisma/client";

export interface CreateVerificationDto {
  documentType: string;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl: string;
  selfieUrl: string;
  certificateUrl?: string;
  certificateName?: string;
}

export interface UpdateVerificationDto {
  documentType?: string;
  documentNumber?: string;
  documentFrontUrl?: string;
  documentBackUrl?: string;
  selfieUrl?: string;
  certificateUrl?: string;
  certificateName?: string;
  status?: VerificationStatus;
}