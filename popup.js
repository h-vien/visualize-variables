document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message, 'message');
    if (message.type === 'NUXT_DATA') {
      console.log('go here', message);
      document.getElementById('output').textContent = JSON.stringify(
        message.data,
        null,
        2
      );
    }
  });

  // Request the latest NUXT data when popup is opened
  chrome.runtime.sendMessage({ type: 'REQUEST_NUXT_DATA' }, (response) => {
    if (response && response.data) {
      document.getElementById('output').textContent = JSON.stringify(
        response.data,
        null,
        2
      );
    }
  });
});
