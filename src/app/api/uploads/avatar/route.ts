import { NextRequest } from "next/server";

import { uploadImage } from "@/utils/upload.helper";
import { CLOUDINARY_FOLDERS } from "@/infrastructure/cloudinary/cloudinary.constants";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "Image file is required",
        },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        {
          success: false,
          message: "Only image files are allowed",
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImage(buffer, {
      folder: CLOUDINARY_FOLDERS.users,
    });

    return Response.json({
      success: true,
      data: {
        publicId: result.publicId,
        secureUrl: result.secureUrl,
      },
    });
  } catch (error) {
    console.error("Avatar upload failed:", error);

    return Response.json(
      {
        success: false,
        message: "Avatar upload failed",
      },
      { status: 500 },
    );
  }
}
