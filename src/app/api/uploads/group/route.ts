import { processUploads } from "@/utils/upload-route.helper";
import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
import { routeHandler } from "@/middleware/route.handler";
import { User } from "@/constant/roles.route.const";

// app/api/groups/avatar/route.ts
export const POST = routeHandler(async (req, currentUser) => {
  const formData = await req.formData();

  const uploads = await processUploads(formData, {
    // Dynamic folder per user
    folder: `${CLOUDINARY_FOLDERS.groups}/${currentUser.userId}`,
    allowedTypes: FILE_TYPES.IMAGE,
    fieldNames: ["group"],
    maxFiles: 1,
    maxSizeMB: 2,
  });

  const newGroupImageUrl = uploads[0].secureUrl;

  return { success: true, url: newGroupImageUrl };
}, User);
