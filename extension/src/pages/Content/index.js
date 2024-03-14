import { injector, handler } from './modules/instagram';
const ALLOWED_DOMAINS = ['instagram.com'];
// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');

function getOptionValue(value) {
  // instagraber-show-videoBtn
  // 'instagraber-show-photoBtn'
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(value, (result) => {
      const status = result;

      if (status) {
        resolve(status);
      } else {
        reject(new Error('Comments use options found in storage'));
      }
    });
  });
}

(async () => {
  try {
    const imageOptionValue = await getOptionValue('instagraber-show-photoBtn');
    const videoOptionValue = await getOptionValue('instagraber-show-videoBtn');

    const hostname = window.location.hostname;
    const activeTabDomain =
      hostname?.match(
        /^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/
      )?.[1] || '';

    if (!ALLOWED_DOMAINS.includes(activeTabDomain)) return;

    handler();
    setInterval(() => {
      injector(
        imageOptionValue['instagraber-show-photoBtn'],
        videoOptionValue['instagraber-show-videoBtn']
      );
    }, 200);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
