/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEWSAPI_KEY: process.env.NEWSAPI_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
}

module.exports = async () => {
  if (process.env.NODE_ENV === "development") {
    return nextConfig
  }

  const { default: withPWA } = await import("next-pwa")

  return withPWA({
    dest: "public",
    disable: false,
    register: true,
    skipWaiting: true,
    swSrc: "public/sw.js",
  })(nextConfig)
}
