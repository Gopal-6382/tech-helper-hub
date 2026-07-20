import {
  RequestStatus,
  ServiceMode,
} from "@prisma/client";

export interface CreateServiceRequestDto {
  categoryId: string;
  title: string;
  description: string;
  images: string[];
  mode: ServiceMode;
  budget?: number;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateServiceRequestDto {
  categoryId?: string;
  title?: string;
  description?: string;
  images?: string[];
  mode?: ServiceMode;
  budget?: number;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  status?: RequestStatus;
}