# ZeroCMF Editor - 基于Lexical的富文本编辑器

[![npm version](https://img.shields.io/npm/v/@zerocmf/rich-editor)](https://www.npmjs.com/package/@zerocmf/rich-editor)
[![GitHub stars](https://img.shields.io/github/stars/daifuyang/zerocmf-editor?style=social)](https://github.com/daifuyang/zerocmf-editor)

基于 [Lexical](https://lexical.dev/) 框架构建的React富文本编辑器组件，专为ZeroCMF技术栈优化。

## 🌟 特性

- 100% 兼容Lexical API
- 轻量高效，性能优化
- 完整的TypeScript支持
- Ready-to-use React组件

## 💻 在线演示
[ZeroCMF Editor Demo](https://demo.zerocmf.com/)

## 🛠️ 安装

```bash
npm install @zerocmf/rich-editor
# 或
yarn add @zerocmf/rich-editor
# 或
pnpm add @zerocmf/rich-editor
```

## 🚀 快速使用

```tsx
import { ZeroCMFEditor } from '@zerocmf/rich-editor';

function App() {
  const [editorState, setEditorState] = useState('');

  return (
    <ZeroCMFEditor 
      value={editorState}
      onChange={setEditorState}
    />
  );
}
```

## 🔗 ZeroCMF 技术栈

### 1. [zerocmf-koa](https://github.com/daifuyang/zerocmf-koa) 🚀
基于Koa2的全栈开发框架，提供：
- RESTful API支持
- GraphQL支持
- 数据库ORM集成
- 完善的权限系统

### 2. zerocmf-antd-admin 💼
企业级管理后台解决方案，包含：
- 基于Ant Design Pro
- 可视化表单生成器
- 动态路由配置
- 完善的权限管理系统

## 📚 Lexical文档参考
- [官方文档](https://lexical.dev/docs)
- [插件开发指南](https://lexical.dev/docs/concepts/plugins)
- [节点系统](https://lexical.dev/docs/concepts/nodes)

## ⭐️ 支持我们
如果喜欢我们的项目，欢迎给个Star支持：
- [ZeroCMF Editor](https://github.com/daifuyang/zerocmf-editor)
- [ZeroCMF Koa](https://github.com/daifuyang/zerocmf-koa)

## 📄 License
MIT © [ZeroCMF Team](https://github.com/daifuyang)
