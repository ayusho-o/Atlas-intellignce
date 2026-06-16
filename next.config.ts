import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { domains: ["logo.clearbit.com", "cdn.brandfetch.io"] },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
