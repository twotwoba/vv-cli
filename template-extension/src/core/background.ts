/**
 * * background.ts - Service Worker for Chrome Extension
 */
console.log("====== background script start ======")


/**
 * onInstalled hook
 * This is triggered when the extension is installed or updated.
 */
chrome.runtime.onInstalled.addListener(({ reason }) => {
	// This is a new installation, do something like showing a welcome message
	if (reason === "install") {
		chrome.storage.session.setAccessLevel({ accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" })
		chrome.runtime.openOptionsPage()
	}
})

/**
 * onClicked hook
 * This is triggered when the extension icon is clicked
 */
chrome.action.onClicked.addListener(async (tab) => {
	await chrome.tabs.sendMessage(tab.id!, { action: "XXXX_XXXX_XXXX" })
})

/**
 * onCommand hook
 * This is triggered when keyboard shortcuts are used
 */
chrome.commands.onCommand.addListener((command, tab) => {
	console.log("Command received:", command, tab)
})

/**
 * onMessage hook
 * This is triggered when messages are sent from content scripts or popup scripts
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message.action === "XXXX_XXXX_XXXX") {
		return true
	}

	return false
})

/**
 * anything else you want to do on background script
 * ...
 */

console.log("====== background script loaded ======")
