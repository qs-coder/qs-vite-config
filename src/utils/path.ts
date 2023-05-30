import path from 'node:path'

/**
 * 获取项目根路径
 * @descrition 末尾不带斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd())
}

/**
 * 获取项目src路径
 * @param srcName - src目录名称(默认: "src")
 * @descrition 末尾不带斜杠
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath()

  return `${rootPath}/${srcName}`
}

/**
 * 获取项目types路径
 * @param typesName - types目录名称(默认: "types")
 * @descrition 末尾不带斜杠
 */
export function getTypesPath(typesName = 'types') {
  const rootPath = getRootPath()

  return `${rootPath}/${typesName}`
}

/**
 * 指定文件的绝对目录
 * @param dir 指定的文件目录
 * @returns root + dir的目录
 */
export function getPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
