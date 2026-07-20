import {
  RequestStatus,
  ServiceMode,
} from "@prisma/client";
import { z } from "zod";

export const createServiceRequestSchema =
  z.object({
    categoryId: z.string().cuid(),

    title: z
      .string()
      .trim()
      .min(5)
      .max(150),

    description: z
      .string()
      .trim()
      .min(20)
      .max(2000),

    images: z.array(z.string().url()).default([]),

    mode: z.nativeEnum(ServiceMode),

    budget: z.number().positive().optional(),

    address: z.string().trim().optional(),

    city: z.string().trim().optional(),

    latitude: z.number().optional(),

    longitude: z.number().optional(),
  });

export const updateServiceRequestSchema =
  createServiceRequestSchema
    .partial()
    .extend({
      status: z
        .nativeEnum(RequestStatus)
        .optional(),
    });