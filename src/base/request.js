import $ajax from 'axios'
import {Message} from 'element-ui'
const baseURL = ''
const axios = $ajax.create({
  baseURL,
  timeout: 1000
})
axios.interceptors.request.use((request) => {
  request.headers.token = localStorage.getItem('token') || ''
  return request
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  const data = response.data
  if (!data) {
    return
  }
  if (data.success) {
    return data.result
  }
  if (data.errorCode === 'token错误或失效') {
    // token失效 返回登陆页
    Message.error(data.errorContent)
    setTimeout(() => {
      window.location.href = `/login#${window.location.pathname + window.location.search}`
    }, 400)
  }
  if (data.errorCode) {
    // 错误提示
    Message.warsning(data.errorContent)
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
