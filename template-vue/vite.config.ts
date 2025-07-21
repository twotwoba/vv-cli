import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers' // other UI library resolvers

// use @unocss/preset-icons to replace unplugin-icons (if you need, you can install unplugin-icons)
import unocss from 'unocss/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isPord = process.env.NODE_ENV === 'production'
    const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files
    console.log('🌧 ~ defineConfig ~ env:', env)

    return {
        base: env.VITE_PUBLIC_PATH,
        plugins: [
            tsconfigPaths({ loose: true }),
            vue(),
            unocss(),
            AutoImport({
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ],
                resolvers: [],
                dts: path.join(__dirname, 'src', 'auto-imports.d.ts')
            }),
            Components({
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
                extensions: ['vue'],
                resolvers: [NaiveUiResolver()],
                dts: path.join(__dirname, 'src', 'components.d.ts')
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
                }
            }
        },
        build: {
            sourcemap: !isPord,
            manifest: true,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: isPord,
                    drop_debugger: isPord
                }
            },
            rollupOptions: {
                // outDir: path.join(__dirname, 'dist', env.VITE_OUTPUT_PATH),
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT) || 7788,
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_URL,
                    rewrite: (path:string) => path.replace(/^\/api/, ''),
                    changeOrigin: true,
                    ws: false,
                    secure: false
                }
            }
        }
    }
})

/**
 * solve the problem of multiple proxies
 */
// function handleProxy(list: [string, string][]) {
//     const obj = {} as any
//     list.forEach((v) => {
//         obj[v[0]] = {
//             target: v[1],
//             rewrite: (path: string) => path.replace(new RegExp(`^${v[0]}`), ''),
//             changeOrigin: true,
//             secure: /^https:\/\//.test(v[1])
//         }
//     })
//     return obj
// }
