import JSZip from 'jszip';
import secrets from 'secrets';
import GeneralPhotoBtnIcon from '../../../components/GeneralPhotoBtnIcon';
import GeneralVideoBtnIcon from '../../../components/GeneralVideoBtnIcon';
import GeneralLoadingBtnIcon from '../../../components/GeneralLoadingBtnIcon';
import './style.css';

const zip = new JSZip();
const { serverUrl, xApiKey } = secrets;

function isNotInstagramMainPage() {
  const pathname = window.location.pathname;
  return (
    window.location.hostname === 'www.instagram.com' && /\/.+/.test(pathname)
  );
}

function isInstagramReelsPage() {
  const pathname = window.location.pathname;
  return (
    window.location.hostname === 'www.instagram.com' &&
    /\/reels\//.test(pathname)
  );
}

export const handler = async () => {
  document.body.addEventListener('click', async (e) => {
    const target = e.target;

    const btn = target?.closest(`#instagram-btn`);

    if (!btn) return;

    const needToDownloadImg = Boolean(target?.closest('._aagv'));

    const needToDownloadVideo =
      Boolean(target?.closest('div._aatk._aatl')) || isInstagramReelsPage();

    switch (true) {
      case needToDownloadImg:
        console.log(`needToDownloadImg`, needToDownloadImg);

        try {
          const closestAagvElement = target.closest('._aagv');
          const imgElement = closestAagvElement.querySelector('img');
          if (imgElement) {
            const imageUrl = imgElement.getAttribute('src');
            fetch(imageUrl)
              .then((response) => response.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.jpg';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => {
                console.error('Ошибка при загрузке изображения:', error);
              });
          } else {
            console.error(
              'Изображение не найдено внутри элемента с классом ._aagv'
            );
          }
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
        break;

      case needToDownloadVideo:
        console.log(`needToDownloadVideo`, needToDownloadVideo);
        const videoWrapper = btn.querySelector('div');
        try {
          const pageUrl = window.location.href;
          btn.disabled = true;
          videoWrapper.innerHTML = GeneralLoadingBtnIcon(20, '#666666');
          videoWrapper.classList.add('rotate');
          const pageUrlResponse = await fetch(
            `${serverUrl}/instagram/getvideo`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': xApiKey,
              },
              body: JSON.stringify({ url: pageUrl }),
            }
          );
          if (!pageUrlResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const responseData = await pageUrlResponse.json();

          if (responseData.success) {
            const videoResponse = await fetch(responseData.url);
            console.log(`videoResponse`, videoResponse);
            const videoBlob = await videoResponse.blob();
            console.log(`videoBlob`, videoBlob);
            zip.file('video.mp4', videoBlob);
            console.log(
              `!window.location.href.includes('img_index')`,
              !window.location.href.includes('img_index')
            );
            if (!window.location.href.includes('img_index')) {
              const imageResponse = await fetch(responseData.thumbnail);
              console.log(`imageResponse`, imageResponse);
              const imageBlob = await imageResponse.blob();
              console.log(`imageBlob`, imageBlob);
              zip.file('thumbnail.jpg', imageBlob);
            }

            // Archive generation and downloading
            zip.generateAsync({ type: 'blob' }).then(function (content) {
              // Downloading the archive
              const zipUrl = URL.createObjectURL(content);
              const a = document.createElement('a');
              a.href = zipUrl;
              a.download = 'media.zip';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(zipUrl);
            });
          } else {
            console.error('Ошибка при загрузке видео');
          }
        } catch (error) {
          console.error('Произошла ошибка:', error);
        } finally {
          btn.disabled = false;
          videoWrapper.innerHTML = GeneralVideoBtnIcon(20, '#666666');
          videoWrapper.classList.remove('rotate');
        }
        break;

      default:
        break;
    }
  });
};

