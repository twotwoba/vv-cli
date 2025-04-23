<script setup>
const router = useRouter()
const home = import.meta.env.VITE_HOME_PATH
</script>
<template>
    <div flex-cc min-h-screen>
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬" dark:color-emerald color-amber>
            <template #footer>
                <n-button round type="primary" @click="router.push(home)">找点乐子吧~</n-button>
            </template>
        </n-result>
    </div>
</template>
