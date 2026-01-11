import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EMAZ Empire',
    short_name: 'EMAZ',
    description: 'EMAZ Search built on a 369 design system.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000B1E',
    theme_color: '#000B1E',
    icons: [
      {
        src: '/icons/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
