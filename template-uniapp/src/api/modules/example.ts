/**
 * 我的模块（管理中心）
 */

import request from '../helper'

export const demo3 = () => {
    return request.get('/api/mine')
}
