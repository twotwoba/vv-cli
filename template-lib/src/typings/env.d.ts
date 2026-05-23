/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LIB_NAME: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
