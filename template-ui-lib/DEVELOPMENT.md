# Development Guide

## Project Structure

This is a pnpm monorepo structure for building a Vue 3 component library, similar to Element Plus or Ant Design Vue.

```
.
├── packages/
│   └── components/              # Main component library package
│       ├── src/
│       │   ├── button/          # Button component
│       │   │   ├── button.vue   # Component implementation
│       │   │   └── index.ts     # Component export
│       │   ├── input/           # Input component
│       │   │   ├── input.vue
│       │   │   └── index.ts
│       │   └── index.ts         # Library entry point
│       ├── package.json         # Component library package config
│       └── vite.config.ts       # Vite library mode config
├── playground/                  # Development playground
│   ├── src/
│   │   ├── App.vue             # Demo application
│   │   └── main.ts
│   └── vite.config.ts
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json                # Root package config
```

## Development Workflow

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development

Start the playground to develop and test components:

```bash
pnpm dev
```

This will start a dev server at http://localhost:5173 where you can see all your components in action.

### 3. Add New Components

To add a new component (e.g., `Card`):

1. Create a new directory: `packages/components/src/card/`
2. Create the component file: `packages/components/src/card/card.vue`
3. Create the export file: `packages/components/src/card/index.ts`
4. Export from main entry: Add to `packages/components/src/index.ts`

Example `card/index.ts`:

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

### 4. Build the Library

Build the component library for production:

```bash
pnpm build
```

This will generate:

- `packages/components/es/` - ES modules
- `packages/components/lib/` - CommonJS modules
- Type definitions (.d.ts files)

### 5. Type Checking

Run TypeScript type checking:

```bash
pnpm type-check
```

## Build Configuration

The library uses Vite 8 with Rolldown (beta) for building. Key features:

- **Multiple Entry Points**: Each component can be imported individually
- **Tree Shaking**: Only import what you use
- **CSS Code Splitting**: Component styles are separated
- **Type Definitions**: Full TypeScript support

### Vite Library Mode

The `vite.config.ts` in the components package is configured for library mode:

```typescript
build: {
  lib: {
    entry: {
      index: './src/index.ts',
      button: './src/button/index.ts',
      input: './src/input/index.ts'
    },
    formats: ['es', 'cjs']
  },
  rolldownOptions: {
    external: ['vue'],
    output: [
      { format: 'es', dir: 'es', preserveModules: true },
      { format: 'cjs', dir: 'lib', preserveModules: true }
    ]
  }
}
```

## Publishing to npm

### 1. Update Package Information

Edit `packages/components/package.json`:

```json
{
    "name": "your-ui-library-name",
    "version": "1.0.0",
    "description": "Your library description",
    "author": "Your Name",
    "repository": {
        "type": "git",
        "url": "https://github.com/yourusername/your-repo"
    }
}
```

### 2. Build the Library

```bash
pnpm build
```

### 3. Publish

```bash
cd packages/components
npm publish
```

Or for scoped packages:

```bash
npm publish --access public
```

## Usage in Other Projects

After publishing, users can install and use your library:

### Installation

```bash
npm install your-ui-library-name
# or
pnpm add your-ui-library-name
```

### Full Import

```typescript
import { createApp } from 'vue'
import YourUI from 'your-ui-library-name'

const app = createApp(App)
app.use(YourUI)
```

### On-Demand Import

```typescript
import { Button, Input } from 'your-ui-library-name'

// In component
export default {
    components: {
        Button,
        Input
    }
}
```

## Best Practices

1. **Component Naming**: Use `Ui` prefix for component names to avoid conflicts
2. **Props**: Always define TypeScript interfaces for props
3. **Events**: Use `defineEmits` with TypeScript types
4. **Styles**: Use scoped styles in components
5. **Documentation**: Add JSDoc comments for better IDE support
6. **Testing**: Test components in the playground before publishing

## Troubleshooting

### Build Issues

If you encounter build issues, try:

```bash
pnpm clean
pnpm install
pnpm build
```

### Type Issues

Make sure all packages have the correct TypeScript configuration and run:

```bash
pnpm type-check
```
