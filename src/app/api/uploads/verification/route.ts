import { USER_ROLES } from "@/constant/role.constant";
import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { routeHandler } from "@/middleware/route.handler";
import { handleSingleUpload } from "@/utils/upload-route.helper";
import { FILE_TYPES } from "@/constant/uploadfiles.types";

export const POST = routeHandler(
  async (req) =>
    handleSingleUpload(req, {
      folder: CLOUDINARY_FOLDERS.verification,
      field: "files",
      errorMessage: "Verification document is required",
      allowedTypes: [...FILE_TYPES.IMAGE, ...FILE_TYPES.DOCUMENT],
    }),
  { roles: USER_ROLES },
);
