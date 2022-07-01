/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["wine.com.br"],
    loader: "custom",
    path: "/",
  },
};

module.exports = nextConfig;
