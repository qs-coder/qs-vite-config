import type { PackageJson } from 'pkg-types'
import { AntDesignVueResolver, ElementPlusResolver, NaiveUiResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import type { UIConfig } from '#/config'

function uiConfig(pkg: PackageJson): UIConfig {
  const dependenceKeys = Object.keys(pkg.dependencies as object) as string[]
  return {
    naive: dependenceKeys.includes('naive-ui'),
    antdv: dependenceKeys.includes('ant-design-vue'),
    element: dependenceKeys.includes('element-plus'),
    vant: dependenceKeys.includes('vant'),
  }
}

export function uiResolver(pkg: PackageJson) {
  const config = uiConfig(pkg)
  const uiResolvers = []
  if (config.naive) {
    uiResolvers.push(NaiveUiResolver())
  }
  if (config.antdv) {
    uiResolvers.push(AntDesignVueResolver())
  }
  if (config.element) {
    uiResolvers.push(ElementPlusResolver())
  }
  if (config.vant) {
    uiResolvers.push(VantResolver())
  }
  return uiResolvers
}
