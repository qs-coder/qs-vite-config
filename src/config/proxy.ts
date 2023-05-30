import { type UserConfig } from 'vite'
import { getServiceEnvConfig, setupViteProxy } from '../utils/proxy'
import type { ImportMetaEnv } from '#/env'
import type { ApiProxyConfig } from '#/config'

export function createServerConfig(env: ImportMetaEnv, proxyConfig: ApiProxyConfig): UserConfig {
  const { VITE_ENABLE_HTTP_PROXY: enable, VITE_PORT: port } = env
  return {
    server: {
      host: '0.0.0.0',
      port,
      open: true,
      proxy: enable ? setupViteProxy(getServiceEnvConfig(env, proxyConfig)) : undefined,
    },
  }
}
