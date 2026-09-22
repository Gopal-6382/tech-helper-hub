import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.165.75.216"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpl6qalwd/**", // restrict to your Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;