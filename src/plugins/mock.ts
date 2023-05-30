/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(root: string, isBuild: boolean) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: `${root}/mock`,
    enable: isBuild,
    watchFiles: true,
  })
}
