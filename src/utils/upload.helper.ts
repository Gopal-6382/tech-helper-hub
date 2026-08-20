import { cloudinaryService } from "@/infrastructure/cloudinary/cloudinary.service";
import {
  CloudinaryUploadOptions,
  CloudinaryUploadResult,
} from "@/infrastructure/cloudinary/cloudinary.types";

export async function uploadImage(
  buffer: Buffer,
  options: CloudinaryUploadOptions,
): Promise<CloudinaryUploadResult> {
  return cloudinaryService.uploadBuffer(buffer, {
    folder: options.folder,
    publicId: options.publicId,
    resourceType: options.resourceType ?? "image",
  });
}

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();

  return Buffer.from(arrayBuffer);
}
