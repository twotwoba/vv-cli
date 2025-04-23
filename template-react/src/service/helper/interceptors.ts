import { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { resolveError } from './helpers'

const SUCCESS_CODES = [0, 200]
export function setupInterceptors(axiosInstance: Axios) {
    axiosInstance.interceptors.request.use(reqResolve, reqReject)
    axiosInstance.interceptors.response.use(resResolve, resReject)
}

function reqResolve(config: InternalAxiosRequestConfig<any>) {
    /**
     * your code here
     */
    return config
}

function resResolve(response: AxiosResponse) {
    const { data, status, statusText, headers } = response
    if (headers['content-type']?.includes('json')) {
        if (SUCCESS_CODES.includes(data?.code)) {
            return Promise.resolve(data)
        }
        const code = data?.code ?? status
        const message = resolveError(code, data?.message ?? statusText)
        return Promise.reject({ code, message, error: data ?? response })
    }
    return Promise.resolve(data ?? response)
}

function reqReject(error: any) {
    return Promise.reject(error)
}

async function resReject(error: any) {
    if (!error || !error.response) {
        const code = error?.code

        const message = resolveError(code, error.message)
        return Promise.reject({ code, message, error })
    }

    const { data, status } = error.response
    const code = data?.code ?? status

    const message = resolveError(code, data?.message ?? error.message)
    return Promise.reject({ code, message, error: error.response?.data || error.response })
}
