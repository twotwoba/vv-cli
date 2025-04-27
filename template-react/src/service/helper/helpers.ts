
export function resolveError(code: number, message?: string, _needTip = true) {
    switch (code) {
        case 401:
            // message.error('登录已过期，请重新登录')
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
    // _needTip && message.error(message)
    return message
}
