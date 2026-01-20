console.log('Ultimate Scraper Background Service Worker Loaded');

// Listen for side panel opening if needed (Chrome 116+ allows direct sidePanel.open)
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
        .catch((error) => console.error(error));
});
