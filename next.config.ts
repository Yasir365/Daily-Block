import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    async headers() {
    return [
      {
        source: "/ico/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  // env: {
  //   NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //   NEXT_PUBLIC_API_PUBLIC_URL: process.env.NEXT_PUBLIC_API_PUBLIC_URL,
  // },
  // transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "bizz-ai-backend.updatemedaily.com",
  //       port: "",
  //       pathname: "/**",
  //     },
  //   ],
  // },
};

export default nextConfig;
