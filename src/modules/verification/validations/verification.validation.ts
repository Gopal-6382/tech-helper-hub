import { z } from "zod";
import { VerificationStatus } from "@prisma/client";

export const createVerificationSchema = z.object({
  documentType: z.string().trim().min(2),
  documentNumber: z.string().trim().min(5),

  documentFrontUrl: z.string().url(),
  documentBackUrl: z.string().url(),
  selfieUrl: z.string().url(),

  certificateUrl: z.string().url().optional(),
  certificateName: z.string().trim().optional(),
});

export const updateVerificationSchema =
  createVerificationSchema
    .partial()
    .extend({
      status: z.nativeEnum(VerificationStatus).optional(),
    });