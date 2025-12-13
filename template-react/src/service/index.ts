import {
	useQuery,
	useMutation,
	useInfiniteQuery,
	type UseQueryOptions,
	type UseMutationOptions,
	type QueryKey
} from "@tanstack/react-query"
import { getAuthToken, isPublicApi } from "@/lib/auth"
import { AUTH_KEY } from "@/lib/global-keys"
import { filterObjNull } from "@/lib/utils"
import { FetchError, processData, resolveError } from "./server-helper"

// ============================================================================
// Types
// ============================================================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface RequestConfig extends Omit<RequestInit, "body"> {
	body?: Record<string, unknown> | FormData | string
	params?: Record<string, unknown>
}

interface FetcherOptions {
	baseURL?: string
	method?: HttpMethod
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
	const { baseURL = import.meta.env.VITE_API_URL, method = "GET", params, body, ...rest } = options

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

// ============================================================================
// Query Factory - 用于创建查询 hooks
// ============================================================================

type QueryOptions<TData, TParams> = Omit<
	UseQueryOptions<TData, FetchError, TData, QueryKey>,
	"queryKey" | "queryFn"
> & {
	params?: TParams
}

/**
 * 创建查询 Hook 工厂函数
 *
 * @template TData 响应数据类型
 * @template TParams 请求参数类型
 * @param endpoint API 端点
 * @param baseOptions 基础配置
 *
 * @example
 * // 定义 API
 * export const useUser = createQuery<User>('/api/user')
 * export const useUserById = createQuery<User, { id: string }>('/api/user')
 *
 * // 使用
 * const { data, isLoading } = useUser()
 * const { data } = useUserById({ params: { id: '123' } })
 */
export const createQuery = <TData = unknown, TParams extends Record<string, unknown> = Record<string, unknown>>(
	endpoint: string,
	baseOptions?: FetcherOptions
) => {
	return (options?: QueryOptions<TData, TParams>) => {
		const { params, ...queryOptions } = options ?? {}

		return useQuery<TData, FetchError>({
			queryKey: params ? [endpoint, params] : [endpoint],
			queryFn: () =>
				fetcher<TData>(endpoint, {
					...baseOptions,
					method: "GET",
					params: params as Record<string, unknown>
				}),
			...queryOptions
		})
	}
}

// ============================================================================
// Mutation Factory - 用于创建变更 hooks
// ============================================================================

type MutationOptions<TData, TBody> = Omit<
	UseMutationOptions<TData, FetchError, TBody>,
	"mutationFn"
>

/**
 * 创建变更 Hook 工厂函数
 *
 * @template TData 响应数据类型
 * @template TBody 请求体类型
 * @param endpoint API 端点
 * @param method HTTP 方法
 * @param baseOptions 基础配置
 *
 * @example
 * // 定义 API
 * export const useCreateUser = createMutation<User, CreateUserDTO>('/api/user', 'POST')
 * export const useUpdateUser = createMutation<User, UpdateUserDTO>('/api/user', 'PUT')
 * export const useDeleteUser = createMutation<void, { id: string }>('/api/user', 'DELETE')
 *
 * // 使用
 * const { mutate, mutateAsync, isPending } = useCreateUser()
 * mutate({ name: 'John', email: 'john@example.com' })
 */
export const createMutation = <TData = unknown, TBody = unknown>(
	endpoint: string,
	method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST",
	baseOptions?: Omit<FetcherOptions, "method">
) => {
	return (options?: MutationOptions<TData, TBody>) => {
		return useMutation<TData, FetchError, TBody>({
			mutationFn: (body: TBody) =>
				fetcher<TData>(endpoint, {
					...baseOptions,
					method,
					body: body as Record<string, unknown>
				}),
			...options
		})
	}
}

// ============================================================================
// Infinite Query Factory - 用于创建无限加载 hooks
// ============================================================================

interface PageParam {
	current: number
	pageSize?: number
}

interface InfiniteQueryOptions<TData, TParams> {
	params?: TParams
	pageSize?: number
	enabled?: boolean
	getNextPageParam?: (lastPage: TData, allPages: TData[]) => PageParam | undefined
}

/**
 * 创建无限查询 Hook 工厂函数
 *
 * @template TData 单页数据类型
 * @template TParams 额外请求参数类型
 * @param endpoint API 端点
 * @param baseOptions 基础配置
 *
 * @example
 * // 定义 API（假设返回 { list: User[], total: number }）
 * export const useUserList = createInfiniteQuery<{ list: User[], total: number }>('/api/users')
 *
 * // 使用
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserList({
 *   params: { status: 'active' },
 *   pageSize: 20
 * })
 */
export const createInfiniteQuery = <
	TData = unknown,
	TParams extends Record<string, unknown> = Record<string, unknown>
>(
	endpoint: string,
	baseOptions?: FetcherOptions
) => {
	return (options?: InfiniteQueryOptions<TData, TParams>) => {
		const { params, pageSize = 10, getNextPageParam, ...queryOptions } = options ?? {}

		return useInfiniteQuery<TData, FetchError, TData, QueryKey, PageParam>({
			queryKey: params ? [endpoint, "infinite", params] : [endpoint, "infinite"],
			queryFn: ({ pageParam }) =>
				fetcher<TData>(endpoint, {
					...baseOptions,
					method: "GET",
					params: {
						...params,
						current: pageParam.current,
						pageSize: pageParam.pageSize ?? pageSize
					} as Record<string, unknown>
				}),
			initialPageParam: { current: 1, pageSize },
			getNextPageParam:
				getNextPageParam ??
				((lastPage, allPages) => {
					// 默认实现：假设返回数据有 total 字段
					const page = lastPage as { total?: number; list?: unknown[] }
					const loadedCount = allPages.reduce((acc, p) => {
						const items = (p as { list?: unknown[] }).list
						return acc + (items?.length ?? 0)
					}, 0)

					if (page.total && loadedCount < page.total) {
						return { current: allPages.length + 1, pageSize }
					}
					return undefined
				}),
			...queryOptions
		})
	}
}

// ============================================================================
// Prefetch helpers - 用于预取数据
// ============================================================================

export { fetcher as apiFetcher }
