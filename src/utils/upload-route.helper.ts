import { NextRequest } from "next/server";

import { uploadImage } from "@/utils/upload.helper";
import { FILE_TYPES } from "@/constant/uploadfiles.types";

interface UploadOptions {
  folder: string;
  field?: string;
  errorMessage?: string;
  allowedTypes?: readonly string[];
}

/**
 * Single File Upload Helper
 *
 * Used for:
 * - Avatar
 * - Group Image
 * - Verification Front
 * - Verification Back
 * - Verification Selfie
 * - Verification Certificate
 */
export async function handleSingleUpload(
  req: NextRequest,
  options: UploadOptions,
) {
  const fieldName = options.field || "file";

  const formData = await req.formData();

  const file = formData.get(fieldName);

  if (!(file instanceof File)) {
    throw new Error(options.errorMessage || `${fieldName} is required`);
  }

  const allowedTypes = options.allowedTypes || FILE_TYPES.IMAGE;

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await uploadImage(buffer, {
    folder: options.folder,
  });

  return {
    publicId: result.publicId,
    secureUrl: result.secureUrl,
  };
}

/**
 * Multiple File Upload Helper
 *
 * Used for:
 * - Post Images
 * - Review Images
 */
export async function handleMultiUpload(
  req: NextRequest,
  options: UploadOptions,
) {
  const fieldName = options.field || "files";

  const formData = await req.formData();

  const files = formData.getAll(fieldName);

  if (files.length === 0) {
    throw new Error(options.errorMessage || "At least one file is required");
  }

  const allowedTypes = options.allowedTypes || FILE_TYPES.IMAGE;

  const results: {
    publicId: string;
    secureUrl: string;
  }[] = [];

  for (const file of files) {
    if (!(file instanceof File)) {
      continue;
    }

    if (!allowedTypes.includes(file.type)) {
      continue;
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadImage(buffer, {
      folder: options.folder,
    });

    results.push({
      publicId: result.publicId,
      secureUrl: result.secureUrl,
    });
  }

  if (results.length === 0) {
    throw new Error("No valid files were processed.");
  }

  return {
    images: results,
  };
}
