import { ref, onUnmounted, watch } from 'vue'

// TODO 定义消息类型, 待定和后端联调时确定
export interface WsMessage {
    type: string
    [key: string]: any
}

export interface UseWebSocketOptions {
    url: string
    interval: number
    onMessage?: (msg: WsMessage) => void
}

export function useWebSocket(options: UseWebSocketOptions) {
    const websocketStatus = ref(false)
    const isClosed = ref(false)
    const socketTask = ref<any>(null)

    let heartbeatInterval: number | null = null
    const { url, interval, onMessage } = options

    const initWebsocket = () => {
        socketTask.value = uni.connectSocket({
            url,
            success: () => {} // 必要，否则会返回Promise
        })

        socketTask.value.onOpen(() => {
            clearTimeout(heartbeatInterval!)
            isClosed.value = false
            websocketStatus.value = false
            startHeartbeat()

            socketTask.value.onMessage((msg: { data: string }) => {
                let msgObj: WsMessage = {} as WsMessage
                try {
                    msgObj = JSON.parse(msg.data) || {}
                } catch (e) {
                    console.error('WebSocket消息解析失败:', e)
                    return
                }

                if (msgObj.type === 'pong') {
                    if (!websocketStatus.value) {
                        console.log('%c [Websocket] ', 'background: #2888D9;', '初始化成功')
                    }
                    websocketStatus.value = true
                } else {
                    console.log('%c [Websocket] ', 'background: #2888D9;', '接收消息:', msgObj)
                    if (typeof onMessage === 'function') {
                        onMessage(msgObj)
                    }
                }
            })
        })

        // 连接关闭处理
        socketTask.value.onClose(() => {
            websocketStatus.value = false
            console.log('%c [Websocket] ', 'background: #2888D9;', '断开连接!')
            // 非主动断开时自动重连
            if (!isClosed.value) {
                reconnect()
            }
        })

        // 错误处理
        socketTask.value.onError((err: any) => {
            console.error('%c [Websocket] ', 'background: #ff4444;', '连接错误:', err)
            websocketStatus.value = false
            if (!isClosed.value) {
                reconnect()
            }
        })
    }

    // 开始心跳检测
    const startHeartbeat = () => {
        heartbeatInterval = setInterval(() => {
            sendMessage({ type: 'ping' })
        }, interval)
    }

    const sendMessage = (data: WsMessage) => {
        if (!socketTask.value) return

        if (data.type !== 'ping') {
            // 未就绪时稍后重试
            if (!websocketStatus.value) {
                console.warn(' [Websocket] 未就绪', JSON.stringify(data))
                setTimeout(() => {
                    sendMessage(data)
                }, interval)
                return
            }
            console.log(
                '%c [Websocket] ',
                'background: #2888D9;',
                '发送消息:',
                JSON.stringify(data)
            )
        }

        try {
            socketTask.value.send({
                data: JSON.stringify(data)
            })
        } catch (e) {
            console.error('WebSocket发送消息失败:', e)
        }
    }

    const reconnect = () => {
        clearInterval(heartbeatInterval!)
        if (!websocketStatus.value) {
            setTimeout(() => {
                initWebsocket()
            }, 3000)
        }
    }

    const disconnect = () => {
        if (socketTask.value) {
            uni.closeSocket()
        }
        websocketStatus.value = false
        isClosed.value = true
        clearInterval(heartbeatInterval!)
    }

    const connect = () => {
        try {
            initWebsocket()
        } catch (e) {
            console.log('websocket 连接失败: ', e)
            websocketStatus.value = false
            reconnect()
        }
    }

    onUnmounted(() => {
        disconnect()
    })

    // 监听url变化，自动重连
    watch(
        () => options.url,
        () => {
            if (websocketStatus.value) {
                disconnect()
                connect()
            }
        }
    )

    return {
        websocketStatus,
        connect,
        disconnect,
        sendMessage,
        reconnect
    }
}

export default useWebSocket
