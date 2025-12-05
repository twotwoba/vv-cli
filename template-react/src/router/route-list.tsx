import { Navigate, type RouteObject } from "react-router"
import App from "@/App"
import loadPage from "@/components/load-page"
import UnexpectedError from "@/components/unexpected-error"

const RouteList: RouteObject[] = [
	{
		path: "/",
		errorElement: <UnexpectedError errorMsg="o(╥﹏╥)o" />,
		element: <App />
	},
	{
		path: "/404",
		element: loadPage(() => import("@/layouts/404"))
	},
	{
		path: "*",
		element: <Navigate to="/404" />
	}
]

export default RouteList
