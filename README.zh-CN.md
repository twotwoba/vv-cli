简体中文 | [English](README.md)

# 🚀 React、Vue 与 Chrome 扩展开发模板

通过这些精心打造、功能丰富的 Vue 3、React 19 和 Chrome 扩展模板来简化您的开发工作流程，它们都由 Vite 5+ 提供支持。每个模板都经过精心配置，旨在为您提供一致且现代的开发体验。

---

## 🛠️ 简化配置

我们已经处理了必要的设置，因此您可以专注于构建出色的应用程序：

-   **统一代码风格**：一个项目级别的 `settings.json` 文件用于 VS Code，确保代码格式化的一致性（集成了 ESLint、StyleLint 和 Prettier）。虽然此模板为 VS Code 用户进行了优化，但使用其他编辑器的开发者需要自行安装和配置相关依赖以获得类似体验。
-   **包管理器**：我们统一使用 **pnpm**，以实现高效可靠的依赖管理。
-   **极速开发体验**：两个模板都利用 **Vite 5+**，为您提供令人难以置信的快速开发服务器和构建时间。

> [TODO] Rolldown 马上就要来啦～!

---

## ⚛️ React 19 开发模板

此模板基于官方 [React-TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) 启动器，并内置了：

1.  **Shadcn UI**: 精心设计、可定制的 UI 组件，加速您的开发。
2.  **Tailwind CSS + Lucide Icons**: 一个实用至上的 CSS 框架，搭配一套全面且风格一致的图标集。
3.  **SWR + fetcher**: 一个轻量级的数据获取、缓存和重新验证库，配和原生 fetch，开发体验拉满。
4.  **useHooks**: 一系列常用且经过实践检验的 React Hooks，增强您的组件逻辑。
5.  **Zustand 状态管理**: 一个小巧、快速且可扩展的 React 状态管理方案。
6.  **Biome**：替代eslint&prettier，更流畅的开发体验。

---

## ✨ Vue 3 开发模板

此模板基于官方 [Vue-TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) 启动器，并在此基础上进行了功能增强：

1.  **自动导入**: 告别手动导入！自动导入 API 和组件，带来更流畅的编码体验。
2.  **Unocss + Iconify**: 强大的组合，用于样式设计和灵活的图标管理方案。
3.  **预配置 Axios**: 开箱即用，轻松发起健壮的 HTTP 请求。
4.  **vueuse**: 一系列常用的 vue hooks，增强您的组件逻辑。
5.  **Pinia 状态管理**: 适用于 Vue 的简单、直观且类型安全的状态管理方案。

---

## 🧩 Chrome 扩展开发模板

一个使用 React 19、TypeScript 和 Manifest V3 构建的现代 Chrome 扩展模板：

1. **React 19 + TypeScript**: 最新的 React 版本，为扩展开发提供完整的类型安全。
2. **Manifest V3**: 基于最新的 Chrome 扩展标准，使用 Service Worker 构建。
3. **CRXJS + Vite**: 为扩展提供无缝的开发体验和热重载功能。
4. **TailwindCSS + Radix UI**: 为弹窗和选项页面提供美观、易用的 UI 组件。
5. **多环境支持**: 弹窗、选项页、内容脚本和后台脚本。
6. **Shadow DOM 集成**: 为内容脚本组件提供隔离的样式。

---

## 🚀 如何使用

使用这些模板启动新项目非常简单：

```bash
# 全局安装 CLI
pnpm i @twotwoba/vv-cli -g

# 创建新项目
vv <youer-project-name>
```

选择您偏爱的模板，立即开始构建您的下一个出色应用程序吧！
