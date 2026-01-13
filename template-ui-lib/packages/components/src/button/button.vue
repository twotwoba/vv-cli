<template>
    <button
        :class="[
            'ui-button',
            `ui-button--${type}`,
            `ui-button--${size}`,
            {
                'is-disabled': disabled,
                'is-loading': loading,
                'is-round': round,
                'is-circle': circle
            }
        ]"
        :disabled="disabled || loading"
        @click="handleClick"
    >
        <span v-if="loading" class="ui-button__loading">
            <svg class="ui-button__loading-icon" viewBox="0 0 1024 1024">
                <path
                    fill="currentColor"
                    d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                />
            </svg>
        </span>
        <span v-if="$slots.default" class="ui-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
    size?: 'large' | 'default' | 'small'
    disabled?: boolean
    loading?: boolean
    round?: boolean
    circle?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    round: false,
    circle: false
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
    if (props.disabled || props.loading) return
    emit('click', event)
}
</script>

<style scoped>
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    white-space: nowrap;
    user-select: none;
}

.ui-button--default {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
}

.ui-button--default:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.ui-button--primary {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
}

.ui-button--primary:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.ui-button--success {
    background-color: #67c23a;
    border-color: #67c23a;
    color: #fff;
}

.ui-button--success:hover {
    background-color: #85ce61;
    border-color: #85ce61;
}

.ui-button--warning {
    background-color: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
}

.ui-button--warning:hover {
    background-color: #ebb563;
    border-color: #ebb563;
}

.ui-button--danger {
    background-color: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
}

.ui-button--danger:hover {
    background-color: #f78989;
    border-color: #f78989;
}

.ui-button--info {
    background-color: #909399;
    border-color: #909399;
    color: #fff;
}

.ui-button--info:hover {
    background-color: #a6a9ad;
    border-color: #a6a9ad;
}

.ui-button--large {
    padding: 12px 19px;
    font-size: 16px;
}

.ui-button--small {
    padding: 5px 11px;
    font-size: 12px;
}

.ui-button.is-round {
    border-radius: 20px;
}

.ui-button.is-circle {
    border-radius: 50%;
    padding: 8px;
}

.ui-button.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.ui-button.is-loading {
    position: relative;
    pointer-events: none;
}

.ui-button__loading {
    display: inline-flex;
    align-items: center;
}

.ui-button__loading-icon {
    width: 14px;
    height: 14px;
    animation: rotating 2s linear infinite;
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
