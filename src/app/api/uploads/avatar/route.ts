import { processUploads } from "@/utils/upload-route.helper";
import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
import { routeHandler } from "@/middleware/route.handler";
import { User } from "@/constant/roles.route.const";

// app/api/users/avatar/route.ts
export const POST = routeHandler(async (req, currentUser) => {
  const formData = await req.formData(); // Parse once!

  const uploads = await processUploads(formData, {
    // dynamically create a folder for this specific user
    folder: `${CLOUDINARY_FOLDERS.users}/${currentUser.userId}`,
    allowedTypes: FILE_TYPES.IMAGE,
    fieldNames: ["avatar"],
    maxFiles: 1,
    maxSizeMB: 2,
  });

  const newAvatarUrl = uploads[0].secureUrl;

  // Update DB example
  // await prisma.user.update({ where: { id: currentUser.userId }, data: { avatarUrl: newAvatarUrl } })

  return { success: true, url: newAvatarUrl };
}, User);
