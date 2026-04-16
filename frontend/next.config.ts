import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "factorystrapi.mcgilleus.ca",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
