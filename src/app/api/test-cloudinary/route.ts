import { NextRequest } from "next/server";
import { cloudinaryService } from "@/infrastructure/cloudinary/cloudinary.service";

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await cloudinaryService.uploadBuffer(buffer, {
      folder: "tech-helper-hub/test",
    });

    return Response.json({
      success: true,
      data: {
        publicId: result.publicId,
        secureUrl: result.secureUrl,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    return Response.json(
      {
        success: false,
        message: "Cloudinary upload failed",
      },
      { status: 500 },
    );
  }
}