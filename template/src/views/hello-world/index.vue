<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme-store'

const { toggle } = useThemeStore()
</script>
<template>
    <div class="flex-cc gap-12 pt-20%" text-12>
        <span>Hello World</span>
        <svg-icon name="vue"></svg-icon>
        <div class="i-logos:vitejs"></div>
        <div
            class="dark:i-line-md:sunny-filled-loop-to-moon-filled-loop-transition i-line-md:moon-filled-to-sunny-filled-loop-transition cursor-pointer text-#fcc21b dark:text-#ffe200"
            @click="toggle()"
        ></div>
        <n-button type="info">Info</n-button>
    </div>
</template>
