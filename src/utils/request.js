import axios from 'axios'

const services = axios.create({
  baseURL: '/api',
  timeout: 8000
})

// 请求拦截
services.interceptors.request.use(
  config => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
services.interceptors.response.use(
  response => {
    const res = response.data

    /**
     * 这里使用的是自定义 Code 码来做统一的错误处理
     * code 等于 -1 则代表接口响应出错（可根据自己的业务来进行修改）
     */
    if (res.code === -1) {
      const msg = res.message || '未知错误，请联系管理员查看'

      console.error('[api]', msg)

      return Promise.reject(msg)
    }

    return res.data
  },
  error => {
    const { response } = error
    if (response && response.data) {
      return Promise.reject(error)
    } else {
      const { message } = error
      console.error('[api]', message)
      return Promise.reject(error)
    }
  }
)

export default services
