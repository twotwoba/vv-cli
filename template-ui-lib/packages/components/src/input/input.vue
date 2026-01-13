<template>
    <div
        :class="[
            'ui-input',
            `ui-input--${size}`,
            {
                'is-disabled': disabled,
                'is-clearable': clearable && modelValue
            }
        ]"
    >
        <input
            ref="inputRef"
            class="ui-input__inner"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <span v-if="clearable && modelValue" class="ui-input__clear" @click="handleClear"> × </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface InputProps {
    modelValue?: string | number
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    maxlength?: number
    size?: 'large' | 'default' | 'small'
}

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    clearable: false,
    size: 'default'
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    input: [value: string]
    change: [value: string]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    clear: []
}>()

const inputRef = ref<HTMLInputElement>()

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    emit('update:modelValue', value)
    emit('input', value)
}

const handleChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
}

const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
    inputRef.value?.focus()
}

defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur()
})
</script>

<style lang="css" scoped>
.ui-input {
    position: relative;
    display: inline-flex;
    width: 100%;
    font-size: 14px;
}

.ui-input__inner {
    width: 100%;
    padding: 8px 15px;
    font-size: inherit;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    color: #606266;
    transition: border-color 0.3s;
    outline: none;
}

.ui-input__inner:hover {
    border-color: #c0c4cc;
}

.ui-input__inner:focus {
    border-color: #409eff;
}

.ui-input__inner::placeholder {
    color: #c0c4cc;
}

.ui-input__inner:disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
}

.ui-input.is-clearable .ui-input__inner {
    padding-right: 35px;
}

.ui-input__clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #c0c4cc;
    cursor: pointer;
    transition: color 0.3s;
}

.ui-input__clear:hover {
    color: #909399;
}

.ui-input--large .ui-input__inner {
    padding: 12px 19px;
    font-size: 16px;
}

.ui-input--small .ui-input__inner {
    padding: 5px 11px;
    font-size: 12px;
}

.ui-input.is-disabled {
    cursor: not-allowed;
}
</style>
