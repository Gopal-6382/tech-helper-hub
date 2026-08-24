import { USER_ROLES } from "@/constant/role.constant";
import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { routeHandler } from "@/middleware/route.handler";
import { handleMultiUpload } from "@/utils/upload-route.helper";
import { FILE_TYPES } from "@/constant/uploadfiles.types";

export const POST = routeHandler(
  async (req) =>
    handleMultiUpload(req, {
      folder: CLOUDINARY_FOLDERS.posts,
      field: "files",
      errorMessage: "At least one image is required",
      allowedTypes: [...FILE_TYPES.IMAGE, ...FILE_TYPES.DOCUMENT],
    }),
  { roles: USER_ROLES },
);
