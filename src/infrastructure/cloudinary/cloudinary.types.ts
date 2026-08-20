export interface CloudinaryUploadOptions {
  folder: string;
  publicId?: string;
  resourceType?: "image" | "raw" | "video" | "auto";
}

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  resourceType: string;
  format: string;
  bytes: number;
}

