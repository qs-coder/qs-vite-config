// https://github.com/antfu/vite-plugin-pwa
import { VitePWA } from 'vite-plugin-pwa'
import type { PackageJson } from 'pkg-types'

export function configPwaPlugin(pkg: PackageJson) {
  const { name } = pkg
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name,
      short_name: name,
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  })
}
