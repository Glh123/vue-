import $ajax from 'axios'
import {Message} from 'element-ui'
export const baseURL = 'http://192.168.43.5:8080'
const axios = $ajax.create({
  baseURL,
  timeout: 1000
})
axios.interceptors.request.use((request) => {
  request.headers.token = localStorage.getItem('token') || '1'
  return request
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  const data = response.data
  if (!data) {
    return
  }
  if (data.status === 'success') {
    return data.data
  }
  if (data.status === 'token错误或失效') {
    // token失效 返回登陆页
    Message.error(data.errorContent)
    setTimeout(() => {
      // window.location.hash = `#/login#${window.location.pathname + window.location.search}`
    }, 400)
  }
  if (data.status === 'fail') {
    // 错误提示
    Message.error(data.errorMsg)
  }
}, (error) => {
  if (error.message !== 'axioscancel') {
    Message.error('网络不可用，请检查你的网络设置')
  }
  return Promise.reject(error)
})
export default {
  get: axios.get,
  post: axios.post
}
