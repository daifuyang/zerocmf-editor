import * as path from "path";
import type { Alias } from "vite";

/**
 * 生成模块别名配置
 */
export default function moduleResolution(): Alias[] {
  const packageName = "shared"; // 包名称
  const packagePath = path.resolve(__dirname, "../shared"); // shared 包的路径
  return [
    {
      find: packageName,
      replacement: path.resolve(packagePath, 'src'),
    },
  ];
}
