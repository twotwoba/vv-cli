import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// Get all component directories
const componentsDir = resolve(__dirname, 'src')
const componentDirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => name !== 'index.ts')

// Create entry points for each component
const entry: Record<string, string> = {
  index: resolve(__dirname, 'src/index.ts')
}

componentDirs.forEach(dir => {
  entry[dir] = resolve(__dirname, `src/${dir}/index.ts`)
})

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  build: {
    target: 'esnext',
    lib: {
      entry,
      formats: ['es', 'cjs']
    },
    rolldownOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          assetFileNames: 'style.css'
        },
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          assetFileNames: 'style.css'
        }
      ]
    },
    cssCodeSplit: false,
    emptyOutDir: true
  }
})

