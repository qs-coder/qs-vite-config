import { readPackageJSON } from 'pkg-types'
import { type UserConfig, defineConfig, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import type { DefinePackageConfig } from 'types'
import { commonConfig } from './common'

function definePackageConfig(definePackageConfig: DefinePackageConfig = {}) {
  const { overrides = {} } = definePackageConfig
  const root = process.cwd()
  return defineConfig(async () => {
    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root)
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs',
        },
        rollupOptions: {
          external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        },
      },
      plugins: [
        dts({
          logLevel: 'error',
        }),
      ],
    }
    const mergedConfig = mergeConfig(commonConfig, packageConfig)

    return mergeConfig(mergedConfig, overrides)
  })
}

export { definePackageConfig }
