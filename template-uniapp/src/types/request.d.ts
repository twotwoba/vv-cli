/**
 * 请求配置类型
 */
export interface RequestConfig {
    url: string // endpoint
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
    data?: Record<string, any>
    header?: Record<string, string>
    timeout?: number
    [key: string]: any // 拓展字段
}

/**
 * 返回数据结构类型
 */
export interface ApiResponse<T = any> {
    code: number | string
    message: string
    data: T
}

/**
 * 拦截器类型
 */
export interface RequestInterceptors {
    request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>

    responseSuccess?: <T = any>(data: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>
    responseFail?: (error: UniApp.RequestFailCallbackResult) => any
}
