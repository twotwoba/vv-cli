// TanStack Query hooks for API calls
// 使用 createQuery, createMutation, createInfiniteQuery 工厂函数创建 API hooks

/*
============================================================================
Query 查询示例
============================================================================

import { createQuery } from '@/service/http'

// 定义类型
interface User {
    id: string
    name: string
    email: string
}

interface UserListParams {
    status?: 'active' | 'inactive'
    search?: string
}

// 创建查询 hook
export const useUser = createQuery<User>('/api/user')
export const useUserList = createQuery<User[], UserListParams>('/api/users')

// 使用示例
<script setup lang="ts">
const { data: user, isLoading, error } = useUser()

// 带参数的查询
const status = ref<'active' | 'inactive'>('active')
const { data: users } = useUserList({
    params: computed(() => ({ status: status.value })),
    enabled: computed(() => !!status.value)
})
</script>

<template>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>{{ user?.name }}</div>
</template>

============================================================================
Mutation 变更示例
============================================================================

import { createMutation } from '@/service/http'

interface CreateUserDTO {
    name: string
    email: string
}

// 创建变更 hook
export const useCreateUser = createMutation<User, CreateUserDTO>('/api/user', 'POST')
export const useUpdateUser = createMutation<User, Partial<User>>('/api/user', 'PUT')
export const useDeleteUser = createMutation<void, { id: string }>('/api/user', 'DELETE')

// 使用示例
<script setup lang="ts">
const { mutate, mutateAsync, isPending, error } = useCreateUser({
    onSuccess: (newUser) => {
        console.log('User created:', newUser)
    },
    onError: (error) => {
        console.error('Failed:', error.message)
    }
})

const handleSubmit = async (data: CreateUserDTO) => {
    // 方式1: 使用 mutate
    mutate(data)

    // 方式2: 使用 mutateAsync
    try {
        const newUser = await mutateAsync(data)
        console.log('User created:', newUser)
    } catch (err) {
        console.error('Failed:', err)
    }
}
</script>

============================================================================
Infinite Query 无限加载示例
============================================================================

import { createInfiniteQuery } from '@/service/http'

interface UserListResponse {
    list: User[]
    total: number
}

// 创建无限查询 hook
export const useInfiniteUserList = createInfiniteQuery<UserListResponse>('/api/users')

// 使用示例
<script setup lang="ts">
const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
} = useInfiniteUserList({
    params: { status: 'active' },
    pageSize: 20
})

// data.pages 是所有页面数据的数组
const allUsers = computed(() => data.value?.pages.flatMap(page => page.list) ?? [])
</script>

<template>
    <ul>
        <li v-for="user in allUsers" :key="user.id">{{ user.name }}</li>
    </ul>
    <button
        v-if="hasNextPage"
        @click="fetchNextPage()"
        :disabled="isFetchingNextPage"
    >
        {{ isFetchingNextPage ? 'Loading...' : 'Load More' }}
    </button>
</template>
*/
