<script setup lang="ts">
/**
 * 使用本地(src/assets/icons)的 svg 图标
 * eg. <svg-icon name="filename" />
 *
 * github: https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.md
 */
const { prefix = 'icon', name, color } = defineProps<{ prefix?: string; name: string; color?: string }>()
const symbolId = computed(() => `#${prefix}-${name}`)
</script>
<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
}
</style>
