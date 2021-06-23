import axios from 'axios'
import { ElMessage } from 'element-plus'

import { getToken } from '../utils/storage'

const customErrors = [] // 自行处理报错信息的api

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 60 * 1000,
})

service.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.error('request error', error)
})

service.interceptors.response.use(res => {
  const { code, msg } = res.data || {}
  const url = res.config.url
  if (code === 200) {
    return res.data
  } else {
    if (customErrors.includes(url)) {
      return Promise.reject(msg)
    } else {
      // notify()
      return Promise.reject(msg)
    }
  }
}, error => {
  console.log('response error', error)
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '未授权，请登录'; break
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: break
    }
  }
  ElMessage({
    message: error.message,
    type: 'error',
    duration: 3 * 1000,
  })
  return Promise.reject(error)
})

export default service
