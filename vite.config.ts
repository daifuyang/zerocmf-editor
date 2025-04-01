import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import alias from "@rollup/plugin-alias";

const currentDir = process.cwd();
const replacement = path.resolve(currentDir, "src/shared");

export default defineConfig({
  build: {
    lib: {
      entry: "./src/App.tsx", // 组件库入口文件
      cssFileName: "index",
      formats: ["es"] // 输出多种模块格式
    },
    copyPublicDir: false,
  },
  define: { "process.env.IS_PREACT": process.env.IS_PREACT },
  plugins: [
    react(),
    alias({
      entries: [
        {
          find: "shared", // 别名名称
          replacement // 实际路径
        }
      ]
    }),
    commonjs({
      // This is required for React 19 (at least 19.0.0-beta-26f2496093-20240514)
      // because @rollup/plugin-commonjs does not analyze it correctly
      strictRequires: [/\/node_modules\/(react-dom|react)\/[^/]\.js$/]
    }),
  ]
});
