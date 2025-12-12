<script setup lang="ts">
/**
 * 主题、国际化等配置
 */
import { useThemeStore } from '@/store/modules/theme-store'

const { theme } = storeToRefs(useThemeStore())
</script>
<template>
    <n-config-provider wh-full :theme="theme">
        <NaiveToolProvider>
            <router-view />
        </NaiveToolProvider>
    </n-config-provider>
</template>
