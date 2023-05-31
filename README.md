# Vite Config for Qingshi

## 项目描述
    为了简化Vite的配置，提取该项目，其中含有define/plugins/server等的配置

## 使用说明

### 安装
  ```bash
   pnpm add -D @qs-coder/qs-vite-config 
  ```

### 配置
  1. 创建vite.config.ts，内容如下：
  ```typescript
  import { defineApplicationConfig } from '@qs-coder/qs-vite-config'

  export default defineApplicationConfig({
    overrides: {}, // 覆盖或扩展原有配置
    apiProxy: {}, // 服务API的代理配置
  })
  ```

   2. 对相关插件的控制变量:
   
| 变量名                                 | 默认值 | 说明                                                             |
| -------------------------------------- | :----: | ---------------------------------------------------------------- |
| VITE_GLOB_USE_MOCK                     | false  | 是否开启在build模式下的mock功能                                  |
| VITE_GLOB_DROP_CONSOLE                 |  true  | 是否在生产环境下删除console/debugger日志                         |
| VITE_ENABLE_HTTP_PROXY                 | false  | 是否开启API代理模式                                              |
| VITE_ENABLE_ANALYZE                    | false  | 是否开启打包文件大小结果分析                                     |
| VITE_ENABLE_COMPRESS                   | false  | 是否开启打包压缩                                                 |
| VITE_BUILD_COMPRESS                    | 'gzip' | 压缩方式类型，'gzip'\| 'brotli'\|'deflate'\|'deflateRaw'\|'none' |
| VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE | false  | 使用压缩时是否删除原始文件                                       |
| VITE_HASH_ROUTE                        | false  | hash路由模式                                                     |
| VITE_ENABLE_VERCEL                     | false  | 是否是部署的vercel                                               |
| VITE_ENABLE_PWA                        | false  | 是否开启PWA                                                      |

