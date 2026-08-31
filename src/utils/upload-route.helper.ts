import { uploadImage } from "@/utils/upload.helper";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
interface UnifiedUploadOptions {
  folder: string;
  fieldNames?: string[];
  allowedTypes?: readonly string[];
  maxFiles?: number;
  maxSizeMB?: number;
}

export async function processUploads(
  formData: FormData, // <-- Changed this from NextRequest
  options: UnifiedUploadOptions,
) {
  const rawFiles: { file: File; fieldName: string }[] = [];

  const targetFields = options.fieldNames || [
    "file",
    "files",
    "image",
    "document",
  ];

  // Extract from specific target fields
  for (const field of targetFields) {
    const values = formData.getAll(field);
    for (const val of values) {
      if (
        val &&
        typeof val === "object" &&
        "arrayBuffer" in val &&
        (val as File).size > 0
      ) {
        rawFiles.push({ file: val as File, fieldName: field });
      }
    }
  }

  // Fallback: If target fields weren't used, check all fields
  if (rawFiles.length === 0) {
    formData.forEach((value, key) => {
      if (
        value &&
        typeof value === "object" &&
        "arrayBuffer" in value &&
        (value as File).size > 0
      ) {
        rawFiles.push({ file: value as File, fieldName: key });
      }
    });
  }

  if (rawFiles.length === 0) {
    throw new Error("No valid files were uploaded in the request.");
  }

  // VALIDATION: Max Files
  if (options.maxFiles && rawFiles.length > options.maxFiles) {
    throw new Error(
      `You can only upload a maximum of ${options.maxFiles} file(s).`,
    );
  }

  const allowedTypes = options.allowedTypes || [
    ...FILE_TYPES.IMAGE,
    ...FILE_TYPES.DOCUMENT,
  ];

  const MAX_BYTES = (options.maxSizeMB || 5) * 1024 * 1024;
  const processedResults = [];

  for (const item of rawFiles) {
    const { file, fieldName } = item;

    if (!file.type || file.type.startsWith("multipart/")) continue;

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type '${file.type}' is not supported.`);
    }

    // VALIDATION: File Size
    if (file.size > MAX_BYTES) {
      throw new Error(
        `File '${file.name}' exceeds the maximum size of ${options.maxSizeMB || 5}MB.`,
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const isDocument = FILE_TYPES.DOCUMENT.includes(file.type as any);

    const result = await uploadImage(buffer, {
      folder: options.folder,
      resourceType: isDocument ? "raw" : "image",
    });

    processedResults.push({
      fieldName,
      publicId: result.publicId,
      secureUrl: result.secureUrl,
      resourceType: result.resourceType,
      format: result.format,
    });
  }

  if (processedResults.length === 0) {
    throw new Error("No valid file objects were processed.");
  }

  return processedResults;
}
