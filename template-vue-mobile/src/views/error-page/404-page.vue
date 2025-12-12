<script setup lang="ts">
const router = useRouter()
const home = import.meta.env.VITE_HOME_PATH
</script>
<template>
    <div class="error-page">
        <var-result type="warning" title="404" description="页面不存在">
            <template #footer>
                <var-button type="primary" round @click="router.push(home)">返回首页</var-button>
            </template>
        </var-result>
        <p class="tip">生活总归带点荒谬，找点乐子吧~</p>
    </div>
</template>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}
.error-code {
    font-size: 80px;
    font-weight: bold;
    color: var(--color-primary);
    line-height: 1;
}
.tip {
    margin-top: 20px;
    font-size: 14px;
    color: #999;
}
</style>
