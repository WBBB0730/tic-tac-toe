import request from '@/utils/request.ts'

export function helloApi() {
  return request<any, any>({})
}
