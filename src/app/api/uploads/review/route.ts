import { NextRequest } from "next/server";
import { uploadImage } from "@/utils/upload.helper";
import { CLOUDINARY_FOLDERS } from "@/infrastructure/cloudinary/cloudinary.constants";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files");

    if (files.length === 0) {
      return Response.json(
        {
          success: false,
          message: "At least one image is required",
        },
        { status: 400 },
      );
    }

    const results = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;
      if (!file.type.startsWith("image/")) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await uploadImage(buffer, {
        folder: CLOUDINARY_FOLDERS.reviews,
      });

      results.push({
        publicId: result.publicId,
        secureUrl: result.secureUrl,
      });
    }

    return Response.json({
      success: true,
      data: {
        images: results,
      },
    });
  } catch (error) {
    console.error("Review image upload failed:", error);

    return Response.json(
      {
        success: false,
        message: "Review image upload failed",
      },
      { status: 500 },
    );
  }
}
