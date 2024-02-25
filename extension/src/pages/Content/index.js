import { injector, handler } from './modules/instagram';
const ALLOWED_DOMAINS = ['instagram.com'];
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

(() => {
  const hostname = window.location.hostname;
  const activeTabDomain =
    hostname?.match(
      /^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/
    )?.[1] || '';

  if (!ALLOWED_DOMAINS.includes(activeTabDomain)) return;

  // const [injector, handler] = service[activeTabDomain];
  // appendStyles();
  handler();
  setInterval(injector, 200);
})();
