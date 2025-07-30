import useSWR, { type BareFetcher, type SWRConfiguration } from "swr"
import useSWRMutation from "swr/mutation"
import { AUTH_KEY } from "@/lib/global-keys"
import { filterObjNull } from "@/lib/utils"
import { getAuthToken, isPublicApi } from "@/service/auth"
import { FetchError, processData, resolveError } from "./server-helper"

const defaultHeaders: HeadersInit = {
	"Content-Type": "application/json",
}
/**
 * @description            全局 Fetcher 函数
 * @returns {Promise<any>} 返回一个 Promise，解析为响应数据
 */
export const fetcher = async (url: string, options: RequestInit = {}): Promise<any> => {
	if (!url) {
		throw new FetchError("URL is required", 400)
	}
	if (typeof url !== "string") {
		throw new FetchError("URL must be a string", 400)
	}

	const token = getAuthToken()

	// 检查URL是否是 PASS 开头的接口（登录、注册等不需要认证的接口）
	if (
		token &&
		!isPublicApi(url) &&
		!(options.headers && (options.headers as Record<string, string>)[AUTH_KEY])
	) {
		defaultHeaders[AUTH_KEY] = token
	}

	if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
		options.body = JSON.stringify(options.body)
	}

	const finalOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...(options.headers || {}),
		},
	}

	const response = await fetch(url, finalOptions)
	// console.log('======response log=====>', response)
	if (!response.ok) {
		const msg = resolveError(response.status)
		throw new FetchError("SWR Fetch failed", response.status, {
			url,
			options,
			msg,
		})
	}
	const res = await response.json()
	return processData(res)
}

/**
 * @description        创建自定义 Fetch 实例
 * @param {string}     baseURL  基础 URL
 * @param {string}     method   请求方法
 * @returns {Function} 返回一个自定义 Fetch 函数
 */
export const createFetcher = (
	baseURL: string,
	method?: "GET" | "POST" | "PUT" | "DELETE",
): BareFetcher<any> => {
	return async (endpoint: string | [string, any], options: RequestInit = {}) => {
		// 处理本地代理和线上环境的URL
		let url: string
		let midEndpoint: string
		let params = null
		if (Array.isArray(endpoint)) {
			midEndpoint = endpoint[0]
			params = endpoint[1]
			params = filterObjNull(endpoint[1] || "") // 处理参数
		} else {
			midEndpoint = endpoint
		}
		if (baseURL.startsWith("http://") || baseURL.startsWith("https://")) {
			url = new URL(midEndpoint, baseURL).toString()
		} else {
			url = baseURL.endsWith("/")
				? baseURL + midEndpoint.replace(/^\//, "")
				: baseURL + (midEndpoint.startsWith("/") ? midEndpoint : `/${midEndpoint}`)
		}

		if (params) {
			// biome-ignore lint/style/useTemplate: <string concatenation is clearer here>
			url = url + "?" + new URLSearchParams(params).toString()
		}
		return fetcher(url, { ...options, method })
	}
}

//  请求实例
const GetFetcher = createFetcher(import.meta.env.VITE_API_URL, "GET")
const PostFetcher = createFetcher(import.meta.env.VITE_API_URL, "POST")
const PutFetcher = createFetcher(import.meta.env.VITE_API_URL, "PUT")
const DeleteFetcher = createFetcher(import.meta.env.VITE_API_URL, "DELETE")

/**
 * @param       endpoint API
 * @template    T 请求返回的数据类型
 * @template    P 请求查询参数的数据类型
 * @description 创建一个查询 hook，使用 SWR 进行数据获取
 * @example
 * const useUser = createQuery<User>('/api/user')
 */
export const createQuery = <T = any, P = any>(endpoint: string) => {
	if (!endpoint) {
		throw new Error("Endpoint is required for query")
	}

	return (options?: { enabled?: boolean; params?: P } & SWRConfiguration) => {
		const shouldFetch = options?.enabled !== false

		const { data, error, isLoading, mutate, isValidating } = useSWR<T>(
			shouldFetch ? [endpoint, options?.params] : null,
			GetFetcher,
			options,
		)

		return {
			data,
			error,
			isLoading,
			isValidating,
			mutate,
			isError: !!error,
			isSuccess: !error && !isLoading && data !== undefined,
		}
	}
}

/**
 * @param       endpoint API
 * @template    T 请求发送的数据类型
 * @description 创建一个变更函数，使用 SWR Mutation 进行数据提交
 * @example
 * const useCreateUser = createMutation<User>('/api/user', 'POST')
 */
export const createMutation = <T>(endpoint: string, method?: "POST" | "PUT" | "DELETE") => {
	if (!endpoint) {
		throw new Error("Endpoint is required for mutation")
	}
	let fetcher: BareFetcher<T>
	switch (method) {
		case "POST":
			fetcher = PostFetcher
			break
		case "PUT":
			fetcher = PutFetcher
			break
		case "DELETE":
			fetcher = DeleteFetcher
			break
		default:
			fetcher = PostFetcher
	}
	return () => {
		const { data, error, isMutating, trigger, reset } = useSWRMutation(
			endpoint,
			(url, { arg }: { arg: T }) => fetcher(url, { body: JSON.stringify(arg) }),
		)
		return { data, error, isMutating, trigger, reset }
	}
}
