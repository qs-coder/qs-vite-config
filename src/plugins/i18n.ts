import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { getPath } from '@/utils'

export function i18n() {
  return VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    include: [getPath('locales/**')],
  })
}
