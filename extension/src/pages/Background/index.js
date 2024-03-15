import { allImagesHandler } from '../../services';
import { OPTIONS, DEFAULT_OPTIONS } from '../../utils/config';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(() => {
  // Создаем контекстное меню
  chrome.contextMenus.create({
    id: 'massDownloadingMenu', // Идентификатор меню
    title: 'Download Options', // Заголовок меню
    contexts: ['page', 'selection', 'link'], // Контексты, в которых будет отображаться меню
    documentUrlPatterns: ['*://*.instagram.com/*'], // Ограничиваем показ меню только на страницах Instagram
  });

  // Добавляем в меню пункт с выпадающим списком
  chrome.contextMenus.create({
    parentId: 'massDownloadingMenu', // Идентификатор родительского элемента (нашего меню)
    id: 'massDownloadOption', // Идентификатор пункта выпадающего списка
    title: 'Mass Downloading', // Заголовок пункта выпадающего списка
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'massDownloadOption') {
    // Если выбран пункт выпадающего списка
    let urls;
    const grabImages = () => {
      chrome.tabs.query({ active: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id, allFrames: true },
            func: grabImagesOnPage,
          },
          (results) => {
            urls = results.flatMap((result) => result.result);

            chrome.tabs.create(
              { url: 'dowloadPage.html', active: false },
              (tab) => {
                setTimeout(() => {
                  chrome.tabs.sendMessage(tab.id, urls, (resp) => {
                    chrome.tabs.update(tab.id, { active: true });
                  });
                }, 500);
              }
            );
          }
        );
      });
    };

    const grabImagesOnPage = () => {
      const images = document.querySelectorAll('img');
      const urls = Array.from(images).map((image) => image.src);
      console.log(urls);
      return urls;
    };

    allImagesHandler();
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.get(OPTIONS, (result) => {
    OPTIONS.forEach((option) => {
      // If the key is not in the results, set the default value
      if (!(option in result)) {
        chrome.storage.local.set({ [option]: DEFAULT_OPTIONS[option] });
      }
    });
  });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    const url = chrome.runtime.getURL('./about.html');
    chrome.tabs.create({
      url,
    });
  }
});
