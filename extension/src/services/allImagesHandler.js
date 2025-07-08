export const allImagesHandler = () => {
  let urls;
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
