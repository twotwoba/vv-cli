/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_TITLE: string
    VITE_ROUTE_MODE: string
    VITE_ROUTE_BASENAME: string
    VITE_HOME_PATH: string

    VITE_FETCH_BASE_URL: string
    VITE_PROXY_URL: string

    VITE_BUILD_BASE_PATH: string
    VITE_BUILD_OUT_PATH: string
}
