import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { clearAuthToken } from "./lib/auth"
import { isFetchError } from "./service/server-helper"

// 创建 QueryClient 实例
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 失败重试次数
            retry: 2,
            // 重试延迟
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // 窗口聚焦时不自动重新获取
            refetchOnWindowFocus: false,
            // 网络重连时重新获取
            refetchOnReconnect: true,
            // 数据过期时间（5分钟）
            staleTime: 5 * 60 * 1000,
            // 缓存时间（10分钟）
            gcTime: 10 * 60 * 1000
        },
        mutations: {
            // mutation 失败不重试
            retry: false
        }
    }
})

function App() {
    const navigate = useNavigate()

    // 全局错误处理
    queryClient.setDefaultOptions({
        queries: {
            ...queryClient.getDefaultOptions().queries
        },
        mutations: {
            ...queryClient.getDefaultOptions().mutations,
            onError: (error) => {
                if (isFetchError(error) && error.isUnauthorized()) {
                    clearAuthToken()
                    navigate("/login")
                    // eslint-disable-next-line no-console
                    console.error("Unauthorized access detected. Redirecting to login page.", error)
                }
            }
        }
    })

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello World</h1>
                    <p className="text-gray-600">React + TanStack Query Template</p>
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default App
