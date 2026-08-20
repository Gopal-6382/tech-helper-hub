import { cloudinary } from "./cloudinary.config";
import {
  CloudinaryUploadResult,
  CloudinaryUploadOptions,
} from "./cloudinary.types";

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
          resource_type: options.resourceType ?? "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary returned no result"));
            return;
          }

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

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (result.result !== "ok" && result.result !== "not found") {
          reject(new Error(`Cloudinary delete failed: ${result.result}`));
          return;
        }

        resolve();
      });
    });
  }
}

export const cloudinaryService = new CloudinaryService();
