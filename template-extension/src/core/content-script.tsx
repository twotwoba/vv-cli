/**
 * * content-script.ts(x) - Content script for Chrome Extension
 */

/**
 * listen for messages from background
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message.action === "XXXX_XXXX_XXXX") {
		// handle the message
		// ...
		sendResponse({ success: true })
	}

	// keep the message channel open
	return true
})

console.log("Content script has loaded in:", window.location.href)
