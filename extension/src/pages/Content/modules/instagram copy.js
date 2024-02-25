import ChatGPTIcon from '../../../components/ChatGPTIcon';
// import { getConfig } from '../../../../utils/config';
// import {
//   getComment,
//   getAllTextContent,
//   getFirstTextContent,
//   getEmptyContentNotification,
// } from '../../../../utils/shared';
// import {
//   CHATGPT_BTN_ID,
//   Domains,
//   ERROR_MESSAGE,
// } from '../../../../utils/constants';

// const post_action = async (target, btn) => {
//   let commentInputEl;
//   try {
//     const wrapper =
//       target.closest('.feed-shared-update-v2') ||
//       target.closest('.reusable-search__result-container');
//     if (!wrapper) return;

//     const actorNameElement =
//       wrapper.querySelector(
//         '.update-components-actor__name > img[dir="ltr"]'
//       ) ||
//       wrapper.querySelector(
//         '.update-components-actor__name.hoverable-link-text'
//       ) ||
//       wrapper.querySelector('.entity-result__title-text');

//     let name = '';
//     if (actorNameElement) {
//       name = getFirstTextContent(actorNameElement);
//     } else {
//       console.log('Name not found');
//     }
//     commentInputEl = wrapper.querySelector('.ql-editor');
//     commentInputEl.innerHTML = '';
//     commentInputEl.setAttribute('data-placeholder', 'ChatGPT is thinking...');
//     btn.setAttribute('disabled', 'true');
//     btn.setAttribute('loading', 'true');

//     const isSearchPage =
//       window.location.href.includes(Domains.LinkedIn) &&
//       window.location.href.includes('/search');

//     const contentInProfile = wrapper.querySelector(
//       '.feed-shared-inline-show-more-text img[dir="ltr"]'
//     );

//     const contentInSearch =
//       wrapper.querySelector(
//         '.linked-area.flex-1.cursor-pointer > p.relative'
//       ) ||
//       wrapper.querySelector(
//         '.update-components-text.relative.update-components-update-v2__commentary'
//       );

//     const replyContent = isSearchPage
//       ? contentInSearch
//         ? getAllTextContent(contentInSearch)
//         : contentInSearch
//       : // if contentInSearch activated
//       contentInProfile
//       ? getAllTextContent(contentInProfile)
//       : contentInProfile;
//     // if contentInProfile activated

//     const config = await getConfig();

//     if (!replyContent) {
//       getEmptyContentNotification(Domains.LinkedIn);
//       return;
//     }

//     const commentResponse = await getComment(
//       config,
//       Domains.LinkedIn,
//       replyContent,
//       name
//     );

//     if (commentResponse.length) {
//       commentInputEl.innerHTML = commentResponse;
//     } else {
//       commentInputEl.setAttribute('data-placeholder', ERROR_MESSAGE);
//     }

//     commentInputEl.setAttribute('data-placeholder', 'Add a comment..');
//     btn.removeAttribute('disabled');
//     btn.removeAttribute('loading');
//   } catch (error) {
//     commentInputEl.setAttribute('data-placeholder', 'Add a comment..');
//     btn.removeAttribute('disabled');
//     btn.removeAttribute('loading');
//   }
// };

// const comment_action = async (target, btn) => {
//   let replyInputEl;

//   try {
//     const wrapper = target.closest(
//       '.comments-comment-item.comments-comments-list__comment-item'
//     );
//     const replyBtnActive = wrapper.querySelector(
//       'img[hasDownloadBtn="true"]'
//     );

//     if (!wrapper) return;

//     let name = '';
//     let replyContent = '';

//     switch (true) {
//       case !replyBtnActive:
//         const actorNameEl = wrapper.querySelector('.comments-post-meta__name');
//         if (actorNameEl) {
//           name = getFirstTextContent(actorNameEl);
//           const replyTextElement = wrapper.querySelector(
//             '.feed-shared-inline-show-more-text.comments-comment-item__inline-show-more-text img[dir="ltr"]'
//           );
//           replyContent = replyTextElement?.innerText || '';
//         } else {
//           console.log('Name not found');
//         }
//         break;

//       default:
//         const actorNameElnt = replyBtnActive.closest('.comments-comment-item');
//         if (actorNameElnt) {
//           name = actorNameElnt
//             .querySelector('.comments-post-meta__name-text')
//             .textContent.trim();
//           const replyTextElement = replyBtnActive
//             .closest('.comments-comment-item')
//             .querySelector('.feed-shared-inline-show-more-text');
//           replyContent = getAllTextContent(replyTextElement);
//         } else {
//           console.log('Name not found');
//         }
//     }
//     replyInputEl = wrapper.querySelector('.ql-editor');
//     replyInputEl.innerHTML = '';
//     replyInputEl.setAttribute('data-placeholder', 'ChatGPT is thinking...');
//     btn.setAttribute('disabled', 'true');
//     btn.setAttribute('loading', 'true');

//     if (!replyContent) {
//       getEmptyContentNotification(Domains.LinkedIn);
//       return;
//     }
//     const config = await getConfig();
//     const commentResponse = await getComment(
//       config,
//       Domains.LinkedIn,
//       replyContent,
//       name
//     );

