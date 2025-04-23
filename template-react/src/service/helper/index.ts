import axios from 'axios'
import { setupInterceptors } from './interceptors.ts'
import { ServiceEnum } from './service-enum.ts'

export function createAxios(options = {}) {
    const defaultOptions = {
        baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
            // ...
        }
    }
    const service = axios.create({
        ...defaultOptions,
        ...options
    })
    setupInterceptors(service)
    return service
}

/**
 * 多种请求实例
 */
export const request = createAxios()

export const ADemoRequest = createAxios({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL + ServiceEnum.A
})
export const BDemoRequest = createAxios({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL + ServiceEnum.B
})
