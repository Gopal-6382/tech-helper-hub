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
          message: "Verification document is required",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadImage(buffer, {
      folder: CLOUDINARY_FOLDERS.verification,
    });

    return Response.json({
      success: true,
      data: {
        publicId: result.publicId,
        secureUrl: result.secureUrl,
      },
    });
  } catch (error) {
    console.error("Verification upload failed:", error);

    return Response.json(
      {
        success: false,
        message: "Verification upload failed",
      },
      { status: 500 },
    );
  }
}
