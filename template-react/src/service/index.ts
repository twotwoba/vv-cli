import {
	useQuery,
	useMutation,
	useInfiniteQuery,
	type UseQueryOptions,
	type UseMutationOptions,
	type QueryKey
} from "@tanstack/react-query"
import { FetchError } from "./server-helper"
import { fetcher, FetcherOptions } from "./fecher"

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
