import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from '@rollup/plugin-commonjs';
import dts from "vite-plugin-dts";
import moduleResolution from "./shared/viteModuleResolution";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/App.tsx", // 组件库入口文件
      name: "index", // 库的全局变量名（用于 UMD 格式）
      fileName: (format) => `index.${format}.js`, // 输出文件名
      cssFileName: "index",
      formats: ["es"] // 输出多种模块格式
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
    },
    outDir: "dist" // 输出目录
  },
  define: {
    'process.env.IS_PREACT': process.env.IS_PREACT,
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json"
    }),
    commonjs({
      // This is required for React 19 (at least 19.0.0-beta-26f2496093-20240514)
      // because @rollup/plugin-commonjs does not analyze it correctly
      strictRequires: [/\/node_modules\/(react-dom|react)\/[^/]\.js$/],
    }),
  ],
  // resolve: {
  //   alias: moduleResolution() // 根据环境生成别名
  // },
});
