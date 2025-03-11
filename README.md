# Vue 3 + Vite 开发模板

该模板基于官方 [vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) 模板，并添加了以下功能：

1. settings.json，项目维度的 vscode 必要配置，保存自动格式化（结合 eslint,stylelint,prettier 集成），统一代码风格 （如有跨编辑器的情况，请自行安装依赖并配置，本模板只考虑统一使用 vscode 的情况）
2. 指定包管理器 `pnpm`
3. 指定 node 版本 `v18`
4. vue3.5
5. vite5
6. unocss + iconify icon 图标方案
7. 本地 icon 雪碧图组件
8. 使用 motion 开发动画
9. get 请求统一使用 swr

## 使用

```bash
npm i @twotwoba/vv-cli -g

vv [project-name]
```