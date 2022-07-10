import { resolve } from 'path'

/**
 * 对 env 对象数据类型进行转换
 * @param {Object} envConf
 * @returns
 */
export function wrapperEnv(envConf) {
  const ret = {}

  Object.keys(envConf).forEach(key => {
    let val = envConf[key]

    val = val === 'true' ? true : val === 'false' ? false : val

    if (key === 'VITE_PORT') {
      val = Number(val)
    }

    ret[key] = val
  })

  return ret
}

export function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}
