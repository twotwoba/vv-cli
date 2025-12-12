import { defineConfig, presetAttributify, presetWind4, presetIcons } from 'unocss'

export default defineConfig({
    presets: [presetWind4(), presetAttributify(), presetIcons({ scale: 1.2, warn: true })],
    shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-cc': 'flex justify-center items-center',
        'flex-col-cc': 'flex-cc flex-col',
        'flex-xc': 'flex justify-center',
        'flex-yc': 'flex items-center'
    },
    rules: [
        [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
        ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }]
    ],
    theme: {
        colors: {
            primary: 'var(--primary-light)',
            dark: 'var(--primary-dark)'
        }
    }
})
