# Quick Start Guide

Welcome to your new UI Component Library! This guide will help you get started quickly.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for the monorepo, including both the component library and the playground.

### 2. Start Development

```bash
pnpm dev
```

This starts the playground at http://localhost:5173 where you can see and test your components.

## 📦 Project Overview

This is a **pnpm monorepo** with the following structure:

```
your-project/
├── packages/components/    # Your component library (publishable to npm)
├── playground/            # Development environment to test components
├── pnpm-workspace.yaml   # Monorepo configuration
└── package.json          # Root package with scripts
```

## 🎨 Adding Your First Component

Let's add a new `Card` component as an example:

### Step 1: Create Component Files

Create `packages/components/src/card/card.vue`:

```vue
<template>
    <div class="ui-card">
        <div v-if="$slots.header" class="ui-card__header">
            <slot name="header" />
        </div>
        <div class="ui-card__body">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
export interface CardProps {
    shadow?: 'always' | 'hover' | 'never'
}

withDefaults(defineProps<CardProps>(), {
    shadow: 'always'
})
</script>

<style scoped>
.ui-card {
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    overflow: hidden;
}

.ui-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
}

.ui-card__body {
    padding: 20px;
}
</style>
```

### Step 2: Create Export File

Create `packages/components/src/card/index.ts`:

```typescript
import { App } from 'vue'
import Card from './card.vue'

Card.install = (app: App) => {
    app.component('UiCard', Card)
}

export { Card }
export default Card
export type { CardProps } from './card.vue'
```

### Step 3: Export from Main Entry

Edit `packages/components/src/index.ts`:

```typescript
import type { App } from 'vue'
import { Button } from './button'
import { Input } from './input'
import { Card } from './card' // Add this

const components = [Button, Input, Card] // Add Card here

const install = (app: App) => {
    components.forEach((component) => {
        app.component(component.name || '', component)
    })
}

export { Button, Input, Card } // Export Card

export default {
    install
}
```

### Step 4: Test in Playground

Edit `playground/src/App.vue` to test your new component:

```vue
<template>
    <ui-card>
        <template #header>
            <h3>Card Title</h3>
        </template>
        <p>Card content goes here</p>
    </ui-card>
</template>

<script setup lang="ts">
import { Card as UiCard } from 'ui-component-library'
</script>
```

## 🔨 Building for Production

### Build the Library

```bash
pnpm build
```

This creates:

- `packages/components/es/` - ES modules (for modern bundlers)
- `packages/components/lib/` - CommonJS (for older tools)
- Type definitions (.d.ts files)

### Build All Packages

```bash
pnpm build:all
```

## 📤 Publishing to npm

### 1. Update Package Info

Edit `packages/components/package.json`:

```json
{
    "name": "@yourscope/your-ui-lib",
    "version": "1.0.0",
    "description": "Your awesome UI library",
    "author": "Your Name <your.email@example.com>",
    "repository": {
        "type": "git",
        "url": "https://github.com/yourusername/your-ui-lib"
    }
}
```

### 2. Build

```bash
pnpm build
```

### 3. Publish

```bash
cd packages/components
npm publish --access public
```

## 💡 Tips

1. **Hot Reload**: The playground has HMR, so changes to components update instantly
2. **Type Safety**: Use TypeScript interfaces for all props
3. **Naming**: Prefix components with `Ui` to avoid naming conflicts
4. **Styles**: Use scoped styles to prevent CSS conflicts
5. **Documentation**: Update the README when adding new components

## 📚 Next Steps

- Read [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guide
- Check [packages/components/README.md](./packages/components/README.md) for usage examples
- Explore the existing Button and Input components as references

## 🆘 Need Help?

- Check the Vite documentation: https://vite.dev
- Vue 3 documentation: https://vuejs.org
- pnpm workspaces: https://pnpm.io/workspaces

Happy coding! 🎉
