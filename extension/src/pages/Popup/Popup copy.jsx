import React from 'react';

import './Popup.css';

// const Popup = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!
//         </a>
//       </header>
//     </div>
//   );
// };

const Popup = () => {
  const grabImages = () => {
    chrome.tabs.query({ active: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id, allFrames: true },
          func: grabImagesOnPage,
        },
        (results) => {
          const urls = results.flatMap((result) => result.result);
          // setImageUrls(urls);

          chrome.tabs.create(
            { url: 'dowloadPage.html', active: false },
            (tab) => {
              setTimeout(() => {
                // отправить список URL в новую вкладку (ловим в page.js)
                chrome.tabs.sendMessage(tab.id, urls, (resp) => {
                  // сделать вкладку активной
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

  return (
    <div>
      <div className="container">
        <button onClick={grabImages}>Grab Images</button>
      </div>
    </div>
  );
};

export default Popup;
