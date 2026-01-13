import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VarletImportResolver } from '@varlet/import-resolver'

// use @unocss/preset-icons to replace unplugin-icons (if you need, you can install unplugin-icons)
import unocss from 'unocss/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
    const isProd = mode === 'prod'
    const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files

    return {
        base: env.VITE_BUILD_BASE_PATH,
        resolve: {
            // vite8新增
            tsconfigPaths: true,
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            vue(),
            unocss(),
            AutoImport({
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
                imports: ['vue', 'vue-router', 'pinia'],
                resolvers: [VarletImportResolver({ autoImport: true })],
                dts: path.join(__dirname, 'src', 'auto-imports.d.ts')
            }),
            Components({
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
                extensions: ['vue'],
                resolvers: [VarletImportResolver()],
                dts: path.join(__dirname, 'src', 'components.d.ts')
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                cssModules: {
                    pattern: '[dir]_[name]--[hash:6]'
                }
            },
            postcss: {
                plugins: [
                    pxToViewport({
                        viewportWidth: 375, // 设计稿宽度
                        unitPrecision: 5,
                        viewportUnit: 'vw',
                        selectorBlackList: ['.ignore', '.hairlines'], // 忽略的选择器
                        minPixelValue: 1,
                        mediaQuery: false,
                        exclude: [/node_modules\/(?!@varlet)/] // 排除 node_modules，但包含 varlet
                    })
                ]
            }
        },
        build: {
            // outDir: env.VITE_BUILD_OUT_PATH,
            // vite8 默认配置
            // cssMinify: "lightningcss",
            // minify:"oxc",
            sourcemap: !isProd,
            target: 'esnext',
            rolldownOptions: {
                output: {
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                },
                minify: isProd
                    ? {
                          terserOptions: {
                              compress: {
                                  drop_console: true,
                                  drop_debugger: true
                              }
                          }
                      }
                    : false
            }
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT) || 7788,
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_URL,
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                    changeOrigin: true,
                    ws: false,
                    secure: false
                }
            }
        }
    }
})
