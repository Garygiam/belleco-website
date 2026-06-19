import type { NextConfig } from "next";

const envAllowed =
  process.env.NEXT_ALLOWED_DEV_ORIGINS
    ?.split(",")
    .map((v) => v.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "run-agent-6a22a703a7047e3261727c6b-mq23l61y-preview.agent-sandbox-my-b1-gw.trae.ai",
    "run-agent-6a22a703a7047e3261727c6b-mq29y472-preview.agent-sandbox-my-b1-gw.trae.ai",
    ...envAllowed,
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
        pathname: "/api/ide/v1/text_to_image",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
