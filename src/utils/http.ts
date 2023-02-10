import axios from 'axios'
import type {AxiosStatic, AxiosResponse, AxiosRequestConfig } from 'axios'
// import store from '../store';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import store from '../store'
export interface ResDataType<T> {
  code: number
  data: T
  message: string
  msg?: string
}

let http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间
  timeout: 60000
})
// 跨域请求带上cookie
http.defaults.withCredentials = false
http.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
http.interceptors.request.use(
  (config: any) => {
    if(store.access_token) {
      config.headers['Authorization'] = `Bearer ` + store.access_token
      // config.headers.common['Authorization'] = `Bearer ` + store.access_token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
