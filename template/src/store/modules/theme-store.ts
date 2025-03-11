import { darkTheme, lightTheme } from 'naive-ui'
import { useDark, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const isDark = useDark()
        const toggle = useToggle(isDark)
        const theme = computed(() => (isDark.value ? darkTheme : lightTheme))

        return { isDark, theme, toggle }
    },
    {
        persist: {
            storage: localStorage,
            key: 'theme',
            pick: ['isDark']
        }
    }
)
