import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.165.75.216", "10.119.239.216"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpl6qalwd/**",
      },
    ],
  },
};

export default nextConfig;
