import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { routeHandler } from "@/middleware/route.handler";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
import { User } from "@/constant/roles.route.const";
import { processUploads } from "@/utils/upload-route.helper";

// app/api/reviews/route.ts
export const POST = routeHandler(async (req, currentUser) => {
  const formData = await req.formData();

  const uploads = await processUploads(formData, {
    // Organize review images by user
    folder: `${CLOUDINARY_FOLDERS.reviews}/${currentUser.userId}`,
    allowedTypes: FILE_TYPES.IMAGE,
    fieldNames: ["review"],
    maxFiles: 5,
    maxSizeMB: 5,
  });

  const imageUrls = uploads.map((u) => u.secureUrl);

  return { success: true, images: imageUrls };
}, User);
