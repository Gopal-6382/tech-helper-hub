import { cloudinaryService } from "@/infrastructure/cloudinary/cloudinary.service";
import {CloudinaryUploadOptions} from "@/infrastructure/cloudinary/cloudinary.types";
export async function uploadImage(
 types:CloudinaryUploadOptions
) {
  return cloudinaryService.uploadBuffer(buffer, {
    types.folder,
    publicId,
  });
}