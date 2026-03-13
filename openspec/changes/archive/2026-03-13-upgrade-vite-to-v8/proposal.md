# Proposal: Upgrade Vite to v8

## Summary

将各个模板中的 Vite 依赖从当前版本升级到 Vite 8（2026年3月12日发布），以获得 Rolldown 带来的 10-30x 构建性能提升。

## Background

Vite 8 是 Vite 历史上最重要的架构升级，它将底层的 esbuild + Rollup 双打包器架构统一为单一的 Rolldown（基于 Rust 的打包器）。

### 当前状态

| 模板 | 当前 Vite 版本 | 状态 |
|------|---------------|------|
| template-vue | `^8.0.0` (使用 beta override) | 需要移除 beta override |
| template-vue-mobile | `^8.0.0` (使用 beta override) | 需要移除 beta override |
| template-react | `^8.0.0` (使用 beta override) | 需要移除 beta override |
| template-ui-lib | `^8.0.0` (使用 beta override) | 需要移除 beta override |
| template-extension | `^7.2.6` | 需要升级到 ^8.0.0 |

**注意**: 前四个模板已经在 devDependencies 中声明了 `^8.0.0`，但通过 pnpm overrides 强制使用 `8.0.0-beta.0`。现在 Vite 8 正式版已发布，需要移除这个 override。

## Motivation

### Vite 8 的主要优势

1. **性能提升**: 构建速度提升 10-30 倍
   - Linear: 46s → 6s
   - Ramp: 57% 减少
   - Mercedes-Benz.io: 最高 38% 减少
   - Beehiiv: 64% 减少

2. **统一工具链**: Vite + Rolldown + Oxc 紧密协作
3. **插件兼容**: 大多数现有 Vite 插件开箱即用
4. **新功能**:
   - 内置 Vite Devtools
   - 内置 tsconfig paths 支持
   - `emitDecoratorMetadata` 支持
   - WASM SSR 支持
   - 浏览器控制台转发

## Breaking Changes Analysis

### 关键破坏性更新

1. **Node.js 要求**: 需要 Node.js 20.19+ 或 22.12+（与 Vite 7 相同）

2. **打包器变更**: esbuild + Rollup → Rolldown + Oxc
   - 依赖优化使用 Rolldown（替代 esbuild）
   - JS 转换使用 Oxc（替代 esbuild）
   - JS 压缩使用 Oxc Minifier（替代 esbuild）
   - CSS 压缩使用 Lightning CSS（替代 esbuild）

3. **配置选项变更**:
   - `build.rollupOptions` → `build.rolldownOptions`（旧名称已弃用但仍可用）
   - `esbuild` 选项 → `oxc` 选项（自动转换）
   - `optimizeDeps.esbuildOptions` → `optimizeDeps.rolldownOptions`

4. **CommonJS 互操作性**: `default` 导入行为更一致，可能影响某些 CJS 模块导入

5. **已弃用功能移除**:
   - `import.meta.hot.accept` 不再支持 URL 参数

6. **装饰器降级**: Oxc 暂不支持原生装饰器降级（需要 Babel 或 SWC）

### 影响评估

| 模板 | 风险等级 | 说明 |
|------|---------|------|
| template-vue | 低 | 使用标准 Vue 生态插件，兼容性好 |
| template-vue-mobile | 低 | 同上 |
| template-react | 低 | 使用 Tailwind CSS v4 + @tailwindcss/vite，兼容 |
| template-ui-lib | 低 | 简单配置，影响最小 |
| template-extension | 中 | 使用 @crxjs/vite-plugin，需要验证兼容性 |

## Rollback Plan

如果升级后出现问题，可以通过以下步骤回滚：

1. 将 `vite` 版本改回 `^7.2.6`
2. 恢复 `pnpm.overrides` 使用 `rolldown-vite` 作为中间步骤
3. 或者安装 `esbuild` 作为 devDependency 以支持旧的 esbuild 功能

## Success Criteria

- [ ] 所有模板的 Vite 版本升级到 `^8.0.0`
- [ ] 移除所有 `pnpm.overrides.vite` 配置
- [ ] 所有模板的 `pnpm install` 成功
- [ ] 所有模板的 `pnpm dev` 正常启动
- [ ] 所有模板的 `pnpm build` 成功完成

## References

- [Vite 8 发布公告](https://vite.dev/blog/announcing-vite8)
- [Vite 8 迁移指南](https://vite.dev/guide/migration)
- [Rolldown 官网](https://rolldown.rs/)
- [Oxc 官网](https://oxc.rs/)
