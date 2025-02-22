function injectScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

injectScript();

window.addEventListener('message', (event) => {
  if (event.source === window && event.data.type === 'NUXT_DATA') {
    chrome.runtime.sendMessage(
      { type: 'NUXT_DATA', data: event.data.data },
      (response) => {
        if (chrome.runtime.lastError) {
          console.warn('Message send error:', chrome.runtime.lastError);
        } else {
          console.log('Message response:', response);
        }
      }
    );
  }
});
