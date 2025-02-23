import React, { ReactNode } from "react";
import PlaygroundEditorTheme from "./themes/ZerocmfEditorTheme";
import classNames from "classnames";
import "./App.css";

interface Props {
  value: string; // 输入的 JSON 字符串
}

// 定义文本格式的位标志
const TEXT_FORMAT_FLAGS: Record<string, number> = {
  IS_BOLD: 1,
  IS_ITALIC: 1 << 1,
  IS_STRIKETHROUGH: 1 << 2,
  IS_UNDERLINE: 1 << 3,
  IS_CODE: 1 << 4,
  IS_SUBSCRIPT: 1 << 5,
  IS_SUPERSCRIPT: 1 << 6,
  IS_HIGHLIGHT: 1 << 7,
  IS_LOWERCASE: 1 << 8,
  IS_UPPERCASE: 1 << 9,
  IS_CAPITALIZE: 1 << 10
};

// 节点类型与 HTML 标签的映射
const NODE_TYPE_TO_TAG = new Map<string, keyof JSX.IntrinsicElements>([
  ["root", "div"],
  ["paragraph", "p"],
  ["hashtag", "code"],
  ["quote", "blockquote"],
  ["text", "span"],
  ["list", "ul"],
  ["listitem", "li"],
  ["link", "a"]
]);

// 将主题对象扁平化为 Map，方便快速查找类名
function flattenThemeToMap(
  obj: Record<string, string>,
  map: Map<string, string> = new Map(),
  path: string = ""
): Map<string, string> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentPath = path ? `${path}.${key}` : key; // 构建当前路径
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // 如果是对象，递归遍历
        flattenThemeToMap(obj[key], map, currentPath);
      } else {
        // 如果是叶子节点，存入 Map
        map.set(currentPath, obj[key]);
      }
    }
  }
  return map;
}

// 将主题对象转换为 Map
const themeClassMap = flattenThemeToMap(PlaygroundEditorTheme);

// 解码文本格式，返回激活的样式类名
function decodeTextFormat(format: number): Record<string, string> {
  const activeFormats: Record<string, string> = {};

  for (const [flagName, flagValue] of Object.entries(TEXT_FORMAT_FLAGS)) {
    if (format & flagValue) {
      // 将位标志映射为样式类名
      const formatToClassNameMap: Record<string, string> = {
        IS_BOLD: "bold",
        IS_ITALIC: "italic",
        IS_STRIKETHROUGH: "strikethrough",
        IS_UNDERLINE: "underline",
        IS_CODE: "code",
        IS_SUBSCRIPT: "subscript",
        IS_SUPERSCRIPT: "superscript",
        IS_HIGHLIGHT: "highlight",
        IS_LOWERCASE: "lowercase",
        IS_UPPERCASE: "uppercase",
        IS_CAPITALIZE: "capitalize"
      };

      const classNameKey = formatToClassNameMap[flagName];
      if (classNameKey) {
        // 从主题 Map 中获取对应的类名
        const className = themeClassMap.get(`text.${classNameKey}`);
        if (className) {
          activeFormats[classNameKey] = className;
        }
      }
    }
  }

  return activeFormats;
}

interface DynamicComponentsProps {
  format?: number;
  type?: string;
  tag?: string;
  children?: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function DynamicComponents(props: DynamicComponentsProps) {
  const { node, children, className = '' } = props;
  const { format, type, tag } = node;

  console.log('node', node)
  // 获取节点对应的 HTML 标签

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ComponentProps: any = {};

  let Component: keyof JSX.IntrinsicElements = "span"; // 默认使用 span 标签

  if (type === "root") {
    Component = "div";
    ComponentProps = {
      className: classNames({
        [className]: !!className,
        "editor-shell": true
      })
    };
  } else if (type === "link") {
    Component = "a"; // 如果是文本节点，使用 span 标签
    ComponentProps = {
      href: node.url,
      target: node.target,
      rel: node.rel,
      title: node.title
    };
  } else if (format && decodeTextFormat(format).code) {
    Component = "code"; // 如果格式包含代码样式，使用 code 标签
  } else if (type && NODE_TYPE_TO_TAG.has(type)) {
    Component = NODE_TYPE_TO_TAG.get(type)!; // 根据节点类型获取标签
    ComponentProps = {
      value: node.value
    };
  } else if (type === "heading") {
    Component = tag as keyof JSX.IntrinsicElements; // 如果是标题，使用传入的标签（如 h1, h2 等）
  }
  return (
    <Component data-type={type} className={className} {...ComponentProps}>
      {children}
    </Component>
  );
}

// 递归生成 React 组件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateReactComponents(node: Record<string, any>): ReactNode {
  if (typeof node === "object" && node !== null) {
    const { type, tag, format, text } = node;

    // 解码文本格式，获取激活的样式类名
    const activeFormats = decodeTextFormat(format || 0);
    const formatClassNames: Record<string, boolean> = {};
    Object.keys(activeFormats).forEach((key) => {
      const className = activeFormats[key];
      formatClassNames[className] = true;
    });

    // 获取节点的主题类名
    let classNameKey = `${type}${tag ? "." + tag : ""}`;

    if (type === "listitem") {
      // 如果节点是文本节点，直接返回文本内容
      classNameKey = `list.listitem`;
    }
    const themeClassName = themeClassMap.get(classNameKey) || "";

    return (
      <DynamicComponents
        node={node}
        className={classNames({
          [themeClassName]: !!themeClassName, // 添加主题类名
          ...formatClassNames // 添加文本格式类名
        })}
        // 添加 data-type 属性
      >
        {/* 如果节点有文本内容，渲染文本 */}
        {text && <span>{text}</span>}

        {/* 递归处理子节点 */}
        {Object.keys(node).map((key) => {
          if (Array.isArray(node[key])) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return node[key].map((child: any, index: number) => (
              <React.Fragment key={index}>{generateReactComponents(child)}</React.Fragment>
            ));
          }
          return null;
        })}
      </DynamicComponents>
    );
  }
  return null;
}

// 主组件
export default function Render(props: Props) {
  const { value } = props;

  // 如果输入为空，返回空片段
  if (!value) {
    return <></>;
  }

  // 解析 JSON 字符串
  const json = JSON.parse(value);
  return generateReactComponents(json.root);
}
