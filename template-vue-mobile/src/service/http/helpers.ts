import type { Ref } from 'vue'
import { Snackbar } from '@varlet/ui'
import till from '@/utils/till'

export function resolveError(code: number, message?: string, needTip = true) {
    switch (code) {
        case 401:
            Snackbar.error('登录已过期，请重新登录')
            return false
        case 403:
            message = message ?? '请求被拒绝'
            break
        case 404:
            message = message ?? '请求资源或接口不存在'
            break
        case 500:
            message = message ?? '服务器发生异常'
            break
        default:
            message = message ?? `【${code}】: 未知异常!`
            break
    }
    if (needTip) {
        Snackbar.error(message)
    }
    return message
}

/**
 * 包装异步函数，自动管理 loading 状态和错误拦截，避免程序崩溃
 * @param asyncFunction 异步函数
 * @param loading 可选的 loading ref
 * @returns 包装后的函数，返回 Promise 结果或 undefined（出错时）
 */
export function withLoading<TArgs extends unknown[], TResult>(
    asyncFunction: (...args: TArgs) => Promise<TResult>,
    loading?: Ref<boolean> | null
) {
    return async (...args: TArgs): Promise<TResult | undefined> => {
        if (loading) {
            loading.value = true
        }
        const [err, res] = await till(asyncFunction(...args))
        if (loading) {
            loading.value = false
        }
        if (err) {
            // 错误统一交给了拦截器
            console.error(err)
            return
        }
        return res
    }
}
