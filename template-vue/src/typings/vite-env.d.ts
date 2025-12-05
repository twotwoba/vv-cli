/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** app title */
    VITE_TITLE: string
    /** router mode */
    VITE_USE_HASH: string
    /** axios baseURL */
    VITE_AXIOS_BASE_URL: string
    /** home path */
    VITE_HOME_PATH: string
    /** public path */
    VITE_PUBLIC_PATH: string
}
