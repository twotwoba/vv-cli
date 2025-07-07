/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** 请求相关环境变量 */
    VITE_API_URL: string
    VITE_PROXY_URL: string

    /** 路由相关环境变量 */
    VITE_ROUTE_MODE: string
    VITE_ROUTE_BASENAME: string

    /** 打包相关环境变量 */
    VITE_OUTPUT_PATH: string
}
