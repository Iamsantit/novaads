/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't block production builds on lint or non-fatal TS warnings.
  // CI/IDE still flag them; this just prevents Vercel from failing on minor issues.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" }
    ]
  }
};

module.exports = nextConfig;
