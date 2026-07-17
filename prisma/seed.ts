import { prisma } from "@/lib/prisma";

await prisma.category.createMany({
  data: [
    {
      name: "Electrician",
      slug: "electrician",
    },
    {
      name: "Plumber",
      slug: "plumber",
    },
    {
      name: "AC Repair",
      slug: "ac-repair",
    },
  ],
});