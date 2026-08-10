import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@foundation/ai", "@foundation/db", "@foundation/tools"],
  poweredByHeader: false,
};

export default nextConfig;
