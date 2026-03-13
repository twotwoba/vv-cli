import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UserConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
    const env = loadEnv(mode, process.cwd())
    console.log('🔥 [INFO] ---> env: ', env)
    const UnoCss = await import('unocss/vite').then((i) => i.default)

    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [uni(), UnoCss()]
    }
})
