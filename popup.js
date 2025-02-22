document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('nuxtData', (result) => {
    if (chrome.runtime.lastError) {
      console.error('Storage retrieval error:', chrome.runtime.lastError);
      return;
    }

    if (result.nuxtData) {
      document.getElementById('output').textContent = JSON.stringify(
        result.nuxtData,
        null,
        2
      );
    } else {
      document.getElementById('output').textContent = 'No data found.';
    }
  });
});
