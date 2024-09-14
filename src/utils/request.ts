import axios, { AxiosRequestConfig } from 'axios'

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  },
)

function request<D, T>(config: AxiosRequestConfig<D>): Promise<ApiResponse<T>> {
  let a

  console.log(a)

  return service(config)
}

export default request
