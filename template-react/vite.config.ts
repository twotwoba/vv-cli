import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isProd = mode === "production"
	const env = loadEnv(mode, process.cwd()) // add the third param '', expected all variables in env files

	return {
		base: env.VITE_BUILD_BASE_PATH,
		plugins: [tsconfigPaths({ loose: true }), react(), tailwindcss()],
		build: {
			sourcemap: !isProd,
			manifest: true,
			minify: "esbuild",
			rollupOptions: {
				// outDir: path.join(__dirname, 'dist', env.VITE_BUILD_OUT_PATH),
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString()
						}
					},
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},
		},
		esbuild: {
			target: "es2020",
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
					secure: false,
				},
			},
		},
	}
})
