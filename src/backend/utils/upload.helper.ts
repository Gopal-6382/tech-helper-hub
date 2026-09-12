import { CloudinaryService } from "@/infrastructure/cloudinary/cloudinary.service";
import {
  CloudinaryUploadOptions,
  CloudinaryUploadResult,
} from "@/infrastructure/cloudinary/cloudinary.types";

export async function uploadImage(
  buffer: Buffer,
  options: CloudinaryUploadOptions,
): Promise<CloudinaryUploadResult> {
  const cloudinaryService = new CloudinaryService();
  return cloudinaryService.uploadBuffer(buffer, {
    folder: options.folder,
    publicId: options.publicId,
    resourceType: options.resourceType ?? "image",
  });
}
