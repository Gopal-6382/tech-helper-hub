import {
  PrismaClient,
  Role,
  ServiceMode,
  VerificationStatus,
  RequestStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Categories
  await prisma.category.createMany({
    data: [
      { name: "Electrician", slug: "electrician" },
      { name: "Plumber", slug: "plumber" },
      { name: "AC Repair", slug: "ac-repair" },
    ],
    skipDuplicates: true,
  });

  const password = await bcrypt.hash("12345678", 10);

  // User
  const user = await prisma.user.create({
    data: {
      name: "Gopal",
      email: "user@test.com",
      password,
      role: Role.USER,
    },
  });

  // Professional user
  const professionalUser = await prisma.user.create({
    data: {
      name: "Arun Electrician",
      email: "pro@test.com",
      password,
      role: Role.PROFESSIONAL,
    },
  });

  // Profile
  await prisma.profile.create({
    data: {
      userId: user.id,
      city: "Dindigul",
      state: "Tamil Nadu",
    },
  });

  await prisma.profile.create({
    data: {
      userId: professionalUser.id,
      city: "Dindigul",
      state: "Tamil Nadu",
    },
  });

  // Verification
  await prisma.verification.create({
    data: {
      userId: professionalUser.id,
      status: VerificationStatus.APPROVED,
    },
  });

  // Professional Profile
  const electrician = await prisma.category.findUnique({
    where: {
      slug: "electrician",
    },
  });

  const professional = await prisma.professionalProfile.create({
    data: {
      userId: professionalUser.id,
      headline: "Electrician",
      experienceYears: 5,
      serviceMode: ServiceMode.BOTH,
      isAvailable: true,
    },
  });

  await prisma.professionalCategory.create({
    data: {
      professionalProfileId: professional.id,
      categoryId: electrician!.id,
    },
  });

  // Service Request
  await prisma.serviceRequest.create({
    data: {
      requesterId: user.id,
      categoryId: electrician!.id,
      title: "Fan not working",
      description: "Ceiling fan stopped suddenly.",
      status: RequestStatus.OPEN,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
