 const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

const alias = require("@rollup/plugin-alias");
const image = require("@rollup/plugin-image");
const url = require("postcss-url");
const clear = require("rollup-plugin-clear");
const path = require("path");

const currentDir = process.cwd();
const replacement = path.resolve(currentDir, "src/shared");

export default {
  input: "src/index.ts",
  output: [
    /*  {
      file: "dist/index.min.js",
      format: "iife",
      name: "zerocmfEditor" // 全局变量名（UMD 格式需要）
    }, */
    { dir: "es", format: "es", sourcemap: true },
    { dir: "lib", format: "cjs", sourcemap: true }
  ],
  defiend: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development")
  },
  plugins: [
    image(),
    alias({
      entries: [
        {
          find: "shared", // 别名名称
          replacement // 实际路径
        }
      ]
    }),
    typescript({
      tsconfig: "./tsconfig.app.json",
      include: ["src/**/*.ts", "src/**/*.tsx"], // Include TypeScript files
      exclude: ["node_modules/**"], // Exclude node_modules
    }),
    postcss({
      extract: true, // Extract CSS to a separate file
      modules: false, // Enable CSS modules if needed
      minimize: false, // Minify the CSS
      sourceMap: true, // Optional: Generate source maps for CSS
      plugins: [
        url({
          url: "inline" // 将图片转换为 Base64
        })
      ]
    }),
    commonjs({
      // This is required for React 19 (at least 19.0.0-beta-26f2496093-20240514)
      // because @rollup/plugin-commonjs does not analyze it correctly
      strictRequires: [/\/node_modules\/(react-dom|react)\/[^/]\.js$/]
    }),
    terser(), // 压缩代码
    clear({ targets: ["dist", "es", "lib"] }) // 清理 dist 目录
  ]
};
