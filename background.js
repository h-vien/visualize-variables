chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NUXT_DATA') {
    console.log('Received NUXT data:', message.data);

    // ✅ Store data safely in chrome.storage.local
    chrome.storage.local.set({ nuxtData: message.data }, () => {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
      } else {
        console.log('NUXT data saved.');
      }
    });

    // ✅ Send a response to prevent message errors
    sendResponse({ status: 'success' });
  }

  // ✅ Keep message channel open
  return true;
});
  