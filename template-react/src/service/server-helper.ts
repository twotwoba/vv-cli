import { clearAuthToken } from "../lib/auth"

/**
 * 自定义 FetchError 类
 * @description 用于统一处理 API 请求错误
 * @example
 * throw new FetchError('Not Found', 404, { resource: 'User' })
 */
export class FetchError extends Error {
    status: number
    info?: Record<string, unknown>

    constructor(message: string, status: number, info?: Record<string, unknown>) {
        super(message)
        this.name = "FetchError"
        this.status = status
        this.info = info

        // 保持正确的原型链
        Object.setPrototypeOf(this, FetchError.prototype)
    }

    /**
     * 判断是否为特定状态码的错误
     */
    is(status: number): boolean {
        return this.status === status
    }

    /**
     * 判断是否为未授权错误
     */
    isUnauthorized(): boolean {
        return this.status === 401
    }

    /**
     * 判断是否为禁止访问错误
     */
    isForbidden(): boolean {
        return this.status === 403
    }

    /**
     * 判断是否为服务端错误
     */
    isServerError(): boolean {
        return this.status >= 500
    }
}

/**
 * HTTP 状态码对应的错误消息映射
 */
const ERROR_MESSAGES: Record<number, string> = {
    400: "请求参数错误",
    401: "登录已过期，请重新登录",
    403: "请求被拒绝",
    404: "请求资源或接口不存在",
    405: "请求方法不允许",
    408: "请求超时",
    429: "请求过于频繁，请稍后再试",
    500: "服务器发生异常",
    502: "网关错误",
    503: "服务暂时不可用",
    504: "网关超时"
}

/**
 * 解析 HTTP 错误状态码并返回对应的错误信息
 * @param code HTTP 状态码
 * @param customMessage 自定义消息（可选）
 * @returns 错误信息
 */
export function resolveError(code: number, customMessage?: string): string {
    // 401 需要清除 token
    if (code === 401) {
        clearAuthToken()
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
 * @description 统一处理业务层面的响应，区分成功和业务错误
 * @param response API 响应数据
 * @returns 解析后的数据
 * @throws FetchError 当业务码表示失败时抛出
 */
export function processData<T = unknown>(response: ApiResponse<T>): T {
    // 成功响应码范围：0-299
    if (response.code >= 0 && response.code < 300) {
        return response.data as T
    }

    // 业务错误
    const message = response.message ?? resolveError(response.code)
    throw new FetchError(message, response.code, { response })
}

/**
 * 类型守卫：判断是否为 FetchError
 */
export function isFetchError(error: unknown): error is FetchError {
    return error instanceof FetchError
}
