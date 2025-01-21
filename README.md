# @zerocmf/rich-editor

## github: https://github.com/daifuyang/zerocmf-editor

基于 [Lexical](https://lexical.dev/) 开发的富文本编辑器，提供轻量、可扩展的编辑体验。

## 特性

- **轻量高效**：基于 Lexical 框架，性能优异。
- **可扩展**：支持插件和自定义节点。
- **React 集成**：无缝集成到 React 项目中。
- **丰富的功能**：
  - 支持粗体、斜体、下划线、删除线等文本样式。
  - 支持标题、段落、引用、代码块等块级样式。
  - 支持链接、图片嵌入。
  - 支持撤销、重做。
  - 支持 Markdown 快捷键。
- **TypeScript 支持**：完整的类型定义，开发更高效。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install @zerocmf/rich-editor
```

或

```bash
yarn add @zerocmf/rich-editor
```

## 使用

```tsx
import React from 'react';
import RichEditor from '@zerocmf/rich-editor';

const App: React.FC = (props) => {
    const { editable = true, value, onChange } = props;
  return (
    <div>
      <RichEditor editable={editable} value={value} onChange={onChange} />
    </div>
  );
};

export default App;
```
