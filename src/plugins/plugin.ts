import type { PluginOption } from 'vite'
import type { ApplicationPluginsOptions } from 'types'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import VueDevtools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Progress from 'vite-plugin-progress'
import { getSrcPath } from '@/utils'

export function configPlugins({ env, isBuild }: ApplicationPluginsOptions): PluginOption[] {
  const { VITE_ICON_LOCAL_PREFIX } = env
  const srcPath = getSrcPath()
  const localIconPath = `${srcPath}/assets/icons`
  return [
    VueDevtools(),
    VueSetupExtend(),
    Progress(),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      svgoOptions: isBuild,
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),
  ]
}
