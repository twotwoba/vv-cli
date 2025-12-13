/**
 * 自定义 FetchError 类
 * @description 用于统一处理 API 请求错误
 */
export class FetchError extends Error {
    status: number
    info?: Record<string, unknown>

    constructor(message: string, status: number, info?: Record<string, unknown>) {
        super(message)
        this.name = 'FetchError'
        this.status = status
        this.info = info
        Object.setPrototypeOf(this, FetchError.prototype)
    }

    is(status: number): boolean {
        return this.status === status
    }

    isUnauthorized(): boolean {
        return this.status === 401
    }

    isForbidden(): boolean {
        return this.status === 403
    }

    isServerError(): boolean {
        return this.status >= 500
    }
}

/**
 * HTTP 状态码对应的错误消息映射
 */
const ERROR_MESSAGES: Record<number, string> = {
    400: '请求参数错误',
    401: '登录已过期，请重新登录',
    403: '请求被拒绝',
    404: '请求资源或接口不存在',
    405: '请求方法不允许',
    408: '请求超时',
    429: '请求过于频繁，请稍后再试',
    500: '服务器发生异常',
    502: '网关错误',
    503: '服务暂时不可用',
    504: '网关超时'
}

/**
 * 解析 HTTP 错误状态码
 */
export function resolveError(code: number, customMessage?: string): string {
    if (code === 401) {
        // 清除 token
        localStorage.removeItem('auth_token')
    }
    return customMessage ?? ERROR_MESSAGES[code] ?? `【${code}】: 未知异常!`
}

/**
 * 业务响应数据结构
 */
interface ApiResponse<T = unknown> {
    code: number
    data?: T
    message?: string
}

/**
 * 处理 API 响应数据
 */
export function processData<T = unknown>(response: ApiResponse<T>): T {
    if (response.code >= 0 && response.code < 300) {
        return response.data as T
    }
    const message = response.message ?? resolveError(response.code)
    throw new FetchError(message, response.code, { response })
}

/**
 * 类型守卫
 */
export function isFetchError(error: unknown): error is FetchError {
    return error instanceof FetchError
}

