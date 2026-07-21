import {
  PrismaClient,
  Role,
  RequestStatus,
  ServiceMode,
  VerificationStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  // Paste ALL your code here ↓↓↓

  const user = await prisma.user.create({
    data: {
      name: "Gopal",
      email: "user@test.com",
      password,
      role: Role.USER,
    },
  });

  console.log("User");
  console.log(user);

  const professionalUser = await prisma.user.create({
    data: {
      name: "Arun",
      email: "pro@test.com",
      password,
      role: Role.PROFESSIONAL,
    },
  });

  console.log("Professional User");
  console.log(professionalUser);

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      city: "Dindigul",
      state: "Tamil Nadu",
    },
  });

  console.log("Profile");
  console.log(profile);

  const verification = await prisma.verification.create({
    data: {
      userId: professionalUser.id,
      status: VerificationStatus.APPROVED,
    },
  });

  console.log("Verification");
  console.log(verification);

  const professional = await prisma.professionalProfile.create({
    data: {
      userId: professionalUser.id,
      headline: "Electrician",
      experienceYears: 5,
      serviceMode: ServiceMode.BOTH,
    },
  });

  console.log("Professional");
  console.log(professional);

  const category = await prisma.category.findFirst({
    where: {
      slug: "electrician",
    },
  });

  const professionalCategory = await prisma.professionalCategory.create({
    data: {
      professionalProfileId: professional.id,
      categoryId: category!.id,
    },
  });

  const request = await prisma.serviceRequest.create({
    data: {
      requesterId: user.id,
      categoryId: category!.id,
      title: "Fan not working",
      description: "Ceiling fan stopped.",
      status: RequestStatus.OPEN,
    },
  });

  console.log({
    user,
    professionalUser,
    profile,
    verification,
    professional,
    category,
    professionalCategory,
    request,
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
