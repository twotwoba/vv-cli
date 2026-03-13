<script setup lang="ts">
import type { IGlobalData } from './types/app'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { AUTH_KEY } from './constant/keys'

defineOptions({
    globalData: {
        token: ''
    } as IGlobalData
})

const app = getApp<{ globalData: IGlobalData }>()
onLaunch(() => {
    const token = uni.getStorageSync(AUTH_KEY)
    if (!token) {
        // 登录
        // uni.navigateTo({ url: '/pages/mine/index' })
    } else {
        app.globalData.token = token
    }
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>
<style></style>
