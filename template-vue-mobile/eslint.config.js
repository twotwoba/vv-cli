import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    /* prettier-ignore */
    { files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },
    {
        rules: {
            'no-undef': 'off', // 由于使用了自动导入 api 的功能，所关闭此校验规则
            '@typescript-eslint/no-explicit-any': 'off', // 禁用 any 类型检查
            'vue/multi-word-component-names': [
                'error',
                {
                    ignores: ['index']
                }
            ]
        }
    }
]
