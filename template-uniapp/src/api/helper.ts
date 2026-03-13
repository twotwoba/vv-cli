import { AUTH_KEY } from "@/constant/keys"
import type { RequestConfig, ApiResponse, RequestInterceptors } from "@/types/request"

/**
 * 请求封装
 */
class Request {
    // 基础配置
    private baseURL: string
    private timeout: number
    // 拦截器
    private interceptors?: RequestInterceptors

    constructor(baseUrl: string, interceptors?: RequestInterceptors, timeout = 100000) {
        this.baseURL = baseUrl
        this.timeout = timeout

        this.interceptors = interceptors
    }

    // 核心请求方法
    private request<T>(options: RequestConfig) {
        // 合并基础配置
        const finalConfig: RequestConfig = {
            url: this.baseURL + options.url,
            method: options.method || "GET",
            data: options.data || {},
            header: options.header || {},
            timeout: options.timeout || this.timeout
        }

        // 执行请求拦截器
        if (this.interceptors?.request) {
            const interceptorRes = this.interceptors.request(finalConfig)
            // 支持拦截器返回Promise
            if (interceptorRes instanceof Promise) {
                return interceptorRes.then((resolvedConfig) => {
                    return this.sendRequest<T>({
                        ...finalConfig,
                        ...resolvedConfig
                    })
                })
            }
            Object.assign(finalConfig, interceptorRes)
        }

        return this.sendRequest<T>(finalConfig)
    }
    private sendRequest<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
        return new Promise((resolve, reject) => {
            uni.request({
                ...config,
                success: (res: UniApp.RequestSuccessCallbackResult) => {
                    // HTTP状态码校验
                    if (res.statusCode !== 200) {
                        uni.showToast({
                            title: `请求失败：${res.statusCode}`,
                            icon: "none",
                            duration: 2000
                        })
                        reject({
                            code: res.statusCode,
                            msg: `HTTP错误：${res.statusCode}`,
                            data: null
                        })
                        return
                    }

                    const responseData = res.data as ApiResponse<T>

                    // 执行响应成功拦截器
                    if (this.interceptors?.responseSuccess) {
                        const interceptorRes = this.interceptors.responseSuccess(responseData)
                        if (interceptorRes instanceof Promise) {
                            interceptorRes
                                .then((resolvedData) => resolve(resolvedData))
                                .catch(reject)
                            return
                        }
                        resolve(interceptorRes)
                        return
                    }

                    // 业务状态码校验（根据业务定制）
                    if (responseData.code !== 200) {
                        uni.showToast({
                            title: responseData.message || "操作失败",
                            icon: "none",
                            duration: 2000
                        })
                        reject(responseData)
                        return
                    }

                    resolve(responseData)
                },
                fail: (err: UniApp.GeneralCallbackResult) => {
                    // 执行响应失败拦截器
                    if (this.interceptors?.responseFail) {
                        const interceptorErr = this.interceptors.responseFail(err)
                        reject(interceptorErr || err)
                    } else {
                        uni.showToast({
                            title: err.errMsg || "网络异常",
                            icon: "none",
                            duration: 2000
                        })
                        reject(err)
                    }
                },
                complete: () => {
                    uni.hideLoading()
                }
            })
        })
    }

    get(url: string, data = {}, options = {}) {
        return this.request({ url, method: "GET", data, ...options })
    }
    post(url: string, data = {}, options = {}) {
        return this.request({ url, method: "POST", data, ...options })
    }
    put(url: string, data = {}, options = {}) {
        return this.request({ url, method: "PUT", data, ...options })
    }
}

const baseURL = import.meta.env.VITE_API_URL
const interceptors: RequestInterceptors = {
    request: (config) => {
        const token = uni.getStorageSync(AUTH_KEY)
        if (token) {
            config.header = {
                ...config.header,
                platform: "MINI_PROGRAM",
                Authorization: `Bearer ${token}`
            }
        }
        return config
    },
    // 响应成功拦截器：可统一处理数据
    responseSuccess: (data) => {
        return data
    },
    // 响应失败拦截器：统一处理错误
    responseFail: (error) => {
        console.error("请求失败：", error)
        return error
    }
}

const request = new Request(baseURL, interceptors)
export default request
