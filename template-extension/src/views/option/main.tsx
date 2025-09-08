import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

/**
 * * Option page, which is the main entry point for the extension's options UI.
 * * This page is loaded when the user clicks on the extension's options link.
 * * Also, this page could be loaded when the extension is installed.(chrome.runtime.openOptionsPage)
 */
createRoot(document.getElementById("_option_web_page_")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
