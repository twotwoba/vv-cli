import till from '@/utils/till'

export function resolveError(code: number, message?: string, needTip = true) {
    switch (code) {
        case 401:
            window.$message?.error('登录已过期，请重新登录')
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
    needTip && window.$message?.error(message)
    return message
}

/**
 * auto loading
 */
export const withLoading = <T extends (...args: any[]) => Promise<any>>(
    asyncFunction: T,
    loading?: Ref<boolean> | null
) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
        typeof loading?.value === 'boolean' && (loading.value = true)
        const [err, res] = await till(asyncFunction(...args))
        typeof loading?.value === 'boolean' && (loading.value = false)
        if (err) {
            console.error(err)
            return
        }
        return res.data
    }
}
