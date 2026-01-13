import { useQuery, useMutation, useInfiniteQuery, type QueryKey } from '@tanstack/vue-query'
import type { Ref, ComputedRef } from 'vue'
import { computed, unref, toValue } from 'vue'
import { fetcher, FetchError } from './fetcher'

// ============================================================================
// Types
// ============================================================================

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

interface FetcherOptions {
    baseURL?: string
}

interface PageParam {
    current: number
    pageSize?: number
}

// ============================================================================
// Query Factory
// ============================================================================

interface QueryOptions<TParams> {
    params?: MaybeRef<TParams>
    enabled?: MaybeRef<boolean>
    staleTime?: number
    gcTime?: number
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
export const createQuery = <
    TData = unknown,
    TParams extends Record<string, unknown> = Record<string, unknown>
>(
    endpoint: string,
    baseOptions?: FetcherOptions
) => {
    return (options?: QueryOptions<TParams>) => {
        const params = computed(() => toValue(options?.params))
        const enabled = computed(() => toValue(options?.enabled) !== false)

        return useQuery<TData, FetchError>({
            queryKey: computed(() =>
                params.value ? [endpoint, params.value] : [endpoint]
            ) as unknown as QueryKey,
            queryFn: () =>
                fetcher<TData>(endpoint, {
                    ...baseOptions,
                    method: 'GET',
                    params: unref(params) as Record<string, unknown>
                }),
            enabled,
            staleTime: options?.staleTime,
            gcTime: options?.gcTime
        })
    }
}

// ============================================================================
// Mutation Factory
// ============================================================================

interface MutationOptions<TData, TBody> {
    onSuccess?: (data: TData, variables: TBody) => void
    onError?: (error: FetchError, variables: TBody) => void
    onSettled?: (data: TData | undefined, error: FetchError | null, variables: TBody) => void
}

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
 *
 * // 使用
 * const { mutate, mutateAsync, isPending } = useCreateUser()
 * mutate({ name: 'John', email: 'john@example.com' })
 */
export const createMutation = <TData = unknown, TBody = unknown>(
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
    baseOptions?: FetcherOptions
) => {
    return (options?: MutationOptions<TData, TBody>) => {
        return useMutation<TData, FetchError, TBody>({
            mutationFn: (body: TBody) =>
                fetcher<TData>(endpoint, {
                    ...baseOptions,
                    method,
                    body: body as Record<string, unknown>
                }),
            onSuccess: options?.onSuccess,
            onError: options?.onError,
            onSettled: options?.onSettled
        })
    }
}

// ============================================================================
// Infinite Query Factory
// ============================================================================

interface InfiniteQueryOptions<TParams> {
    params?: MaybeRef<TParams>
    pageSize?: number
    enabled?: MaybeRef<boolean>
    getNextPageParam?: (lastPage: unknown, allPages: unknown[]) => PageParam | undefined
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
 * // 定义 API
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
    return (options?: InfiniteQueryOptions<TParams>) => {
        const params = computed(() => toValue(options?.params))
        const enabled = computed(() => toValue(options?.enabled) !== false)
        const pageSize = options?.pageSize ?? 10

        return useInfiniteQuery<TData, FetchError, TData, QueryKey, PageParam>({
            queryKey: computed(() =>
                params.value ? [endpoint, 'infinite', params.value] : [endpoint, 'infinite']
            ) as unknown as QueryKey,
            queryFn: ({ pageParam }) =>
                fetcher<TData>(endpoint, {
                    ...baseOptions,
                    method: 'GET',
                    params: {
                        ...unref(params),
                        current: pageParam.current,
                        pageSize: pageParam.pageSize ?? pageSize
                    } as Record<string, unknown>
                }),
            initialPageParam: { current: 1, pageSize },
            getNextPageParam:
                options?.getNextPageParam ??
                ((lastPage, allPages) => {
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
            enabled
        })
    }
}

// ============================================================================
// Exports
// ============================================================================

export { fetcher, FetchError, isFetchError } from './fetcher'
