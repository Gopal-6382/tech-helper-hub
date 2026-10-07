// frontend/features/posts/components/posts/image-upload-field.tsx

"use client";

import { type RefObject } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldLabel,
  FormError,
} from "@/frontend/components/form";

type ImageUploadFieldProps = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  existingImageUrls: string[];
  previewUrls: string[];
  selectedFiles: File[];
  newImageUrls: string[];
  isUploading: boolean;
  uploadError: string | null;
  onSelectImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadImages: () => void;
  onClearSelectedFiles: () => void;
  onRemoveExistingImage: (index: number) => void;
  onRemoveNewImage: (index: number) => void;
};

export function ImageUploadField({
  fileInputRef,
  existingImageUrls,
  previewUrls,
  selectedFiles,
  newImageUrls,
  isUploading,
  uploadError,
  onSelectImages,
  onUploadImages,
  onClearSelectedFiles,
  onRemoveExistingImage,
  onRemoveNewImage,
}: ImageUploadFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="images">Images</FieldLabel>

      <FieldDescription>
        You can upload multiple images. Selected images must be uploaded before
        saving.
      </FieldDescription>

      <input
        ref={fileInputRef}
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={onSelectImages}
        className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
      />

      {existingImageUrls.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Current images</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {existingImageUrls.map((url, index) => (
              <div
                key={url}
                className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={url}
                  alt={`Current image ${index + 1}`}
                  fill
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemoveExistingImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                  aria-label="Remove existing image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">New images</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previewUrls.map((url, index) => (
              <div
                key={url}
                className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={url}
                  alt={`Selected image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />

                <button
                  type="button"
                  onClick={() => onRemoveNewImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                  aria-label="Remove selected image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={onUploadImages}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload images"
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            disabled={isUploading}
            onClick={onClearSelectedFiles}
          >
            Clear
          </Button>
        </div>
      )}

      {newImageUrls.length > 0 && (
        <p className="mt-2 text-sm text-green-600">
          {newImageUrls.length} new image
          {newImageUrls.length > 1 ? "s" : ""} uploaded.
        </p>
      )}

      <FormError
        error={
          uploadError ? { type: "manual", message: uploadError } : undefined
        }
      />
    </Field>
  );
}
