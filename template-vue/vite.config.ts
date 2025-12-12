import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers' // other UI library resolvers

// use @unocss/preset-icons to replace unplugin-icons (if you need, you can install unplugin-icons)
import unocss from 'unocss/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/** @type {import('vite').UserConfig} */
export default defineConfig(({  mode }) => {
    const isProd = mode === 'prod'
    const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files

    return {
        base: env.VITE_BUILD_BASE_PATH,
        resolve: {
          tsconfigPaths: true
        },
        plugins: [
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
            lightningcss:{
                cssModules: {
                    pattern: "[dir]_[name]--[hash:6]"
                }
            }
        },
        build: {
            // outDir: env.VITE_BUILD_OUT_PATH,
            sourcemap: !isProd,
            cssMinify: "lightningcss",
            minify:"oxc",
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            target: "esnext",
            rolldownOptions: {
                output: {
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                }
            },
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
