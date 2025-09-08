import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

/**
 * * Popup, which is the main entry point for the extension's popup UI.
 * * emitted by the extension icon on click.
 */
createRoot(document.getElementById("_default_popup_")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
