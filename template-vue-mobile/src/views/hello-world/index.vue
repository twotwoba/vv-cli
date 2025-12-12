<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme-store'

const { toggle } = useThemeStore()
const { isDark } = storeToRefs(useThemeStore())
</script>
<template>
    <div class="page">
        <div class="flex-col-cc gap-20 pt-50">
            <svg-icon name="vue" class="logo"></svg-icon>
            <h1 class="title">Vue3 Mobile Template</h1>
            <p class="desc">Varlet UI + Unocss + Vite</p>
            <var-space direction="column" :size="16">
                <var-button type="primary" @click="() => toggle()">
                    {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}
                </var-button>
                <var-button type="success">Success Button</var-button>
                <var-button type="warning">Warning Button</var-button>
            </var-space>
        </div>
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    padding: 20px;
}
.logo {
    width: 80px;
    height: 80px;
}
.title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}
.desc {
    font-size: 14px;
    color: #999;
    margin: 0;
}
</style>
