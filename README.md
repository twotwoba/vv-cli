[简体中文](README.zh-CN.md) | English

# 🚀 React, Vue & Chrome Extension Development Templates

Streamline your development workflow with these opinionated, feature-rich templates for Vue 3, React 19, and Chrome Extensions, powered by Vite 5+. Each template is meticulously configured to get you up and running with a consistent, modern development experience.

---

## 🛠️ Simplified Configuration

We've taken care of the essential setup so you can focus on building amazing applications:

-   **Unified Code Style**: A project-level `settings.json` for VS Code ensures consistent code formatting (integrated with ESLint, StyleLint, and Prettier). While this template optimizes for VS Code users, developers using other editors will need to install and configure their own dependencies for a similar experience.
-   **Package Manager**: We standardize on **pnpm** for efficient and reliable dependency management.
-   **Blazing Fast Development**: Both templates leverage **Vite 5+** for an incredibly fast development server and build times.

> template-vue and template-vue-mobile now is using Vite8(rolldown beta)

---

## ⚛️ React 19 Development Template

Based on the official [React-TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) starter, supercharging it with:

1.  **Shadcn UI**: Beautifully designed, customizable UI components to accelerate your development.
2.  **Tailwind CSS + Lucide Icons**: A utility-first CSS framework paired with a comprehensive, consistent icon set.
3.  **Tanstack Query**: Powerful asynchronous state management for data fetching, caching, and synchronization.
4.  **useHooks**: A collection of frequently used, battle-tested React Hooks to enhance your component logic.
5.  **Zustand State Management**: A small, fast, and scalable state management solution for React.
6.  **Oxc**：replace eslint&prettier，smoother development experience。

---

## ✨ Vue 3 Development Template

Based on the official [Vue-TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) starter, supercharging it with:

1.  **Auto Imports**: Say goodbye to manual imports! Automatically import APIs and components for a smoother coding experience.
2.  **Unocss + Iconify**: A powerful combination for styling and flexible icon management.
3.  **Tanstack Query**: Powerful asynchronous state management for data fetching, caching, and synchronization.
4.  **vueuse**: A collection of frequently used, battle-tested Vue Hooks to enhance your component logic.
5.  **Pinia State Management**: A simple, intuitive, and type-safe state management solution for Vue.

---

## 📱 Vue 3 Mobile Development Template

Based on the official [Vue-TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts) starter, tailored for mobile development:

1.  **Auto Imports**: Say goodbye to manual imports! Automatically import APIs and components for a smoother coding experience.
2.  **Unocss + Iconify**: A powerful combination for styling and flexible icon management.
3.  **Tanstack Query**: Powerful asynchronous state management for data fetching, caching, and synchronization.
4.  **vueuse**: A collection of frequently used, battle-tested Vue Hooks to enhance your component logic.
5.  **Pinia State Management**: A simple, intuitive, and type-safe state management solution for Vue.

---

## 🧩 Chrome Extension Development Template

A modern Chrome Extension template built with React 19, TypeScript, and Manifest V3:

1. **React 19 + TypeScript**: Latest React with full type safety for extension development.
2. **Manifest V3**: Built for the latest Chrome extension standards with service workers.
3. **CRXJS + Vite**: Seamless development experience with hot reload for extensions.
4. **TailwindCSS + Radix UI**: Beautiful, accessible UI components for popup and options pages.
5. **Multi-environment Support**: Popup, options page content scripts, and background scripts.
6. **Shadow DOM Integration**: Isolated styling for content script components.

---

## 🚀 Get Started

It's incredibly easy to spin up a new project with these templates:

```bash
# Install the CLI globally
npm i @twotwoba/vv-cli -g

# Create a new project
vv <your-project-name>
```

Choose your preferred template and start building your next great application today!
