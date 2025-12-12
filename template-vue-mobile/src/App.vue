<script setup lang="ts">
/**
 * 主题配置 - 使用 Varlet 组件库
 */
import { useThemeStore } from '@/store/modules/theme-store'
import { StyleProvider, Themes } from '@varlet/ui'

const { isDark } = storeToRefs(useThemeStore())

// 监听主题变化，切换 Varlet 主题
watchEffect(() => {
    StyleProvider(isDark.value ? Themes.dark : null)
})
</script>
<template>
    <router-view />
</template>
