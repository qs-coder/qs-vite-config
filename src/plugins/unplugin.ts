import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { transformShortVmodel } from '@vue-macros/short-vmodel'
import type { ApplicationPluginsOptions } from 'types'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import type { PluginOption } from 'vite'
import { getSrcPath, getTypesPath, uiResolver } from '@/utils'

export function configUnplugins({ env, pkg }: ApplicationPluginsOptions): PluginOption[] {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = env

  const srcPath = getSrcPath()
  const localIconPath = `${srcPath}/assets/icons`
  const typesPath = getTypesPath()

  /** 本地svg图标集合名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  return [
    DefineOptions(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true,
          template: {
            compilerOptions: {
              nodeTransforms: [
                transformShortVmodel({
                  prefix: '$',
                }),
              ],
            },
          },
        }),
        vueJsx: VueJsx({
          include: [/\.jsx$/, /\.tsx$/],
        }),
      },
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/core', '@vueuse/head',
      ],
      dts: `${typesPath}/auto-imports.d.ts`,
      dirs: [`${srcPath}/composables`, `${srcPath}/stores`, `${srcPath}/hooks`],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: `${typesPath}/components.d.ts`,
      resolvers: [
        ...uiResolver(pkg),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX }),
      ],
    }),

  ]
}
