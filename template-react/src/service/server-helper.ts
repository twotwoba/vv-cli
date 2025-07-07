import { AUTH_KEY } from '@/lib/storage-keys'

/**
 * @description              自定义全局 FetchError
 * @param   {string} message 错误信息
 * @param   {number} status  HTTP 状态码
 * @param   {any}    info    额外信息
 * @extends {Error}
 * @example
 * const error = new FetchError('Not Found', 404, { resource: 'User' })
 */
export class FetchError extends Error {
    status: number
    info: any

    constructor(message: string, status: number, info?: any) {
        super(message)
        this.name = 'FetchError'
        this.status = status
        this.info = info
    }
}

/**
 * @description      解析错误状态码并返回对应的错误信息
 * @param {number}   code HTTP 状态码
 * @returns {string} 错误信息
 */
export function resolveError(code: number): string {
    let message: string | undefined
    switch (code) {
        case 401:
            message = '登录已过期，请重新登录'
            localStorage.removeItem(AUTH_KEY)
            break
        case 403:
            message = '请求被拒绝'
            break
        case 404:
            message = '请求资源或接口不存在'
            break
        case 500:
            message = '服务器发生异常'
            break
        default:
            message = `【${code}】: 未知异常!`
            break
    }
    return message
}
