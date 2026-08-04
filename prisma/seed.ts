import {
  PrismaClient,
  Role,
  ServiceMode,
  VerificationStatus,
  RequestStatus,
  BookingStatus,
  PostStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------------------------------------------------------------------
  // 1. CATEGORIES
  // ---------------------------------------------------------------------
  await prisma.category.createMany({
    data: [
      { name: "Electrician", slug: "electrician" },
      { name: "Plumber", slug: "plumber" },
      { name: "AC Repair", slug: "ac-repair" },
      { name: "Carpenter", slug: "carpenter" },
    ],
    skipDuplicates: true,
  });

  const electrician = await prisma.category.findUniqueOrThrow({
    where: { slug: "electrician" },
  });
  const plumber = await prisma.category.findUniqueOrThrow({
    where: { slug: "plumber" },
  });

  const password = await bcrypt.hash("12345678", 10);

  // ---------------------------------------------------------------------
  // 2. USERS (2 regular users + 2 professionals)
  // ---------------------------------------------------------------------
  const user1 = await prisma.user.create({
    data: {
      name: "Gopal Krishnan",
      email: "gopal@test.com",
      phone: "9000000001",
      password,
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Divya Shree",
      email: "divya@test.com",
      phone: "9000000002",
      password,
      role: Role.USER,
    },
  });

  const proUser1 = await prisma.user.create({
    data: {
      name: "Arun Electrician",
      email: "arun.pro@test.com",
      phone: "9000000003",
      password,
      role: Role.PROFESSIONAL,
    },
  });

  const proUser2 = await prisma.user.create({
    data: {
      name: "Karthik Plumber",
      email: "karthik.pro@test.com",
      phone: "9000000004",
      password,
      role: Role.PROFESSIONAL,
    },
  });

  // ---------------------------------------------------------------------
  // 3. PROFILES (one-to-one with every user)
  // ---------------------------------------------------------------------
  await prisma.profile.createMany({
    data: [
      {
        userId: user1.id,
        city: "Dindigul",
        state: "Tamil Nadu",
        pincode: "624001",
      },
      {
        userId: user2.id,
        city: "Palani",
        state: "Tamil Nadu",
        pincode: "624601",
      },
      {
        userId: proUser1.id,
        city: "Dindigul",
        state: "Tamil Nadu",
        pincode: "624001",
      },
      {
        userId: proUser2.id,
        city: "Tiruppur",
        state: "Tamil Nadu",
        pincode: "641601",
      },
    ],
  });

  // ---------------------------------------------------------------------
  // 4. VERIFICATION (correct enum: VERIFIED, not APPROVED)
  // ---------------------------------------------------------------------
  await prisma.verification.create({
    data: {
      userId: proUser1.id,
      documentType: "aadhaar",
      status: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
    },
  });

  await prisma.verification.create({
    data: {
      userId: proUser2.id,
      documentType: "aadhaar",
      status: VerificationStatus.PENDING,
    },
  });

  // ---------------------------------------------------------------------
  // 5. PROFESSIONAL PROFILES + CATEGORY LINKS
  // ---------------------------------------------------------------------
  const professional1 = await prisma.professionalProfile.create({
    data: {
      userId: proUser1.id,
      headline: "Certified Electrician",
      description:
        "5+ years fixing residential and commercial electrical faults.",
      experienceYears: 5,
      hourlyRate: 300,
      serviceMode: ServiceMode.BOTH,
      isAvailable: true,
    },
  });

  const professional2 = await prisma.professionalProfile.create({
    data: {
      userId: proUser2.id,
      headline: "Licensed Plumber",
      description:
        "Handles leak repairs, pipe fitting, and bathroom installations.",
      experienceYears: 3,
      hourlyRate: 250,
      serviceMode: ServiceMode.ONSITE,
      isAvailable: true,
    },
  });

  await prisma.professionalCategory.createMany({
    data: [
      { professionalProfileId: professional1.id, categoryId: electrician.id },
      { professionalProfileId: professional2.id, categoryId: plumber.id },
    ],
  });

  // ---------------------------------------------------------------------
  // 6. SERVICE REQUEST
  // ---------------------------------------------------------------------
  const request1 = await prisma.serviceRequest.create({
    data: {
      requesterId: user1.id,
      categoryId: electrician.id,
      title: "Fan not working",
      description: "Ceiling fan stopped suddenly, no rotation at all.",
      mode: ServiceMode.ONSITE,
      status: RequestStatus.OPEN,
      city: "Dindigul",
    },
  });

  const request2 = await prisma.serviceRequest.create({
    data: {
      requesterId: user2.id,
      categoryId: plumber.id,
      title: "Leaking kitchen pipe",
      description: "Water leaking under the kitchen sink for two days.",
      mode: ServiceMode.ONSITE,
      status: RequestStatus.OPEN,
      city: "Palani",
    },
  });

  // ---------------------------------------------------------------------
  // 7. BOOKING (links ServiceRequest + User + ProfessionalProfile)
  // ---------------------------------------------------------------------
  const booking1 = await prisma.booking.create({
    data: {
      serviceRequestId: request1.id,
      userId: user1.id,
      professionalId: professional1.id,
      status: BookingStatus.COMPLETED,
      amount: 500,
      acceptedAt: new Date(),
      startedAt: new Date(),
      completedAt: new Date(),
    },
  });

  await prisma.booking.create({
    data: {
      serviceRequestId: request2.id,
      userId: user2.id,
      professionalId: professional2.id,
      status: BookingStatus.PENDING,
    },
  });

  // ---------------------------------------------------------------------
  // 8. REVIEW (one-to-one with a completed Booking)
  // ---------------------------------------------------------------------
  await prisma.review.create({
    data: {
      bookingId: booking1.id,
      userId: user1.id,
      professionalId: professional1.id,
      rating: 5,
      comment: "Fixed the fan quickly and explained the issue clearly.",
    },
  });

  // keep professional stats consistent with the seeded review/booking
  await prisma.professionalProfile.update({
    where: { id: professional1.id },
    data: { averageRating: 5, reviewCount: 1, completedJobs: 1, totalJobs: 1 },
  });

  // ---------------------------------------------------------------------
  // 9. COMMUNITY: POST + COMMENT + REPLY + LIKE
  // ---------------------------------------------------------------------
  const post1 = await prisma.problemPost.create({
    data: {
      authorId: user1.id,
      categoryId: electrician.id,
      title: "Ceiling fan makes buzzing noise before stopping",
      content: "Any idea what could cause this before the motor cuts out?",
      status: PostStatus.OPEN,
      city: "Dindigul",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      authorId: proUser1.id,
      content:
        "Sounds like a capacitor issue, get it checked before the motor burns out.",
    },
  });

  await prisma.commentReply.create({
    data: {
      commentId: comment1.id,
      authorId: user1.id,
      content: "Thanks, will get the capacitor replaced.",
    },
  });

  await prisma.postLike.create({
    data: { postId: post1.id, userId: user2.id },
  });

  await prisma.savedPost.create({
    data: { userId: user2.id, postId: post1.id },
  });

  // ---------------------------------------------------------------------
  // 10. FOLLOW
  // ---------------------------------------------------------------------
  await prisma.follow.create({
    data: { followerId: user2.id, followingId: proUser1.id },
  });

  // ---------------------------------------------------------------------
  // 11. NOTIFICATION
  // ---------------------------------------------------------------------
  await prisma.notification.create({
    data: {
      userId: proUser1.id,
      type: "BOOKING",
      title: "New booking accepted",
      body: "Your booking for 'Fan not working' has been completed.",
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
