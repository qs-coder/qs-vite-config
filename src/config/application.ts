import type { DefineApplicationConfig, ImportMetaEnv } from 'types'
import { defineConfig, loadEnv, mergeConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { readPackageJSON } from 'pkg-types'
import { createDefineData } from './define'
import { createServerConfig } from './proxy'
import { createCssOptions } from './style'
import { commonConfig } from './common'
import { createPlugins } from '@/plugins'
import { getRootPath, getSrcPath, getTypesPath, wrapperEnv } from '@/utils'

function defineApplicationConfig(defineApplicationConfig: DefineApplicationConfig = {}) {
  const { overrides = {}, apiProxy = {} } = defineApplicationConfig

  return defineConfig(async ({ command, mode }: ConfigEnv) => {
    const root = getRootPath()
    const src = getSrcPath()
    const types = getTypesPath()

    const env = wrapperEnv(loadEnv(mode, root)) as ImportMetaEnv

    const pkgJson = await readPackageJSON(root)
    const define = createDefineData(pkgJson)
    const plugins = await createPlugins({ root, pkg: pkgJson, env, isBuild: command === 'build' })
    const css = createCssOptions(root, pkgJson)
    const applicationConfig: UserConfig = {
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          {
            find: /\/?@/,
            replacement: src,
          },
          {
            find: /\/?#/,
            replacement: types,
          },
        ],
        extensions: ['.vue'],
        dedupe: ['vue'],
      },
      define,
      plugins,
      css,
    }

    const mergedConfig = mergeConfig(commonConfig, applicationConfig)
    const serverConfig = createServerConfig(env, apiProxy)

    const config = mergeConfig(mergedConfig, serverConfig)

    return mergeConfig(config, overrides)
  })
}

export { defineApplicationConfig }
