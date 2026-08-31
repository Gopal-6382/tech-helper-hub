import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { routeHandler } from "@/middleware/route.handler";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
import { User } from "@/constant/roles.route.const";
import { processUploads } from "@/utils/upload-route.helper";
// app/api/posts/route.ts
export const POST = routeHandler(async (req, currentUser) => {
  const formData = await req.formData();

  const uploads = await processUploads(formData, {
    // Organize all posts by the user who created them
    folder: `${CLOUDINARY_FOLDERS.posts}/${currentUser.userId}`,
    allowedTypes: [...FILE_TYPES.IMAGE, ...FILE_TYPES.DOCUMENT],
    fieldNames: ["postImages"],
    maxFiles: 5,
    maxSizeMB: 5,
  });

  const imageUrls = uploads.map((u) => u.secureUrl);

  return { success: true, images: imageUrls };
}, User);
