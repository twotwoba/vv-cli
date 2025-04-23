import UnexpectedError from '@/components/upexpected-error'
import loadPage from '@/components/load-page'
import { Navigate, RouteObject } from 'react-router'

import App from '@/App'

const RouteList: RouteObject[] = [
    {
        path: '/',
        errorElement: <UnexpectedError errorMsg="o(╥﹏╥)o" />,
        element: <App />
    },
    {
        path: '/404',
        element: loadPage(() => import('@/layouts/404'))
    },
    {
        path: '*',
        element: <Navigate to="/404" />
    }
]

export default RouteList
