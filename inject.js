function cleanupSensitiveFields(obj, fieldsToDelete) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cleanupSensitiveFields(item, fieldsToDelete));
  }

  const cleanedObj = { ...obj };

  Object.keys(cleanedObj).forEach((key) => {
    if (fieldsToDelete.includes(key)) {
      delete cleanedObj[key];
    } else if (
      typeof cleanedObj[key] === 'object' &&
      cleanedObj[key] !== null
    ) {
      cleanedObj[key] = cleanupSensitiveFields(cleanedObj[key], fieldsToDelete);
    }
  });

  return cleanedObj;
}

const sensitiveFieldsToRemove = [
  'GOOGLE_MAP_API_KEY',
  'PT_LICENSE_KEY',
  'siteBuilderCipherSecretKey',
];

(function () {
  try {
    if (window.__NUXT__) {
      const safeData = JSON.parse(JSON.stringify(window.__NUXT__));
      const cleanData = cleanupSensitiveFields(
        safeData,
        sensitiveFieldsToRemove
      );

      window.postMessage({ type: 'NUXT_DATA', data: cleanData }, '*');
    }
  } catch (error) {
    console.error('Error serializing window.__NUXT__:', error);
  }
})();
