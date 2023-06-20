import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  bundle: true,
  target: 'esnext',
  skipNodeModulesBundle: true,
})
