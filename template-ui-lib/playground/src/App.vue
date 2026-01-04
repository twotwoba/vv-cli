<template>
    <div class="playground">
        <header class="header">
            <h1>UI Component Library Playground</h1>
            <p>Test and develop your components here</p>
        </header>

        <main class="main">
            <section class="section">
                <h2>Button Component</h2>
                <div class="demo-block">
                    <h3>Basic Usage</h3>
                    <div class="demo-row">
                        <ui-button>Default</ui-button>
                        <ui-button type="primary">Primary</ui-button>
                        <ui-button type="success">Success</ui-button>
                        <ui-button type="warning">Warning</ui-button>
                        <ui-button type="danger">Danger</ui-button>
                        <ui-button type="info">Info</ui-button>
                    </div>
                </div>

                <div class="demo-block">
                    <h3>Sizes</h3>
                    <div class="demo-row">
                        <ui-button size="large">Large</ui-button>
                        <ui-button>Default</ui-button>
                        <ui-button size="small">Small</ui-button>
                    </div>
                </div>

                <div class="demo-block">
                    <h3>States</h3>
                    <div class="demo-row">
                        <ui-button disabled>Disabled</ui-button>
                        <ui-button loading>Loading</ui-button>
                        <ui-button round>Round</ui-button>
                        <ui-button circle>C</ui-button>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2>Input Component</h2>
                <div class="demo-block">
                    <h3>Basic Usage</h3>
                    <div class="demo-column">
                        <ui-input
                            v-model="inputValue"
                            placeholder="Please input"
                        />
                        <p>Value: {{ inputValue }}</p>
                    </div>
                </div>

                <div class="demo-block">
                    <h3>Sizes</h3>
                    <div class="demo-column">
                        <ui-input
                            v-model="inputValue"
                            size="large"
                            placeholder="Large"
                        />
                        <ui-input v-model="inputValue" placeholder="Default" />
                        <ui-input
                            v-model="inputValue"
                            size="small"
                            placeholder="Small"
                        />
                    </div>
                </div>

                <div class="demo-block">
                    <h3>States</h3>
                    <div class="demo-column">
                        <ui-input
                            v-model="inputValue"
                            disabled
                            placeholder="Disabled"
                        />
                        <ui-input
                            v-model="inputValue"
                            clearable
                            placeholder="Clearable"
                        />
                        <ui-input
                            v-model="inputValue"
                            maxlength="10"
                            placeholder="Max length 10"
                        />
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button as UiButton, Input as UiInput } from "ui-component-library";

const inputValue = ref("");
</script>

<style scoped>
.playground {
    min-height: 100vh;
    background: #f5f7fa;
}

.header {
    background: #fff;
    padding: 40px 20px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
    margin: 0 0 10px;
    color: #409eff;
    font-size: 32px;
}

.header p {
    margin: 0;
    color: #909399;
    font-size: 16px;
}

.main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.section {
    background: #fff;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section h2 {
    margin: 0 0 20px;
    color: #303133;
    font-size: 24px;
    border-bottom: 2px solid #409eff;
    padding-bottom: 10px;
}

.demo-block {
    margin-bottom: 30px;
}

.demo-block:last-child {
    margin-bottom: 0;
}

.demo-block h3 {
    margin: 0 0 15px;
    color: #606266;
    font-size: 18px;
}

.demo-row {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
}

.demo-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
}

.demo-column p {
    margin: 0;
    color: #909399;
    font-size: 14px;
}
</style>
