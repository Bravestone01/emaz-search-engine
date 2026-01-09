/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
