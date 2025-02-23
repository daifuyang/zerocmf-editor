import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import dts from "vite-plugin-dts";
import path from "path";
import fs from "fs-extra";
import alias from "@rollup/plugin-alias";

function cleanDirs(dirs: string[]) {
  return {
    name: "clean-dirs",
    async buildStart() {
      for (const dir of dirs) {
        const fullPath = path.resolve(__dirname, dir);
        if (await fs.pathExists(fullPath)) {
          await fs.remove(fullPath);
          console.log(`已清空文件夹: ${fullPath}`);
        } else {
          console.log(`文件夹不存在，无需清空: ${fullPath}`);
        }
      }
    }
  };
}

const currentDir = process.cwd();
const replacement = path.resolve(currentDir, "shared/src");

export default defineConfig({
  build: {
    lib: {
      entry: "./src/App.tsx", // 组件库入口文件
      cssFileName: "index",
      formats: ["es"] // 输出多种模块格式
    },
    copyPublicDir: false,
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   output: [
    //     /*  {
    //        file: "dist/index.min.js",
    //        format: "iife",
    //        name: "zerocmfEditor" // 全局变量名（UMD 格式需要）
    //      }, */
    //     { dir: "es", format: "es" },
    //     { dir: "lib", format: "cjs" }
    //   ]
    // },
    outDir: "es" // 输出目录
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
    dts({ tsconfigPath: "./tsconfig.build.json" }),
    commonjs({
      // This is required for React 19 (at least 19.0.0-beta-26f2496093-20240514)
      // because @rollup/plugin-commonjs does not analyze it correctly
      strictRequires: [/\/node_modules\/(react-dom|react)\/[^/]\.js$/]
    }),
    cleanDirs(["es", "lib"])
  ]
});
