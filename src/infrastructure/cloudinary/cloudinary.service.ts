import { cloudinary } from "./cloudinary.config";
import {
  CloudinaryUploadResult,
  CloudinaryUploadOptions,
} from "./cloudinary.types";

// cloudinary.service.ts
export class CloudinaryService {
  async uploadBuffer(
    buffer: Buffer,
    options: CloudinaryUploadOptions,
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          public_id: options.publicId,
          // Auto-detect or default based on options
          resource_type: options.resourceType || "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error("Cloudinary returned no result"));

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
            resourceType: result.resource_type,
            format: result.format,
            bytes: result.bytes,
          });
        },
      );

      stream.end(buffer);
    });
  }
}
