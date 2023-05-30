/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { PluginOption } from 'vite'

import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'deflate' | 'deflateRaw' | 'none',
  deleteOriginFile = false,
): PluginOption[] {
  const compressList = compress.split(',').filter(item => item && item !== 'none')
  const plugins: PluginOption[] = []

  compressList.forEach((plugin) => {
    const ext = plugin === 'brotli' ? '.br' : '.gz'
    const algorithm = plugin === 'brotli' ? 'brotliCompress' : (compress as 'gzip' | 'deflate' | 'deflateRaw')
    plugins.push(
      compressPlugin({
        ext,
        algorithm,
        deleteOriginFile,
      }),
    )
  })
  return plugins
}
