import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
    useCache: true,
  },
  images: {
    domains: ["imagedelivery.net"],
  },
};

export default nextConfig;