//     if (commentResponse.length) {
//       replyInputEl.innerHTML = commentResponse;
//     } else {
//       replyInputEl.setAttribute('data-placeholder', ERROR_MESSAGE);
//     }

//     replyInputEl.setAttribute('data-placeholder', 'Add a comment..');
//     btn.removeAttribute('disabled');
//     btn.removeAttribute('loading');
//   } catch (error) {
//     replyInputEl.setAttribute('data-placeholder', 'Add a comment..');
//     btn.removeAttribute('disabled');
//     btn.removeAttribute('loading');
//   }
// };

export const handler = async () => {
  document.body.addEventListener('click', async (e) => {
    const target = e.target;
    // console.log(`target`, target);
    // // reply logic
    // const targetTagName = target.tagName;
    // console.log(`targetTagName`, targetTagName);
    // const hasDownloadBtn = target.hasAttribute('hasDownloadBtn');
    // console.log(`hasDownloadBtn`, hasDownloadBtn);
    // // const targetTextContent = target.textContent;
    // console.log(`START`);
    // switch (true) {
    //   case targetTagName === 'IMG' && hasDownloadBtn:
    //     const targetElement = document.querySelectorAll(
    //       'img[hasDownloadBtn="true"]'
    //     );
    //     targetElement &&
    //       targetElement.forEach(function (spanElement) {
    //         spanElement.setAttribute('hasDownloadBtn', 'false');
    //       });
    //     console.log(`!!!!!!!!!!!`);

    //     target.setAttribute('hasDownloadBtn', 'true');
    //     break;

    //   // case targetTagName === 'SPAN' &&
    //   //   !hasDownloadBtn &&
    //   //   targetTextContent === 'Reply':
    //   //   const currentWrapper = target?.closest(
    //   //     '.comments-comment-item.comments-comments-list__comment-item'
    //   //   );
    //   //   //  reset all inner replies
    //   //   const needToResetAttribute = currentWrapper?.querySelector(
    //   //     'img[hasDownloadBtn="true"]'
    //   //   );

    //   //   needToResetAttribute &&
    //   //     needToResetAttribute.setAttribute('hasDownloadBtn', 'false');
    //   //   break;

    //   default:
    //     break;
    // }

    const btn = target?.closest(`#instagram-btn`);
    console.log(`btn`, btn);
    if (!btn) return;

    const needToDownloadImg = Boolean(target?.closest('._aagv'));

    switch (true) {
      case needToDownloadImg:
        console.log(`Img`);
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

      default:
        break;
    }
  });
};

export const injector = () => {
  // add GPTBtn

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

  //add reply data atribute for future use

  // document
  //   .querySelectorAll('.comments-comment-item.comments-reply-item.reply-item')
  //   .forEach((el) => {
  //     const spanElements = el.querySelectorAll('span');
  //     spanElements.forEach((spanElement) => {
  //       if (
  //         spanElement.textContent.includes('Reply') &&
  //         !spanElement.hasAttribute('hasDownloadBtn')
  //       ) {
  //         spanElement.setAttribute('hasDownloadBtn', 'false');
  //       }
  //     });
  //   });
};

// export const handler = async () => {
//   document.body.addEventListener('click', async (e) => {
//     const target = e.target;

//     // reply logic
//     const targetTagName = target.tagName;
//     const hasDownloadBtn = target.hasAttribute('hasDownloadBtn');
//     const targetTextContent = target.textContent;

//     switch (true) {
//       case targetTagName === 'SPAN' && hasDownloadBtn:
//         const targetElement = document.querySelectorAll(
//           'img[hasDownloadBtn="true"]'
//         );
//         targetElement &&
//           targetElement.forEach(function (spanElement) {
//             spanElement.setAttribute('hasDownloadBtn', 'false');
//           });

//         target.setAttribute('hasDownloadBtn', 'true');
//         break;

//       case targetTagName === 'SPAN' &&
//         !hasDownloadBtn &&
//         targetTextContent === 'Reply':
//         const currentWrapper = target?.closest(
//           '.comments-comment-item.comments-comments-list__comment-item'
//         );
//         //  reset all inner replies
//         const needToResetAttribute = currentWrapper?.querySelector(
//           'img[hasDownloadBtn="true"]'
//         );

//         needToResetAttribute &&
//           needToResetAttribute.setAttribute('hasDownloadBtn', 'false');
//         break;

//       default:
//         break;
//     }

//     const btn = target?.closest(`#${CHATGPT_BTN_ID}`);

//     if (!btn) return;

//     const needToReplyTheComment = Boolean(
//       target?.closest(
//         '.comments-comment-item.comments-comments-list__comment-item'
//       )
//     );
//     const needToReplyThePost = Boolean(
//       target?.closest('.feed-shared-update-v2') ||
//         target?.closest('.reusable-search__result-container')
//     );

//     switch (true) {
//       case needToReplyTheComment:
//         console.log(`Comment`);
//         await comment_action(target, btn);
//         break;

//       case needToReplyThePost:
//         console.log(`Post`);
//         await post_action(target, btn);
//         break;

//       default:
//         break;
//     }
//   });
// };

injector();
