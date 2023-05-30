import type { PackageJson } from 'pkg-types'

function createCssOptions(root: string, packJson: PackageJson) {
  const preprocessorOptions: any = {}

  const { devDependencies = {} } = packJson
  const dependencyKeys = Object.keys(devDependencies)

  if (dependencyKeys.includes('less')) {
    preprocessorOptions.less = {
      additionalData: `@import "${root}/src/styles/less/global.less";`,
      javascriptEnabled: true,
    }
  }
  if (dependencyKeys.includes('sass')) {
    preprocessorOptions.scss = {
      additionalData: `@use "${root}/src/styles/scss/global.scss" as *;`,
      javascriptEnabled: true,
    }
  }
  return {
    preprocessorOptions,
  }
}

export { createCssOptions }
