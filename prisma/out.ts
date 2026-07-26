import {
  PrismaClient,
  Role,
  RequestStatus,
  BookingStatus,
  ServiceMode,
  VerificationStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  // ---------------------------------------------------------------------
  // CATEGORIES — unique on slug, so upsert is safe to re-run
  // ---------------------------------------------------------------------
  await prisma.category.upsert({
    where: { slug: "electrician" },
    update: {},
    create: { name: "Electrician", slug: "electrician" },
  });

  await prisma.category.upsert({
    where: { slug: "plumber" },
    update: {},
    create: { name: "Plumber", slug: "plumber" },
  });

  const category = await prisma.category.findFirstOrThrow({
    where: { slug: "electrician" },
  });
  console.log("Category");
  console.log(category);

  // ---------------------------------------------------------------------
  // USERS — unique on email, so upsert instead of create
  // ---------------------------------------------------------------------
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      name: "Gopal",
      email: "user@test.com",
      password,
      role: Role.USER,
    },
  });
  console.log("User");
  console.log(user);

  const user2 = await prisma.user.upsert({
    where: { email: "user2@test.com" },
    update: {},
    create: {
      name: "Divya",
      email: "user2@test.com",
      password,
      role: Role.USER,
    },
  });
  console.log("User 2");
  console.log(user2);

  const professionalUser = await prisma.user.upsert({
    where: { email: "pro@test.com" },
    update: {},
    create: {
      name: "Arun",
      email: "pro@test.com",
      password,
      role: Role.PROFESSIONAL,
    },
  });
  console.log("Professional User");
  console.log(professionalUser);

  const professionalUser2 = await prisma.user.upsert({
    where: { email: "pro2@test.com" },
    update: {},
    create: {
      name: "Karthik",
      email: "pro2@test.com",
      password,
      role: Role.PROFESSIONAL,
    },
  });
  console.log("Professional User 2");
  console.log(professionalUser2);

  // ---------------------------------------------------------------------
  // PROFILES — unique on userId, so upsert
  // ---------------------------------------------------------------------
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, city: "Dindigul", state: "Tamil Nadu" },
  });
  console.log("Profile");
  console.log(profile);

  const profile2 = await prisma.profile.upsert({
    where: { userId: user2.id },
    update: {},
    create: { userId: user2.id, city: "Palani", state: "Tamil Nadu" },
  });
  console.log("Profile 2");
  console.log(profile2);

  await prisma.profile.upsert({
    where: { userId: professionalUser.id },
    update: {},
    create: { userId: professionalUser.id, city: "Dindigul", state: "Tamil Nadu" },
  });

  await prisma.profile.upsert({
    where: { userId: professionalUser2.id },
    update: {},
    create: { userId: professionalUser2.id, city: "Tiruppur", state: "Tamil Nadu" },
  });

  // ---------------------------------------------------------------------
  // VERIFICATION — unique on userId, so upsert
  // Enum is PENDING | VERIFIED | REJECTED (no APPROVED)
  // ---------------------------------------------------------------------
  const verification = await prisma.verification.upsert({
    where: { userId: professionalUser.id },
    update: {},
    create: { userId: professionalUser.id, status: VerificationStatus.VERIFIED },
  });
  console.log("Verification");
  console.log(verification);

  const verification2 = await prisma.verification.upsert({
    where: { userId: professionalUser2.id },
    update: {},
    create: { userId: professionalUser2.id, status: VerificationStatus.PENDING },
  });
  console.log("Verification 2");
  console.log(verification2);

  // ---------------------------------------------------------------------
  // PROFESSIONAL PROFILE — unique on userId, so upsert
  // ---------------------------------------------------------------------
  const professional = await prisma.professionalProfile.upsert({
    where: { userId: professionalUser.id },
    update: {},
    create: {
      userId: professionalUser.id,
      headline: "Electrician",
      experienceYears: 5,
      serviceMode: ServiceMode.BOTH,
    },
  });
  console.log("Professional");
  console.log(professional);

  const professional2 = await prisma.professionalProfile.upsert({
    where: { userId: professionalUser2.id },
    update: {},
    create: {
      userId: professionalUser2.id,
      headline: "Plumber",
      experienceYears: 3,
      serviceMode: ServiceMode.ONSITE,
    },
  });
  console.log("Professional 2");
  console.log(professional2);

  // ProfessionalCategory — unique on [professionalProfileId, categoryId]
  const professionalCategory = await prisma.professionalCategory.upsert({
    where: {
      professionalProfileId_categoryId: {
        professionalProfileId: professional.id,
        categoryId: category.id,
      },
    },
    update: {},
    create: {
      professionalProfileId: professional.id,
      categoryId: category.id,
    },
  });
  console.log("Professional Category");
  console.log(professionalCategory);

  // ---------------------------------------------------------------------
  // SERVICE REQUEST — no unique field on this model, so check-then-create
  // instead of upsert (avoids duplicate rows on re-run)
  // ---------------------------------------------------------------------
  let request = await prisma.serviceRequest.findFirst({
    where: { requesterId: user.id, title: "Fan not working" },
  });

  if (!request) {
    request = await prisma.serviceRequest.create({
      data: {
        requesterId: user.id,
        categoryId: category.id,
        title: "Fan not working",
        description: "Ceiling fan stopped.",
        status: RequestStatus.OPEN,
      },
    });
  }
  console.log("Service Request");
  console.log(request);

  // ---------------------------------------------------------------------
  // BOOKING — no unique field either, so check-then-create
  // ---------------------------------------------------------------------
  let booking = await prisma.booking.findFirst({
    where: { serviceRequestId: request.id, userId: user.id, professionalId: professional.id },
  });

  if (!booking) {
    booking = await prisma.booking.create({
      data: {
        serviceRequestId: request.id,
        userId: user.id,
        professionalId: professional.id,
        status: BookingStatus.PENDING,
      },
    });
  }
  console.log("Booking");
  console.log(booking);

  console.log("\n===== SEED SUMMARY =====");
  console.log({
    user,
    user2,
    professionalUser,
    professionalUser2,
    profile,
    profile2,
    verification,
    verification2,
    professional,
    professional2,
    category,
    professionalCategory,
    request,
    booking,
  });
}

// ---------------------------------------------------------------------
// PULL EVERYTHING BACK OUT OF THE DB
// ---------------------------------------------------------------------
async function printAllData() {
  console.log("\n===== FULL DATABASE DUMP =====");

  const users = await prisma.user.findMany({
    include: {
      profile: true,
      professionalProfile: {
        include: { categories: { include: { category: true } } },
      },
      verification: true,
      serviceRequests: true,
      bookings: true,
    },
  });
  console.log("\n--- Users (with profile, professionalProfile, verification, requests, bookings) ---");
  console.log(JSON.stringify(users, null, 2));

  const categories = await prisma.category.findMany();
  console.log("\n--- Categories ---");
  console.log(categories);

  const serviceRequests = await prisma.serviceRequest.findMany({
    include: { requester: true, category: true, bookings: true },
  });
  console.log("\n--- Service Requests ---");
  console.log(JSON.stringify(serviceRequests, null, 2));

  const bookings = await prisma.booking.findMany({
    include: { serviceRequest: true, user: true, professional: true },
  });
  console.log("\n--- Bookings ---");
  console.log(JSON.stringify(bookings, null, 2));
}

main()
  .then(printAllData)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });