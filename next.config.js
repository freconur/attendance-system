/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "https://console.firebase.google.com/",
      },
    ],
    domains: ['firebasestorage.googleapis.com'],
    // path: `assets/slider/*`,
  }
}

module.exports = nextConfig
