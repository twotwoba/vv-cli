import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isPord = process.env.NODE_ENV === 'production'
    const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files
    console.log('🌧 ~ defineConfig ~ env:', env)

    return {
        base: env.VITE_OUTPUT_PATH,
        plugins: [tsconfigPaths({ loose: true }), react(), tailwindcss()],
        build: {
            sourcemap: !isPord,
            manifest: true,
            minify: 'esbuild',
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
        esbuild: {
            target: 'es2020'
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT) || 7788,
            proxy: {
                '/api': {
                    target: env.VITE_PROXY_URL,
                    changeOrigin: true,
                    ws: false,
                    secure: false
                }
            }
        }
    }
})
