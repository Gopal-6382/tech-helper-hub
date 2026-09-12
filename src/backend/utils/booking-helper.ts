import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/utils/api-response";

export async function getProfessionalIdByUserId(
  userId: string,
): Promise<string> {
  const professional = await prisma.professionalProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!professional) {
    throw new NotFoundError("Professional profile not found");
  }

  return professional.id;
}

export async function getUserIdByServiceRequestId(
  serviceRequestId: string,
): Promise<string> {
  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: serviceRequestId },
    select: { requesterId: true },
  });

  if (!serviceRequest) {
    throw new NotFoundError("Service request not found");
  }

  return serviceRequest.requesterId;
}
