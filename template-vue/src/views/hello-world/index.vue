<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme-store'

const { toggle } = useThemeStore()
</script>
<template>
    <div class="flex-cc gap-12 pt-20%" text-12>
        <svg-icon name="vue"></svg-icon>
        <n-button type="info" @click="() => toggle()">CHANGE THEME</n-button>
    </div>
</template>
