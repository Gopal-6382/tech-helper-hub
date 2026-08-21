const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
] as const;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateImage(file: File): string | null {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type as "image/jpeg" | "image/png" | "image/webp" | "image/jpg",
    )
  ) {
    return "Only JPG, PNG, and WebP images are allowed";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be less than 5 MB";
  }

  return null;
}
