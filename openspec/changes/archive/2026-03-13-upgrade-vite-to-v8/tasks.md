# Tasks: Upgrade Vite to v8

## Task List

### Task 1: 更新 template-vue

- [x] 1.1 移除 `pnpm.overrides.vite` 配置
- [x] 1.2 运行 `pnpm install` 更新依赖
- [x] 1.3 验证 `pnpm dev` 正常启动
- [x] 1.4 验证 `pnpm build` 正常完成
- [x] 1.5 验证 `pnpm preview` 正常工作

### Task 2: 更新 template-vue-mobile

- [x] 2.1 移除 `pnpm.overrides.vite` 配置
- [x] 2.2 运行 `pnpm install` 更新依赖
- [x] 2.3 验证 `pnpm dev` 正常启动
- [x] 2.4 验证 `pnpm build` 正常完成
- [x] 2.5 验证 `pnpm preview` 正常工作

### Task 3: 更新 template-react

- [x] 3.1 移除 `pnpm.overrides.vite` 配置
- [x] 3.2 运行 `pnpm install` 更新依赖
- [x] 3.3 验证 `pnpm dev` 正常启动
- [x] 3.4 验证 `pnpm build` 正常完成
- [x] 3.5 验证 `pnpm preview` 正常工作

### Task 4: 更新 template-ui-lib

- [x] 4.1 移除 `pnpm.overrides.vite` 配置（包括子包）
- [x] 4.2 运行 `pnpm install` 更新依赖
- [x] 4.3 验证 `pnpm build` 正常完成
- [x] 4.4 验证 `pnpm dev`（playground）正常启动

### Task 5: 更新 template-extension

- [x] 5.1 保持 `vite: ^7.2.6`（@crxjs/vite-plugin 不兼容 Vite 8）
- [x] 5.2 运行 `pnpm install` 更新依赖
- [x] 5.3 验证 `pnpm dev` 正常启动
- [x] 5.4 验证 `pnpm build` 正常完成
- [x] 5.5 验证 Chrome 扩展正常加载

## Execution Order

```
Task 1 ─────┐
Task 2 ─────┼──► Final Verification
Task 3 ─────┤
Task 4 ─────┤
Task 5 ─────┘
```

所有模板的更新可以并行执行，但建议按顺序逐个验证以快速定位问题。

## Notes

### 关于 template-extension

此模板使用 `@crxjs/vite-plugin`，该插件目前不支持 Vite 8：
- 保持使用 Vite 7 (`^7.2.6`)
- 緻加了说明：此模板暂时不升级到 Vite 8，因为 @crxjs/vite-plugin 与 Vite 8 不兼容

### 关于 vite-tsconfig-paths

Vite 8 内置了 tsconfig paths 支持：
```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
})
```
可以考虑移除 `vite-tsconfig-paths` 依赖，但需要先验证内置功能是否完全满足需求。
