import { FetchError, resolveError } from './server-helper'
import { ServiceEnum } from './server-enum'
import { BareFetcher } from 'swr'
import { AUTH_KEY } from '@/lib/storage-keys'

const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
}
/**
 * @description            全局 Fetcher 函数
 * @returns {Promise<any>} 返回一个 Promise，解析为响应数据
 */
export const fetcher = async (url: string, options: RequestInit = {}): Promise<any> => {
    if (!url) {
        throw new FetchError('URL is required', 400)
    }
    if (typeof url !== 'string') {
        throw new FetchError('URL must be a string', 400)
    }

    const token = localStorage.getItem(AUTH_KEY) || ''
    if (token && !(options.headers && (options.headers as Record<string, string>)['Authorization'])) {
        defaultHeaders[AUTH_KEY] = token
    }

    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body)
    }

    const finalOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {})
        }
    }

    const response = await fetch(url, finalOptions)
    if (!response.ok) {
        const msg = resolveError(response.status)
        throw new FetchError('Fetch failed', response.status, { url, options, msg })
    }
    return response.json()
}

/**
 * @description        创建自定义 Fetch 实例
 * @param {string}     baseURL  基础 URL
 * @param {string}     gateway  网关
 * @param {string}     method   请求方法
 * @returns {Function} 返回一个自定义 Fetch 函数
 */
export const createFetcher = (
    baseURL: string,
    gateway?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
): BareFetcher<any> => {
    return async (endpoint: string, options: RequestInit = {}) => {
        const url = new URL(endpoint, baseURL + (gateway || '')).toString()
        return fetcher(url, { ...options, method })
    }
}

// ManageFetcher 请求实例
export const ManageFetcher = createFetcher(import.meta.env.VITE_API_URL, ServiceEnum.MANAGE)
export const ManageFetcherPost = createFetcher(import.meta.env.VITE_API_URL, ServiceEnum.MANAGE, 'POST')
