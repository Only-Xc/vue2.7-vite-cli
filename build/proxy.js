/**
 * { prefix: '/demo', target: 'http://localhost:3000/demo', removePrefix: true }
 * 最终会被转化为
 * {
 *   '/demo': {
 *      target: 'http://localhost:3000/demo',
 *      changeOrigin: true,
 *      ws: true,
 *      rewrite: path => path.replace(new RegExp('^/demo'), '')
 *    }
 * }
 */
const proxyList = [
  { prefix: '/demo', target: 'http://localhost:3000/demo', removePrefix: true },
  { prefix: '/api', target: 'http://localhost:3000/api' }
]

export default proxyList.reduce((pre, cur) => {
  const { prefix, target, removePrefix, ...res } = cur

  // https://www.vitejs.net/config/#server-proxy
  const proxyOpts = {
    target,
    changeOrigin: true,
    ws: true,
    ...res
  }

  // 移除前缀
  if (removePrefix) {
    proxyOpts.rewrite = path => path.replace(new RegExp(`^${prefix}`), '')
  }

  pre[prefix] = proxyOpts

  return pre
}, {})
