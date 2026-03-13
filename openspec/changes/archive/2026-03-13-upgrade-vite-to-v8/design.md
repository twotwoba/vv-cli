# Design: Upgrade Vite to v8

## Overview

本文档描述如何将各个模板的 Vite 依赖升级到 v8 的技术设计。

## Architecture Changes

### Before (Vite 7)

```
┌─────────────────────────────────────────────┐
│                   Vite 7                    │
├─────────────────────────────────────────────┤
│  Dev Server: esbuild (dep pre-bundle)       │
│  Transform:  esbuild (TS/JSX)               │
│  Build:      Rollup (production bundle)     │
│  Minify:     esbuild (JS/CSS)               │
└─────────────────────────────────────────────┘
```

### After (Vite 8)

```
┌─────────────────────────────────────────────┐
│                   Vite 8                    │
├─────────────────────────────────────────────┤
│  Dev Server: Rolldown (dep pre-bundle)      │
│  Transform:  Oxc (TS/JSX)                   │
│  Build:      Rolldown (production bundle)   │
│  Minify:     Oxc (JS) + Lightning CSS (CSS) │
└─────────────────────────────────────────────┘
```

## Implementation Strategy

### Phase 1: Package.json Updates

对于每个模板，需要更新 `package.json`:

1. **更新 vite 版本**: `^8.0.0`（移除 beta override）
2. **移除 pnpm.overrides**: 不再需要 beta 版本覆盖

### Phase 2: Configuration Migration

Vite 8 提供了向后兼容层，大多数配置会自动转换：

| 旧选项 | 新选项 | 状态 |
|--------|--------|------|
| `esbuild` | `oxc` | 自动转换 |
| `optimizeDeps.esbuildOptions` | `optimizeDeps.rolldownOptions` | 自动转换 |
| `build.rollupOptions` | `build.rolldownOptions` | 旧名称弃用但可用 |
| `build.minify: 'esbuild'` | `build.minify` (默认 Oxc) | 需显式设置才能使用 esbuild |

### Phase 3: Plugin Compatibility Check

需要验证以下插件的兼容性：

#### template-vue & template-vue-mobile

- `@vitejs/plugin-vue` - ✅ 兼容
- `@vitejs/plugin-vue-jsx` - ✅ 兼容
- `unplugin-auto-import` - ✅ 兼容
- `unplugin-icons` - ✅ 兼容
- `unplugin-vue-components` - ✅ 兼容
- `vite-plugin-svg-icons` - ⚠️ 需验证

#### template-react

- `@tailwindcss/vite` - ✅ 兼容
- 无其他 Vite 插件

#### template-ui-lib

- 无 Vite 插件
- 需要检查子包配置

#### template-extension

- `@crxjs/vite-plugin` - ⚠️ 需要验证兼容性
- `vite-plugin-zip-pack` - ⚠️ 需要验证兼容性
- `vite-tsconfig-paths` - ✅ Vite 8 内置支持（可移除）

## Template-Specific Changes

### 1. template-vue

```jsonc
// package.json changes
{
  "devDependencies": {
    "vite": "^8.0.0"  // 保持不变，移除 override
  }
  // 移除 pnpm.overrides
}
```

**额外检查**:
- 验证 `vite-plugin-svg-icons` 兼容性

### 2. template-vue-mobile

```jsonc
// package.json changes
{
  "devDependencies": {
    "vite": "^8.0.0"  // 保持不变，移除 override
  }
  // 移除 pnpm.overrides
}
```

**额外检查**:
- 验证 `vite-plugin-svg-icons` 兼容性
- 验证 `postcss-px-to-viewport-8-plugin` 与 Lightning CSS 兼容性

### 3. template-react

```jsonc
// package.json changes
{
  "devDependencies": {
    "vite": "^8.0.0"  // 保持不变，移除 override
  }
  // 移除 pnpm.overrides
}
```

**额外检查**:
- Tailwind CSS v4 + Vite 8 兼容性

### 4. template-ui-lib

```jsonc
// package.json changes (root)
{
  "devDependencies": {
    "vite": "^8.0.0"  // 保持不变，移除 override
  }
  // 移除 pnpm.overrides
}
```

**额外检查**:
- 检查 `packages/` 和 `playground/` 子目录的配置

### 5. template-extension

```jsonc
// package.json changes
{
  "devDependencies": {
    "vite": "^8.0.0"  // 从 ^7.2.6 升级
    // 可选：移除 vite-tsconfig-paths（Vite 8 内置支持）
  }
}
```

**额外检查**:
- `@crxjs/vite-plugin` 与 Rolldown 兼容性
- `vite-plugin-zip-pack` 兼容性
- 考虑使用 `resolve.tsconfigPaths: true` 替代 `vite-tsconfig-paths`

## Configuration Option Updates (Optional)

以下更新是可选的，因为 Vite 8 提供了向后兼容层：

### 使用新的 oxc 选项（替代 esbuild）

```ts
// vite.config.ts
export default defineConfig({
  // 旧方式（已弃用但仍可用）
  esbuild: {
    jsxInject: `import React from 'react'`,
  },

  // 新方式（推荐）
  oxc: {
    jsxInject: `import React from 'react'`,
  },
})
```

### 使用内置 tsconfig paths 支持

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    tsconfigPaths: true,  // 启用内置支持
  },
})
```

## Testing Strategy

### 1. 安装测试

```bash
cd template-xxx
pnpm install
```

### 2. 开发服务器测试

```bash
pnpm dev
# 验证:
# - 服务器启动成功
# - 页面正常加载
# - HMR 正常工作
```

### 3. 构建测试

```bash
pnpm build
# 验证:
# - 构建成功完成
# - 输出文件正常
# - 无运行时错误
```

### 4. 预览测试

```bash
pnpm preview
# 验证生产构建正常工作
```

## Risk Mitigation

### 高风险场景

1. **template-extension 的 @crxjs/vite-plugin**
   - 缓解措施：先测试，如不兼容则保留 Vite 7 或寻找替代方案

2. **自定义 esbuild 配置**
   - 缓解措施：Vite 8 自动转换，但需验证转换结果

3. **CSS 处理差异**
   - Lightning CSS 的语法降级行为与 esbuild 不同
   - 缓解措施：如遇问题，设置 `build.cssMinify: 'esbuild'`

### 回滚路径

```jsonc
// 如果需要回滚到 Vite 7
{
  "devDependencies": {
    "vite": "^7.2.6"
  }
}
```

或者使用渐进式迁移：

```jsonc
// 使用 rolldown-vite 作为中间步骤
{
  "devDependencies": {
    "vite": "npm:rolldown-vite@7.2.2"
  }
}
```

## Dependencies

无外部依赖，所有更改都在模板内部完成。

## Timeline

1. 更新所有模板的 package.json
2. 移除 pnpm.overrides
3. 逐个模板测试验证
4. 修复任何兼容性问题
