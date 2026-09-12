import { z } from "zod";
import { VerificationStatus } from "@prisma/client";

export const createVerificationSchema = z.object({
  documentType: z.string().trim().min(2),
  documentNumber: z.string().trim().min(5),

  documentFrontUrl: z.url(),
  documentBackUrl: z.url(),
  selfieUrl: z.url(),

  certificateUrl: z.url().optional(),
  certificateName: z.string().trim().optional(),
});

export const updateVerificationSchema = createVerificationSchema
  .partial()
  .extend({
    status: z.enum(VerificationStatus).optional(),
  });
