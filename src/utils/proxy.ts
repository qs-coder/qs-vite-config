import type { ProxyOptions } from 'vite'
import type { ApiProxyConfig, ApiProxyEnvConfig, ImportMetaEnv } from 'types'

/**
 * 设置网络代理
 * @param enabled - 是否开启代理，默认开启
 * @param config - 请求代理环境配置
 */
export function setupViteProxy(config: Array<ApiProxyEnvConfig>) {
  const proxy: Record<string, ProxyOptions> = {}
  const httpsRE = /^https:\/\//

  config.forEach(({ pattern, url }) => {
    const isHttps = httpsRE.test(url)
    proxy[pattern] = {
      target: url,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${pattern}`), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  })

  return proxy
}

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv, proxyConfig: ApiProxyConfig): Array<ApiProxyEnvConfig> {
  if (!proxyConfig) {
    return []
  }
  const { VITE_SERVICE_ENV = 'dev' } = env
  const proxyList = proxyConfig[VITE_SERVICE_ENV]
  return proxyList || []
}
