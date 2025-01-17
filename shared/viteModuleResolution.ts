import * as fs from "fs";
import * as path from "path";
import type { Alias } from "vite";

/**
 * 生成模块别名配置
 */
export default function moduleResolution(environment: "development" | "production"): Alias[] {
  const packageName = "shared"; // 包名称
  const packagePath = path.resolve(__dirname, "../shared"); // shared 包的路径

  console.log("packagePath", packagePath);

  if (environment === "development") {
    // 开发环境：直接引用源码
    return [
      {
        find: packageName,
        replacement: path.resolve(packagePath, 'src'),
      },
    ];
  } else {
    // 开发或生产环境：引用构建文件
    const distPaths = [
      path.resolve(packagePath, "dist", environment, "index.js"), // 环境特定的构建文件
      path.resolve(packagePath, "dist/index.js") // 默认构建文件
    ];

    const replacement = distPaths.find(fs.existsSync.bind(fs));
    if (!replacement) {
      throw new Error(
        `ERROR: Missing ./${path.relative(
          __dirname,
          distPaths[1]
        )}. Did you run \`npm run build\` in the monorepo first?`
      );
    }

    return [
      {
        find: packageName,
        replacement
      }
    ];
  }
}
