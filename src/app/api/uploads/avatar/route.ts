import { NextRequest } from "next/server";

import { handleSingleUpload } from "@/utils/upload-route.helper";
import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { FILE_TYPES } from "@/constant/uploadfiles.types";

export async function POST(req: NextRequest) {
  const result = await handleSingleUpload(req, {
    folder: CLOUDINARY_FOLDERS.users,
    allowedTypes: FILE_TYPES.IMAGE,
  });

  return Response.json({
    success: true,
    data: result,
  });
}
