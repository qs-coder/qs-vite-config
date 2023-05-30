import { join } from 'node:path'
import type { ImportMetaEnv } from 'types'

import dotenv from 'dotenv'
import { readFile } from 'fs-extra'

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ImportMetaEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      }
      catch (error) { }
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string
  const reg = /--mode ([a-z_\d]+)/
  const result = reg.exec(script)
  if (result) {
    const mode = result[1]
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export async function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {}

  for (const confFile of confFiles) {
    try {
      const envPath = await readFile(join(process.cwd(), confFile), { encoding: 'utf8' })
      const env = dotenv.parse(envPath)
      envConfig = { ...envConfig, ...env }
    }
    catch (e) {
      console.error(`Error in parsing ${confFile}`, e)
    }
  }
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}
