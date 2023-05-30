import type { UserConfig } from 'vite'
import type { PackageJson } from 'pkg-types'
import type { ImportMetaEnv } from './env'

export type ApiProxyEnvType = 'dev' | 'test' | 'prod' | string

export interface ApiProxyEnvConfig {
  /** 匹配路径的正则字符串, 用于拦截地址转发代理(任意以 /开头 + 字符串, 单个/不起作用) */
  pattern: string
  /** 请求地址 */
  url: string
}

/** 请求服务的环境配置 */
export type ApiProxyConfig = Record<ApiProxyEnvType, Array<ApiProxyEnvConfig>>

export interface DefineApplicationConfig {
  overrides?: UserConfig
  apiProxy?: ApiProxyConfig
  options?: object
}

export type DefinePackageConfig = DefineApplicationConfig

export interface ApplicationPluginsOptions {
  root: string
  pkg: PackageJson
  env: ImportMetaEnv
  isBuild: boolean
}

export type UIType = 'naive' | 'antdv' | 'element' | 'vant'
export type UIConfig = Record<UIType, boolean>
