import { filterObjNull } from '@/utils'
import { FetchError, processData, resolveError } from './server-helper'

// ============================================================================
// Types
// ============================================================================

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestConfig extends Omit<RequestInit, 'body'> {
    body?: Record<string, unknown> | FormData | string
    params?: Record<string, unknown>
}

interface FetcherOptions {
    baseURL?: string
    method?: HttpMethod
}

// ============================================================================
// Constants
// ============================================================================

const AUTH_KEY = 'auth_token'

/**
 * 构建请求 headers
 */
const buildHeaders = (customHeaders?: HeadersInit): HeadersInit => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    const token = localStorage.getItem(AUTH_KEY)
    if (token) {
        headers[AUTH_KEY] = token
    }

    return { ...headers, ...(customHeaders as Record<string, string>) }
}

/**
 * 构建完整 URL
 */
const buildURL = (baseURL: string, endpoint: string, params?: Record<string, unknown>): string => {
    let url: string

    if (baseURL.startsWith('http://') || baseURL.startsWith('https://')) {
        const base = new URL(baseURL)
        const pathname = base.pathname === '/' ? '' : base.pathname
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
        url = new URL(pathname + normalizedEndpoint, base.origin).toString()
    } else {
        const separator = baseURL.endsWith('/') || endpoint.startsWith('/') ? '' : '/'
        url = baseURL + separator + endpoint.replace(/^\//, '')
    }

    if (params) {
        const filtered = filterObjNull(params)
        if (filtered && Object.keys(filtered).length > 0) {
            const searchParams = new URLSearchParams(filtered as Record<string, string>)
            url += (url.includes('?') ? '&' : '?') + searchParams.toString()
        }
    }

    return url
}

/**
 * 检查是否为公开 API
 */
const isPublicApi = (url: string): boolean => {
    return url.includes('/pass/') || url.startsWith('/pass')
}

// ============================================================================
// Core Fetcher
// ============================================================================

/**
 * 核心 fetch 函数
 */
export const fetcher = async <T = unknown>(
    endpoint: string,
    options: RequestConfig & FetcherOptions = {}
): Promise<T> => {
    const {
        baseURL = import.meta.env.VITE_API_URL,
        method = 'GET',
        params,
        body,
        ...rest
    } = options

    if (!endpoint) {
        throw new FetchError('Endpoint is required', 400)
    }

    // 构建 URL
    const shouldAppendParams = method === 'GET' || method === 'DELETE'
    const url = buildURL(baseURL, endpoint, shouldAppendParams ? params : undefined)

    // 构建 headers
    const skipAuth = isPublicApi(endpoint)
    const headers = buildHeaders(rest.headers)
    if (skipAuth) {
        delete (headers as Record<string, string>)[AUTH_KEY]
    }

    // 构建 body
    let finalBody: string | FormData | undefined
    const bodyData = body ?? (!shouldAppendParams ? params : undefined)
    if (bodyData) {
        if (bodyData instanceof FormData) {
            finalBody = bodyData
            delete (headers as Record<string, string>)['Content-Type']
        } else if (typeof bodyData === 'string') {
            finalBody = bodyData
        } else {
            finalBody = JSON.stringify(bodyData)
        }
    }

    const response = await fetch(url, {
        ...rest,
        method,
        headers,
        body: finalBody
    })

    if (!response.ok) {
        const msg = resolveError(response.status)
        throw new FetchError(msg, response.status, { url, method })
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
        const res = await response.json()
        return processData(res) as T
    }

    return response.text() as unknown as T
}

export { FetchError, isFetchError } from './server-helper'
