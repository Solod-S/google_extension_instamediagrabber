import ChatGPTIcon from '../../../components/ChatGPTIcon';

// export const handler = async () => {
//   document.body.addEventListener('click', async (e) => {
//     const target = e.target;

//     const btn = target?.closest(`#instagram-btn`);
//     console.log(`btn`, btn);
//     if (!btn) return;

//     const needToDownloadImg = Boolean(target?.closest('._aagv'));

//     switch (true) {
//       case needToDownloadImg:
//         console.log(`Img`);
//         try {
//           const closestAagvElement = target.closest('._aagv');
//           const imgElement = closestAagvElement.querySelector('img');
//           if (imgElement) {
//             const imageUrl = imgElement.getAttribute('src');
//             fetch(imageUrl)
//               .then((response) => response.blob())
//               .then((blob) => {
//                 const url = URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'image.jpg';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//               })
//               .catch((error) => {
//                 console.error('Ошибка при загрузке изображения:', error);
//               });
//           } else {
//             console.error(
//               'Изображение не найдено внутри элемента с классом ._aagv'
//             );
//           }
//         } catch (error) {
//           console.error('Произошла ошибка:', error);
//         }
//         break;

//       default:
//         break;
//     }
//   });
// };

export const handler = async () => {
  document.body.addEventListener('click', async (e) => {
    const target = e.target;

    const btn = target?.closest(`#instagram-btn`);

    if (!btn) return;

    const needToDownloadImg = Boolean(target?.closest('._aagv'));

    const needToDownloadVideo = Boolean(target?.closest('div._aatk._aatl'));
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
        try {
          const Wrapper = target.closest('div._aatk._aatl');
          const video = Wrapper.querySelector('video');
          if (video) {
            const videoUrl = video.src; // Получаем URL видео
            const cleanUrl = videoUrl.replace('blob:', ''); // Удаляем "blob:" из URL
            const proxyUrl = 'http://localhost:1234/instagram/getvideo';

            // Отправляем POST-запрос на прокси-сервер
            fetch(proxyUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: cleanUrl }),
            })
              .then((response) => response.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'video.mp4';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => {
                console.error('Ошибка при загрузке видео:', error);
              });
          } else {
            console.error(
              'Видео не найдено внутри элемента с классом ._aatk._aatl'
            );
          }
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
        break;

      // case needToDownloadVideo:
      //   console.log(`needToDownloadVideo`, needToDownloadVideo);
      //   try {
      //     const Wrapper = target.closest('div._aatk._aatl');
      //     const video = Wrapper.querySelector('video');
      //     if (video) {
      //       const imageUrl = video.getAttribute('src');
      //       const cleanUrl = imageUrl.replace('blob:', ''); // Удаляем "blob:" из URL
      //       fetch(cleanUrl)
      //         .then((response) => response.blob())
      //         .then((blob) => {
      //           const url = URL.createObjectURL(blob);
      //           const a = document.createElement('a');
      //           a.href = url;
      //           a.download = 'video.mp4';
      //           document.body.appendChild(a);
      //           a.click();
      //           window.URL.revokeObjectURL(url);
      //         })
      //         .catch((error) => {
      //           console.error('Ошибка при загрузке видео:', error);
      //         });
      //     } else {
      //       console.error(
      //         'Изображение не найдено внутри элемента с классом ._aagv'
      //       );
      //     }
      //   } catch (error) {
      //     console.error('Произошла ошибка:', error);
      //   }
      //   break;

      // case needToDownloadVideo:
      //   console.log(`needToDownloadVideo`, needToDownloadVideo);
      //   try {
      //     const Wrapper = target.closest('div._aatk._aatl');
      //     const video = Wrapper.querySelector('video');
      //     if (video) {
      //       const videoUrl = video.getAttribute('src');
      //       const cleanUrl = videoUrl.replace('blob:', ''); // Удаляем "blob:" из URL

      //       // Используем ffmpeg для загрузки и конвертации файла .m3u8 в MP4
      //       const downloadCommand = `ffmpeg -i "${cleanUrl}" -c copy video.mp4`;

      //       // Выполняем команду с помощью shelljs или другой подходящей библиотеки

      //       shell.exec(downloadCommand, function (code, stdout, stderr) {
      //         if (code === 0) {
      //           console.log('Видео успешно загружено и сконвертировано в MP4');
      //         } else {
      //           console.error(
      //             'Произошла ошибка при загрузке и конвертации видео:',
      //             stderr
      //           );
      //         }
      //       });
      //     } else {
      //       console.error(
      //         'Видео не найдено внутри элемента с классом ._aatk._aatl'
      //       );
      //     }
      //   } catch (error) {
      //     console.error('Произошла ошибка:', error);
      //   }
      //   break;

      default:
        break;
    }
  });
};

export const injector = () => {
  document
    .querySelectorAll('div._aagv img[ crossorigin="anonymous" ]')
    .forEach((el) => {
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

      instaDownloadBtn.innerHTML = ChatGPTIcon(20, '#666666');

      const parentDiv = el.closest('div._aagv');
      if (parentDiv) {
        parentDiv.style.position = 'relative'; // делаем родительский элемент позиционированным
        parentDiv.appendChild(instaDownloadBtn); // вставляем кнопку внутрь родительского элемента
      }
    });

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

    instaDownloadBtn.innerHTML = ChatGPTIcon(20, '#666666');

    const parentDiv = el.closest('div._aatk._aatl');

    if (parentDiv) {
      parentDiv.style.position = 'relative'; // делаем родительский элемент позиционированным
      parentDiv.appendChild(instaDownloadBtn); // вставляем кнопку внутрь родительского элемента
    }
  });
};

injector();
