import { getAuthToken, isPublicApi } from "@/lib/auth"
import { FetchError, processData, resolveError } from "./server-helper"
import { AUTH_KEY } from "@/lib/global-keys"
import { filterObjNull } from "@/lib/utils"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface FetcherOptions {
    baseURL?: string
    method?: HttpMethod
}

interface RequestConfig extends Omit<RequestInit, "body"> {
    body?: Record<string, unknown> | FormData | string
    params?: Record<string, unknown>
}

// ============================================================================
// Core Fetcher
// ============================================================================

/**
 * 构建请求 headers，每次请求创建新对象避免并发问题
 */
const buildHeaders = (customHeaders?: HeadersInit): HeadersInit => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    }

    const token = getAuthToken()
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

    if (baseURL.startsWith("http://") || baseURL.startsWith("https://")) {
        const base = new URL(baseURL)
        const pathname = base.pathname === "/" ? "" : base.pathname
        const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
        url = new URL(pathname + normalizedEndpoint, base.origin).toString()
    } else {
        const separator = baseURL.endsWith("/") || endpoint.startsWith("/") ? "" : "/"
        url = baseURL + separator + endpoint.replace(/^\//, "")
    }

    if (params) {
        const filtered = filterObjNull(params)
        if (filtered && Object.keys(filtered).length > 0) {
            const searchParams = new URLSearchParams(filtered as Record<string, string>)
            url += (url.includes("?") ? "&" : "?") + searchParams.toString()
        }
    }

    return url
}

/**
 * 核心 fetch 函数
 */
export const fetcher = async <T = unknown>(
    endpoint: string,
    options: RequestConfig & FetcherOptions = {}
): Promise<T> => {
    const {
        baseURL = import.meta.env.VITE_API_URL,
        method = "GET",
        params,
        body,
        ...rest
    } = options

    if (!endpoint) {
        throw new FetchError("Endpoint is required", 400)
    }

    // 构建 URL
    const shouldAppendParams = method === "GET" || method === "DELETE"
    const url = buildURL(baseURL, endpoint, shouldAppendParams ? params : undefined)

    // 构建 headers（跳过公开接口的 token）
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
            delete (headers as Record<string, string>)["Content-Type"]
        } else if (typeof bodyData === "string") {
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

    const contentType = response.headers.get("content-type")
    if (contentType?.includes("application/json")) {
        const res = await response.json()
        return processData(res) as T
    }

    return response.text() as unknown as T
}
