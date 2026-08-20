import { cloudinary } from "./cloudinary.config";
import { CloudinaryUploadResult } from "./cloudinary.types";

export class CloudinaryService {
  async uploadBuffer(
    buffer: Buffer,
    options: {
      folder: string;
      publicId?: string;
    },
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          public_id: options.publicId,
          resource_type: "image",
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
}

export const cloudinaryService = new CloudinaryService();