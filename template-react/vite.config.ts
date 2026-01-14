import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === "prod"
    const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files

    return {
        base: env.VITE_BUILD_BASE_PATH,
        resolve: {
            // vite8新增
            tsconfigPaths: true
        },
        plugins: [react(), tailwindcss()],
        build: {
            // outDir: env.VITE_BUILD_OUT_PATH,
            // vite8 默认配置
            // cssMinify: "lightningcss",
            // minify:"oxc",
            sourcemap: !isProd,
            target: "esnext",
            rolldownOptions: {
                output: {
                    entryFileNames: "assets/js/[name]-[hash].js",
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
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
            host: "0.0.0.0",
            port: parseInt(env.VITE_PORT) || 7788,
            proxy: {
                "/api": {
                    target: env.VITE_PROXY_URL,
                    rewrite: (path: string) => path.replace(/^\/api/, ""),
                    changeOrigin: true,
                    ws: false,
                    secure: false
                }
            }
        }
    }
})
