import type { PackageJson } from 'pkg-types'
import dayjs from 'dayjs'

const PROJECT_BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss')

function createDefineData(pkgJson: PackageJson) {
  try {
    const { dependencies, devDependencies, name, version } = pkgJson
    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: PROJECT_BUILD_TIME,
    }
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    }
  }
  catch (error) {
    return {}
  }
}

export { createDefineData }
