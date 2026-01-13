import { createBrowserRouter, createHashRouter } from "react-router"
import RouteList from "./route-list"

const createRouter =
    import.meta.env.VITE_ROUTE_MODE === "hash" ? createHashRouter : createBrowserRouter

const router = createRouter(RouteList, { basename: import.meta.env.VITE_ROUTE_BASENAME })

export default router
