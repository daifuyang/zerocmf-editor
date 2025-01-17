import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import moduleResolution from "./shared/viteModuleResolution";

export default defineConfig({
  resolve: {
    alias: moduleResolution("development") // 根据环境生成别名
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json"
    })
  ],
  build: {
    lib: {
      entry: "./src/index.tsx", // 组件库入口文件
      name: "index", // 库的全局变量名（用于 UMD 格式）
      fileName: (format) => `index.${format}.js`, // 输出文件名
      cssFileName: "index",
      formats: ["es"] // 输出多种模块格式
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
    outDir: "dist" // 输出目录
  },
  define: {
    "process.env": {}
  }
});
