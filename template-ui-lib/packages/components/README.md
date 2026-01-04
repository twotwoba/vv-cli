# UI Component Library

A modern, lightweight Vue 3 component library built with Vite 8 and TypeScript.

## Features

- 🚀 Built with Vite 8 (Rolldown beta)
- 📦 Tree-shakable ES modules
- 🎨 TypeScript support
- 💪 Composition API
- 🎯 On-demand import
- 📝 Full type definitions

## Installation

```bash
npm install ui-component-library
# or
pnpm add ui-component-library
# or
yarn add ui-component-library
```

## Quick Start

### Full Import

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import UiLibrary from 'ui-component-library'

const app = createApp(App)
app.use(UiLibrary)
app.mount('#app')
```

### On-Demand Import

```vue
<template>
  <ui-button type="primary" @click="handleClick">
    Click Me
  </ui-button>
  <ui-input v-model="value" placeholder="Enter text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button as UiButton, Input as UiInput } from 'ui-component-library'

const value = ref('')

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## Components

### Button

A versatile button component with multiple types and sizes.

**Props:**

- `type`: `'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'` - Button type
- `size`: `'large' | 'default' | 'small'` - Button size
- `disabled`: `boolean` - Disable the button
- `loading`: `boolean` - Show loading state
- `round`: `boolean` - Round button
- `circle`: `boolean` - Circle button

**Events:**

- `click`: Emitted when button is clicked

**Example:**

```vue
<ui-button type="primary" size="large" @click="handleClick">
  Primary Button
</ui-button>
<ui-button type="success" loading>
  Loading...
</ui-button>
```

### Input

A flexible input component with various features.

**Props:**

- `modelValue`: `string | number` - Input value (v-model)
- `type`: `string` - Input type (default: 'text')
- `placeholder`: `string` - Placeholder text
- `disabled`: `boolean` - Disable the input
- `readonly`: `boolean` - Make input readonly
- `clearable`: `boolean` - Show clear button
- `maxlength`: `number` - Maximum length
- `size`: `'large' | 'default' | 'small'` - Input size

**Events:**

- `update:modelValue`: Emitted when value changes
- `input`: Emitted on input
- `change`: Emitted on change
- `focus`: Emitted on focus
- `blur`: Emitted on blur
- `clear`: Emitted when clear button is clicked

**Example:**

```vue
<ui-input
  v-model="username"
  placeholder="Enter username"
  clearable
  maxlength="20"
/>
```

## TypeScript Support

This library is written in TypeScript and provides full type definitions.

```typescript
import type { ButtonProps, InputProps } from 'ui-component-library'

const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large'
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Vue 3.5+

## License

MIT

