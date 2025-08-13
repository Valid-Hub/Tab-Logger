import { API_BASE_URL, getBrowserName } from './config.js';

const browserName = getBrowserName();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.title) {
        console.log(`Tab updated: ${tab.title} - ${tab.url}`);
        console.log('visit fetch started');
        fetch(`${API_BASE_URL}?action=addVisited`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                browser_name: browserName,
                page_title: tab.title,
                page_url: tab.url,
            }),
        }).catch((err) => console.error('Error sending visited page:', err));
    }
});

chrome.history.onVisitRemoved.addListener((removed) => {
    if (removed.urls) {
        console.log('delete fetch started');
        removed.urls.forEach((url) => {
            fetch(`${API_BASE_URL}?action=addDeleted`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    browser_name: browserName,
                    page_title: '',
                    page_url: url,
                }),
            }).catch((err) => console.error('Error sending deleted page:', err));
        });
    }
});
