# vue or react 模板

简化配置：

1. settings.json，项目维度的 vscode 必要配置，保存自动格式化（结合 eslint,stylelint,prettier 集成），统一代码风格 （如有跨编辑器的情况，请自行安装依赖并配置，本模板只考虑统一使用 vscode 的情况）
2. 指定包管理器 `pnpm`
3. vite@5+

## Vue 3 + Vite 开发模板

该模板基于官方 [vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) 模板，并添加了以下功能：

1. auto plugin 自动引入 api or 组件
2. unocss + iconify icon 图标方案
3. 本地 icon 雪碧图组件
4. 使用 motion 开发动画
5. pinia 数据存储
6. 预置了 axios 的配置

## React 19 + Vite 开发模板

该模板基于官方 [vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) 模板，并添加了以下功能：

1. 使用 shadcn
2. tailwindcss + lucide icon 方案
3. swr 处理 get 请求
4. useHooks 常用 hook
5. zustand 数据存储
6. 预置了 axios 的配置

## 使用

```bash
pnpm i @twotwoba/vv-cli -g

vv [project-name]
```
