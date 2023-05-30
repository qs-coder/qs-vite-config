import { type PluginOption } from 'vite'
import type { ApplicationPluginsOptions } from 'types'
import { createAppConfigPlugin } from './config'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import { configPwaPlugin } from './pwa'
import { configUnplugins } from './unplugin'
import { configUnoPlugin } from './uno'
import { configVisualizerConfig } from './visualizer'

async function createPlugins({ root, pkg, env, isBuild }: ApplicationPluginsOptions) {
  const vitePlugins: (PluginOption | PluginOption[])[] = configUnplugins({ root, env, pkg, isBuild })

  const appConfigPlugin = await createAppConfigPlugin({ pkg, isBuild } as ApplicationPluginsOptions)
  vitePlugins.push(appConfigPlugin)

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(isBuild))

  // vite-plugin-pwa
  vitePlugins.push(configPwaPlugin(pkg))

  // The following plugins only work in the production environment
  if (isBuild && env.VITE_ENABLE_COMPRESS) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(env.VITE_BUILD_COMPRESS || 'none', env.VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )
  }

  // rollup-plugin-visualizer
  if (env.VITE_ENABLE_ANALYZE) {
    vitePlugins.push(configVisualizerConfig(root))
  }

  // vite-plugin-mock
  if (env.VITE_GLOB_USE_MOCK) {
    vitePlugins.push(configMockPlugin(root, isBuild))
  }

  // unocss
  vitePlugins.push(configUnoPlugin())

  return vitePlugins
}

export { createPlugins }