export const injector = (showImageDownloadBtn, showVideoDownloadBtn) => {
  if (showImageDownloadBtn) {
    // image
    document
      .querySelectorAll('div._aagv img[ crossorigin="anonymous" ]')
      .forEach((el) => {
        const parentLink = el.closest('a[role="link"]');
        if (parentLink) return;

        if (el.getAttribute('hasDownloadBtn') === 'true') return;
        el.setAttribute('hasDownloadBtn', 'true');

        const instaDownloadBtn = document.createElement('button');
        instaDownloadBtn.setAttribute('type', 'button');
        instaDownloadBtn.setAttribute('id', 'instagram-btn');
        instaDownloadBtn.setAttribute(
          'class',
          'artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted'
        );
        instaDownloadBtn.style.position = 'absolute';
        instaDownloadBtn.style.left = '4px';
        instaDownloadBtn.style.top = '4px';
        instaDownloadBtn.style.zIndex = '1';
        instaDownloadBtn.style.cursor = 'pointer';
        instaDownloadBtn.style.background =
          'linear-gradient(45deg, #F4B04B, #A535B1)';
        instaDownloadBtn.style.borderRadius = '30%';
        instaDownloadBtn.style.transition = 'transform 250ms';

        instaDownloadBtn.addEventListener('mouseenter', () => {
          instaDownloadBtn.style.transform = 'scale(1.1)';
        });

        instaDownloadBtn.addEventListener('mouseleave', () => {
          instaDownloadBtn.style.transform = 'scale(1)';
        });
        const instaWrapper = document.createElement('div');
        instaWrapper.innerHTML = GeneralPhotoBtnIcon(20, '#666666');
        instaDownloadBtn.appendChild(instaWrapper);
        // instaDownloadBtn.innerHTML = GeneralPhotoBtnIcon(20, '#666666');

        const parentDiv = el.closest('div._aagv');
        if (parentDiv) {
          parentDiv.style.position = 'relative';
          parentDiv.appendChild(instaDownloadBtn);
        }
      });
  }

  if (showVideoDownloadBtn) {
    // video
    !window.location.href.includes('highlights') &&
      isNotInstagramMainPage() &&
      !window.location.href.includes('instagram.com/?') &&
      !window.location.href.includes('stories') &&
      document.querySelectorAll('video[preload="none"]').forEach((el) => {
        if (el.getAttribute('hasDownloadBtn') === 'true') return;
        el.setAttribute('hasDownloadBtn', 'true');

        const instaDownloadBtn = document.createElement('button');
        instaDownloadBtn.setAttribute('type', 'button');
        instaDownloadBtn.setAttribute('id', 'instagram-btn');
        instaDownloadBtn.setAttribute(
          'class',
          'artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted'
        );
        instaDownloadBtn.style.position = 'absolute';
        instaDownloadBtn.style.left = '4px';
        instaDownloadBtn.style.top = window.location.href.includes('stories')
          ? '90px'
          : '4px';
        instaDownloadBtn.style.zIndex = '1';
        instaDownloadBtn.style.cursor = 'pointer';
        instaDownloadBtn.style.background =
          'linear-gradient(45deg, #F4B04B, #A535B1)';
        instaDownloadBtn.style.borderRadius = '30%';
        instaDownloadBtn.style.transition = 'transform 250ms';

        instaDownloadBtn.addEventListener('mouseenter', () => {
          instaDownloadBtn.style.transform = 'scale(1.1)';
        });

        instaDownloadBtn.addEventListener('mouseleave', () => {
          instaDownloadBtn.style.transform = 'scale(1)';
        });

        const instaWrapper = document.createElement('div');
        instaWrapper.innerHTML = GeneralVideoBtnIcon(20, '#666666');
        instaDownloadBtn.appendChild(instaWrapper);
        // instaDownloadBtn.innerHTML = GeneralLoadingBtnIcon(20, '#666666');

        // const parentDiv = el.closest('div._aatk._aatl') || el.closest('div');
        const parentDiv = el.closest('div');
        if (parentDiv) {
          parentDiv.style.position = 'relative';
          parentDiv.appendChild(instaDownloadBtn);
        }
      });
  }

  // reals

  // window.location.href.includes('stories') &&
  //   document.querySelectorAll('div img[ draggable="false" ]').forEach((el) => {
  //     if (el.getAttribute('hasDownloadBtn') === 'true') return;
  //     el.setAttribute('hasDownloadBtn', 'true');

  //     const instaDownloadBtn = document.createElement('button');
  //     instaDownloadBtn.setAttribute('type', 'button');
  //     instaDownloadBtn.setAttribute('id', 'instagram-btn');
  //     instaDownloadBtn.setAttribute(
  //       'class',
  //       'artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted'
  //     );
  //     instaDownloadBtn.style.position = 'absolute';
  //     instaDownloadBtn.style.left = '15px';
  //     instaDownloadBtn.style.top = '98pxpx';
  //     instaDownloadBtn.style.zIndex = '1';
  //     instaDownloadBtn.style.cursor = 'pointer';
  //     instaDownloadBtn.style.background =
  //       'linear-gradient(45deg, #F4B04B, #A535B1)';
  //     instaDownloadBtn.style.borderRadius = '30%';
  //     instaDownloadBtn.style.transition = 'transform 250ms';

  //     instaDownloadBtn.addEventListener('mouseenter', () => {
  //       instaDownloadBtn.style.transform = 'scale(1.1)';
  //     });

  //     instaDownloadBtn.addEventListener('mouseleave', () => {
  //       instaDownloadBtn.style.transform = 'scale(1)';
  //     });
  //     const instaWrapper = document.createElement('div');
  //     instaWrapper.innerHTML = GeneralPhotoBtnIcon(20, '#666666');
  //     instaDownloadBtn.appendChild(instaWrapper);
  //     // instaDownloadBtn.innerHTML = GeneralPhotoBtnIcon(20, '#666666');

  //     const parentDiv = el.closest('div');
  //     if (parentDiv) {
  //       parentDiv.style.position = 'relative';
  //       parentDiv.appendChild(instaDownloadBtn);
  //     }
  //   });
};

injector();
