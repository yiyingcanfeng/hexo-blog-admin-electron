import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store/index'
import router from '@/router'
// eslint-disable-next-line no-unused-vars
const { session } = require('electron')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true // 允许携带cookie
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['jsessionid'] = store.getters.jsessionid
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const cookieHeader = response.headers['set-cookie']
    if (cookieHeader) {
      for (const header of cookieHeader) {
        if (header.split(';')[0]) {
          //
        }
      }
    }
    const res = response.data

    // 如果code不是0, 即判断为非正常请求.
    if (res.code !== 0) {
      // -2: 登录信息已过期;
      if (res.code === -2) {
        // to re-login
        MessageBox.confirm('您的登录信息已失效，请重新登录', '提示信息', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          // location.reload()
          router.push('/login')
          // store.dispatch('resetToken').then(() => {
          // })
        })
      }
      // -3: 用户名或密码错误
      if (res.code === -3) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.message))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
