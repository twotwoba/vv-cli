import { useNavigate } from "react-router"
import { SWRConfig } from "swr"
import { clearAuthToken } from "./lib/auth"

function App() {
	const navigate = useNavigate()
	return (
		<>
			<SWRConfig
				value={{
					errorRetryCount: 3,
					errorRetryInterval: 1000,
					revalidateOnFocus: false,
					revalidateOnReconnect: true,
					onError: (error, key) => {
						if (error.status === 401) {
							clearAuthToken()
							navigate("/login")
							console.error("Unauthorized access detected. Redirecting to login page.", error, key)
						}
					}
				}}
			>
				<div className="flex h-full w-full items-center justify-center bg-gray-300">
					<div className="font-mono text-4xl font-bold tracking-tight"></div>
					<div className="flex space-x-1">
						{/* H */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-blue-500"></div>
						</div>
						{/* E */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
							<div className="h-4 w-4 bg-red-500"></div>
						</div>
						{/* L */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4 bg-green-500"></div>
							<div className="h-4 w-4 bg-green-500"></div>
						</div>
						{/* L */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
							<div className="h-4 w-4 bg-yellow-500"></div>
						</div>
						{/* O */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
							<div className="h-4 w-4 bg-purple-500"></div>
						</div>
						<div className="w-4"></div> {/* Space */}
						{/* W */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-cyan-500"></div>
						</div>
						{/* O */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
							<div className="h-4 w-4 bg-orange-500"></div>
						</div>
						{/* R */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-pink-500"></div>
						</div>
						{/* L */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
							<div className="h-4 w-4 bg-indigo-500"></div>
						</div>
						{/* D */}
						<div className="grid grid-cols-3 gap-0.5">
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4 bg-teal-500"></div>
							<div className="h-4 w-4"></div>
						</div>
					</div>
				</div>
			</SWRConfig>
		</>
	)
}

export default App
