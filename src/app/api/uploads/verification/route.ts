import { CLOUDINARY_FOLDERS } from "@/constant/cloudinary.constants";
import { routeHandler } from "@/middleware/route.handler";
import { FILE_TYPES } from "@/constant/uploadfiles.types";
import { User } from "@/constant/roles.route.const";
import { processUploads } from "@/utils/upload-route.helper";
import { prisma } from "@/lib/prisma";

// app/api/verifications/route.ts
export const POST = routeHandler(async (req, currentUser) => {
  const formData = await req.formData();

  const uploads = await processUploads(formData, {
    // Group all 4 documents into one neat folder for this specific user
    folder: `${CLOUDINARY_FOLDERS.verification}/${currentUser.userId}`,
    allowedTypes: [...FILE_TYPES.IMAGE, ...FILE_TYPES.DOCUMENT],
    fieldNames: ["documentFront", "documentBack", "selfie", "certificate"],
    maxFiles: 4,
    maxSizeMB: 5,
  });

  const documentType = formData.get("documentType") as string;
  const documentNumber = formData.get("documentNumber") as string;
  const certificateName = formData.get("certificateName") as string;

  const documentFrontUrl = uploads.find(
    (u) => u.fieldName === "documentFront",
  )?.secureUrl;
  const documentBackUrl = uploads.find(
    (u) => u.fieldName === "documentBack",
  )?.secureUrl;
  const selfieUrl = uploads.find((u) => u.fieldName === "selfie")?.secureUrl;
  const certificateUrl = uploads.find(
    (u) => u.fieldName === "certificate",
  )?.secureUrl;

  const verificationRecord = await prisma.verification.create({
    data: {
      userId: currentUser.userId,
      documentType,
      documentNumber,
      documentFrontUrl,
      documentBackUrl,
      selfieUrl,
      certificateUrl,
      certificateName,
    },
  });

  return { success: true, data: verificationRecord };
}, User);
