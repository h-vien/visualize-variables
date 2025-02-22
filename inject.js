(function () {
  try {
    if (window.__NUXT__) {
      // Convert the object to a JSON-safe format
      const safeData = JSON.parse(JSON.stringify(window.__NUXT__));
      console.log(safeData, 'safeData');
      window.postMessage({ type: 'NUXT_DATA', data: safeData }, '*');
    }
  } catch (error) {
    console.error('Error serializing window.__NUXT__:', error);
  }
})();
