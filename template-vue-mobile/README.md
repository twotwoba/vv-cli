# Vue 3 Mobile Template

基于 Vue 3 + TypeScript + Vite + Varlet 的移动端 Web 应用模板。

## ✨ 特性

- 📱 **移动端优先** - 专为移动端 Web 应用设计
- 🎨 **Varlet UI** - 基于 Material Design 的 Vue 3 移动端组件库
- ⚡ **Vite 8** - 极速的开发体验
- 🎯 **TypeScript** - 完整的类型支持
- 🎨 **UnoCSS** - 原子化 CSS 引擎
- 📦 **Pinia** - Vue 3 官方推荐的状态管理
- 🔧 **自动导入** - 组件和 API 自动导入
- 📐 **viewport 适配** - 使用 postcss-px-to-viewport 自动适配

## 🚀 开始使用

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📁 项目结构

```
src/
├── assets/          # 静态资源
│   ├── css/         # 全局样式
│   └── icons/       # SVG 图标
├── components/      # 公共组件
├── router/          # 路由配置
├── service/         # API 服务
├── store/           # Pinia 状态管理
├── typings/         # TypeScript 类型定义
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## 📐 移动端适配

本模板使用 `postcss-px-to-viewport-8-plugin` 进行移动端适配：

- 设计稿宽度：375px
- 自动将 px 转换为 vw 单位
- Varlet 组件样式也会被转换

如需修改设计稿宽度，请编辑 `vite.config.ts` 中的 `viewportWidth` 配置。

## 🎨 主题切换

支持亮色/暗色主题切换，使用 `@vueuse/core` 的 `useDark` 和 Varlet 的 `StyleProvider`。

## 📚 相关文档

- [Vue 3](https://vuejs.org/)
- [Varlet UI](https://varlet.pages.dev/)
- [Vite](https://vite.dev/)
- [UnoCSS](https://unocss.dev/)
- [Pinia](https://pinia.vuejs.org/)