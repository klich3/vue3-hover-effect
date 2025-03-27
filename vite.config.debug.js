import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteRequireContext from "@originjs/vite-plugin-require-context";

export default defineConfig({
	//base: "/",
	mode: "development",
	server: {
		open: "/",
	},
	build: {
		brotliSize: false,
		manifest: false,
		sourcemap: false, //'inline'
		minify: "terser",
		publicDir: "public/",
		outDir: "dist/",
		rollupOptions: {
			external: [
				"**/*.mp4",
				"**/*.ogv",
				"**/*.ogg",
				"**/*.webm",
				"**/*.gltf",
				"**/*.glb",
				"**/*.drc",
				"**/*.ktx2",
				"**/*.bin",
			],
			output: {
				assetFileNames: "src/assets/[ext]/[name][extname]",
				chunkFileNames: "src/assets/js/[name].[hash].js",
				entryFileNames: "src/assets/js/[name].js",
			},
		},
	},
	resolve: {
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "/src"),
			},
		],
	},
	plugins: [ViteRequireContext, vue()],
});
