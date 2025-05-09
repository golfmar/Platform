/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "res.cloudinary.com",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "images.unsplash.com",
  //       pathname: "/**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "tailwindcss.com",
  //       pathname: "/**",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
