# UI Component Library

A modern Vue 3 component library built with Vite 8, TypeScript, and pnpm workspace.

## Features

- 🚀 Built with Vite 8 (with Rolldown beta)
- 📦 pnpm monorepo structure
- 🎨 TypeScript support
- 🔥 Hot Module Replacement (HMR)
- 📚 Component playground for development
- 🎯 Tree-shakable exports
- 📝 Full type definitions

## Project Structure

```
.
├── packages/
│   └── components/          # Main component library
│       ├── src/
│       │   ├── button/      # Button component
│       │   ├── input/       # Input component
│       │   └── index.ts     # Library entry point
│       ├── package.json
│       └── vite.config.ts
├── playground/              # Development playground
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

Start the playground for component development:

```bash
pnpm dev
```

### Build

Build the component library:

```bash
pnpm build
```

Build all packages:

```bash
pnpm build:all
```

### Type Check

```bash
pnpm type-check
```

## Usage

After publishing to npm, you can use the library in your project:

```bash
npm install your-ui-library
# or
pnpm add your-ui-library
```

### Import all components

```ts
import { createApp } from 'vue'
import YourUI from 'your-ui-library'
import 'your-ui-library/style.css'

const app = createApp(App)
app.use(YourUI)
```

### Import on demand

```ts
import { Button, Input } from 'your-ui-library'
import 'your-ui-library/es/button/style.css'
import 'your-ui-library/es/input/style.css'
```

## License

MIT

