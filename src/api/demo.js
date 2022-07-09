import request from '@/utils/request'

export const demo = {
  getList: params => {
    return request({
      url: '/demo',
      method: 'get',
      params
    })
  }
}
