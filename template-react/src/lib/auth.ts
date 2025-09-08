/**
 * 身份验证相关工具函数
 */
import { AUTH_KEY } from "./global-keys"

/**
 * 检查是否为需要跳过认证的接口
 * @param url 请求的URL
 * @returns 如果是跳过认证的接口返回 true，否则返回 false
 */
export const isPublicApi = (url: string): boolean => {
	// 以 /pass/ 开头的所有接口都跳过认证检查
	return url.includes("/pass/") || url.startsWith("/pass")
}

/**
 * 检查用户是否已登录
 * @returns 如果用户已登录返回 true，否则返回 false
 */
export const isUserAuthenticated = (): boolean => {
	const token = localStorage.getItem(AUTH_KEY)
	return !!token && token.trim() !== ""
}

/**
 * 获取认证 token
 * @returns 返回认证 token，如果不存在返回空字符串
 */
export const getAuthToken = (): string => {
	return localStorage.getItem(AUTH_KEY) || ""
}

/**
 * 设置认证 token
 * @param token 认证 token
 */
export const setAuthToken = (token: string): void => {
	localStorage.setItem(AUTH_KEY, token)
}

/**
 * 清除认证 token
 */
export const clearAuthToken = (): void => {
	localStorage.removeItem(AUTH_KEY)
}
