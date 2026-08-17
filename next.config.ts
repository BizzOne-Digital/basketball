import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/uploads/**",
      },
      {
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/meet-the-mounties",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
