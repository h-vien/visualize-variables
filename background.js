chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NUXT_DATA') {
    console.log('Received NUXT data:', message.data);

    chrome.storage.local.set({ nuxtData: message.data }, () => {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
      } else {
        console.log('NUXT data saved.');
      }
    });

    sendResponse({ status: 'success' });
  }

  return true;
});
  