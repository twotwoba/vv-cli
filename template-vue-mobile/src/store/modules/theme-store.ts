import { useDark, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const isDark = useDark()
        const toggle = useToggle(isDark)

        return { isDark, toggle }
    },
    {
        persist: {
            storage: localStorage,
            key: 'theme',
            pick: ['isDark']
        }
    }
)
