# Chrome Extension Template

A modern Chrome Extension template built with React 19, TypeScript, Vite, and TailwindCSS.

## Features

- ⚡️ **React 19** - Latest React with new features
- 🏗️ **TypeScript** - Full type safety
- ⚡️ **Vite** - Fast build tool and development server
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 📦 **CRXJS** - Vite plugin for Chrome extension development
- 🧩 **Manifest V3** - Latest Chrome extension manifest
- 🎯 **Multi-environment** - Popup, Options page, Content script, Background script
- 📱 **Shadow DOM** - Isolated styles for content scripts
- 🔧 **Auto-reload** - Hot reload during development

## Project Structure

```
src/
├── assets/          # Static assets and styles
├── components/      # Reusable components
│   ├── shadow-dom/  # Shadow DOM components
│   └── ui/          # UI components
├── core/            # Core extension scripts
│   ├── background.ts      # Background service worker
│   ├── content-script.tsx # Content script
│   └── insert-page/       # Injected page components
├── lib/             # Utilities and helpers
├── views/           # Extension pages
│   ├── option/      # Options page
│   └── popup/       # Popup page
└── vite-env.d.ts    # Vite type definitions
```

## Getting Started

1. **Install dependencies**

    ```bash
    pnpm install
    ```

2. **Start development**

    ```bash
    pnpm dev
    ```

3. **Load extension in Chrome**
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable "Developer mode" in the top right
    - Click "Load unpacked"
    - Select the `dist` folder from your project

4. **Build for production**
    ```bash
    pnpm build
    ```

## Development

### Scripts

- `pnpm dev` - Start development with file watching
- `pnpm build` - Build for production
- `pnpm css` - Watch and compile TailwindCSS
- `pnpm css:build` - Build TailwindCSS for production

### Configuration

1. **Update Extension Details**
    - Edit `package.json` for basic info (name, description, version)
    - Edit `manifest.config.ts` for Chrome extension specific settings

2. **Permissions**
    - Modify permissions in `manifest.config.ts`
    - See [Chrome Extension Permissions](https://developer.chrome.com/docs/extensions/reference/permissions/)

3. **Icons**
    - Replace icons in `public/` folder
    - Supported sizes: 16x16, 32x32, 64x64 pixels

### Components

- **Popup**: Main extension popup interface
- **Options**: Extension options/settings page
- **Content Script**: Injected into web pages
- **Background**: Service worker for background tasks

## Tech Stack

- [React 19](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [CRXJS](https://crxjs.dev/vite-plugin) - Chrome extension Vite plugin

## Extension Features

- **Popup Interface**: Quick access UI
- **Options Page**: Extension settings and configuration
- **Content Script**: Inject functionality into web pages
- **Background Script**: Handle extension lifecycle and background tasks
- **Keyboard Shortcuts**: Alt+E to open extension (configurable)
- **Storage**: Chrome extension storage API support

## Best Practices

1. **Security**: Follow Chrome extension security guidelines
2. **Performance**: Minimize content script impact on web pages
3. **Permissions**: Request only necessary permissions
4. **User Experience**: Provide clear UI and helpful error messages
5. **Testing**: Test across different websites and scenarios

## Deployment

1. Build the extension: `pnpm build`
2. Zip the `dist` folder or use `vite-plugin-zip-pack`
3. Upload to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/)

## License

MIT
