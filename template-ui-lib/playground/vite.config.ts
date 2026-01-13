import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        base: env.VITE_BUILD_BASE_PATH || '/',
        resolve: {
            tsconfigPaths: true,
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [vue(), vueJsx()],
        css: {
            transformer: 'lightningcss'
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT) || 5173
        }
    }
})
