import { ServiceMode } from "@prisma/client";

export interface BecomeProfessionalDto {
  headline: string;
  description: string;
  experienceYears: number;
  hourlyRate: number;
  serviceMode: ServiceMode;
  workingRadiusKm: number;
}

export interface UpdateProfessionalDto {
  headline?: string;
  description?: string;
  experienceYears?: number;
  hourlyRate?: number;
  serviceMode?: ServiceMode;
  workingRadiusKm?: number;
  isAvailable?: boolean;
}

export interface UpdateProfessionalCategoriesDto {
  categoryIds: string[];
}