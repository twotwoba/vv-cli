declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<object, object, any>
    export default component
}

// Varlet 全局工具方法类型声明（可根据需要扩展）
interface Window {
    // 如需挂载 Varlet 的全局方法，可在此声明
}
