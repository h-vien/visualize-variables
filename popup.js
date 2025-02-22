document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('nuxtData', (result) => {
    if (chrome.runtime.lastError) {
      console.error('Storage retrieval error:', chrome.runtime.lastError);
      return;
    }

    if (result.nuxtData) {
        function createJsonViewer(json, container, parent = null) {
          for (let key in json) {
            let value = json[key];
            let div = document.createElement('div');
            div.classList.add('json-entry');

            if (
              typeof value === 'object' &&
              value !== null &&
              Object.keys(value).length > 0
            ) {
              let toggle = document.createElement('span');
              toggle.textContent = '[+]';
              toggle.classList.add('toggle');

              let keySpan = document.createElement('span');
              keySpan.textContent = key + ': ';
              keySpan.classList.add('key');

              let nestedContainer = document.createElement('div');
              nestedContainer.classList.add('nested');
              nestedContainer.dataset.parent = parent
                ? parent.dataset.key
                : null;

              toggle.addEventListener('click', function () {
                nestedContainer.style.display =
                  nestedContainer.style.display === 'none' ? 'block' : 'none';
                toggle.textContent =
                  nestedContainer.style.display === 'block' ? '[-]' : '[+]';
              });

              div.appendChild(toggle);
              div.appendChild(keySpan);
              div.appendChild(nestedContainer);
              container.appendChild(div);

              div.dataset.key = key;
              createJsonViewer(value, nestedContainer, div);
            } else {
              div.innerHTML = `<span class="key">${key}:</span> <span class="value">${JSON.stringify(
                value
              )}</span>`;
              div.dataset.key = key;
              container.appendChild(div);
            }
          }
        }

        function searchJson() {
          let searchKey = document
            .getElementById('searchBox')
            .value.toLowerCase();
          let allEntries = document.querySelectorAll('.json-entry');
          console.log(searchKey, 'searchKey');
          allEntries.forEach((entry) => {
            let key = entry.dataset.key.toLowerCase();
            let nestedContainer = entry.querySelector('.nested');

            if (key.includes(searchKey) && searchKey !== '') {
              entry.style.display = 'block';
              entry.classList.add('highlight');

              let parent = entry;
              while (parent) {
                parent.style.display = 'block';
                let toggle = parent.querySelector('.toggle');
                if (toggle) toggle.textContent = '[-]';
                let nextParent = parent.closest('.nested');
                if (nextParent) nextParent.style.display = 'block';
                parent = nextParent ? nextParent.closest('.json-entry') : null;
              }
            } else if (searchKey === '') {
              entry.style.display = 'block';
              entry.classList.remove('highlight');
              const toggle = entry.querySelector('.toggle');
              if (toggle) toggle.textContent = '[+]';
              if (nestedContainer) nestedContainer.style.display = 'none';
            } else {
              entry.classList.remove('highlight');
              if (entry.closest('.nested')) {
                entry.style.display = 'none';
              }
            }
          });
        }

        let container = document.getElementById('jsonViewer');
        createJsonViewer(result.nuxtData, container);
        document.getElementById('output').textContent = JSON.stringify(
          result.nuxtData,
          null,
          2
        );
        document
          .getElementById('searchBox')
          .addEventListener('input', searchJson);
    } else {
      document.getElementById('output').textContent = 'No data found.';
    }
  });
});
