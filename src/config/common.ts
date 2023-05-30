import { type UserConfig } from 'vite'

const commonConfig: UserConfig = {
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    sourcemap: false,
    rollupOptions: {
      // Prevent memory overflow
      maxParallelFileOps: 3,
    },
    commonjsOptions: {
      ignoreTryCatch: false,
    },
  },
}

export { commonConfig }
