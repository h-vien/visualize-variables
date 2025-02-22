chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NUXT_DATA') {
    console.log('Received NUXT data:', message.data);

    // ✅ Send an empty response to prevent the error
    sendResponse({ status: 'success' });
  }

  // ✅ Return true to keep the message channel open for async operations
  return true;
});
