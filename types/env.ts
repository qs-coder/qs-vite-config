import type { ApiProxyEnvType } from './config'

export interface ImportGlobalMetaEnv {
  /** 应用名称 */
  readonly VITE_GLOB_APP_NAME: string
  /** 应用标题 */
  readonly VITE_GLOB_APP_TITLE: string
  /** 应用描述 */
  readonly VITE_GLOB_APP_DESC: string
  /** 网站前缀 */
  readonly VITE_GLOB_BASE_URL: string
  /** 接口地址 */
  readonly VITE_GLOB_API_URL: string
  /** 接口前缀 */
  readonly VITE_GLOB_API_URL_PREFIX?: string
  /** 上传地址 */
  readonly VITE_GLOB_UPLOAD_URL?: string
  /** 图片前缀地址 */
  readonly VITE_GLOB_IMG_URL?: string
  /** 生产环境开启mock */
  readonly VITE_GLOB_USE_MOCK: boolean
  /** 生产环境删除console */
  readonly VITE_GLOB_DROP_CONSOLE: boolean
}

export interface ImportMetaEnv extends ImportGlobalMetaEnv {
  /** 本地Server启动端口 */
  readonly VITE_PORT: number
  /**
 * 权限路由模式:
 * - static - 前端声明的静态
 * - dynamic - 后端返回的动态
 */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic'
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: string
  /** iconify图标作为组件的前缀 */
  readonly VITE_ICON_PREFIX: string
  /**
 * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
 * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
 * - 例如：icon-local
 */
  readonly VITE_ICON_LOCAL_PREFIX: string
  /** 后端服务的环境类型 */
  readonly VITE_SERVICE_ENV?: ApiProxyEnvType
  /** 开启请求代理 */
  readonly VITE_ENABLE_HTTP_PROXY?: boolean
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_ENABLE_ANALYZE?: boolean
  /** 是否开启打包压缩 */
  readonly VITE_ENABLE_COMPRESS?: boolean
  /** 是否应用PWA */
  readonly VITE_ENABLE_PWA?: boolean
  /** 是否是部署的vercel */
  readonly VITE_ENABLE_VERCEL?: boolean
  /** 压缩方式类型 */
  readonly VITE_BUILD_COMPRESS?: 'gzip' | 'brotli' | 'deflate' | 'deflateRaw' | 'none'
  /** 使用压缩时是否删除原始文件 */
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE?: boolean
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: boolean
}
