import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
