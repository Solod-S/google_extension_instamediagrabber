(()=>{"use strict";function t(t,e,o){return`<svg\n  id="${o}"\n  width="${t}"\n  height="${t}"\n  viewBox="64 64 896 896"\n  focusable="false"\n  data-icon="cloud-download"\n  fill="currentColor"\n  aria-hidden="true"\n>\n  <path d="M624 706.3h-74.1V464c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v242.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9z"></path>\n  <path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 01-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"></path>\n</svg>`}const e=()=>{document.querySelectorAll('div._aagv img[ crossorigin="anonymous" ]').forEach((e=>{if("true"===e.getAttribute("hasDownloadBtn"))return;e.setAttribute("hasDownloadBtn","true");const o=document.createElement("button");o.setAttribute("type","button"),o.setAttribute("id","instagram-btn"),o.setAttribute("class","artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"),o.style.position="absolute",o.style.left="4px",o.style.top="4px",o.style.zIndex="1",o.style.cursor="pointer",o.style.background="linear-gradient(45deg, #F4B04B, #A535B1)",o.style.borderRadius="30%",o.style.transition="transform 250ms",o.addEventListener("mouseenter",(()=>{o.style.transform="scale(1.1)"})),o.addEventListener("mouseleave",(()=>{o.style.transform="scale(1)"})),o.innerHTML=t(20);const n=e.closest("div._aagv");n&&(n.style.position="relative",n.appendChild(o))})),document.querySelectorAll('video[preload="none"]').forEach((e=>{if("true"===e.getAttribute("hasDownloadBtn"))return;e.setAttribute("hasDownloadBtn","true");const o=document.createElement("button");o.setAttribute("type","button"),o.setAttribute("id","instagram-btn"),o.setAttribute("class","artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"),o.style.position="absolute",o.style.left="4px",o.style.top="4px",o.style.zIndex="1",o.style.cursor="pointer",o.style.background="linear-gradient(45deg, #F4B04B, #A535B1)",o.style.borderRadius="30%",o.style.transition="transform 250ms",o.addEventListener("mouseenter",(()=>{o.style.transform="scale(1.1)"})),o.addEventListener("mouseleave",(()=>{o.style.transform="scale(1)"})),o.innerHTML=t(20);const n=e.closest("div._aatk._aatl");n&&(n.style.position="relative",n.appendChild(o))}))};e();const o=["instagram.com"];console.log("Content script works!"),console.log("Must reload extension for modifications to take effect."),(()=>{const t=window.location.hostname?.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)?.[1]||"";o.includes(t)&&((async()=>{document.body.addEventListener("click",(async t=>{const e=t.target,o=e?.closest("#instagram-btn");if(!o)return;const n=Boolean(e?.closest("._aagv")),a=Boolean(e?.closest("div._aatk._aatl"));switch(!0){case n:console.log("needToDownloadImg",n);try{const t=e.closest("._aagv").querySelector("img");if(t){const e=t.getAttribute("src");fetch(e).then((t=>t.blob())).then((t=>{const e=URL.createObjectURL(t),o=document.createElement("a");o.href=e,o.download="image.jpg",document.body.appendChild(o),o.click(),window.URL.revokeObjectURL(e)})).catch((t=>{console.error("Ошибка при загрузке изображения:",t)}))}else console.error("Изображение не найдено внутри элемента с классом ._aagv")}catch(t){console.error("Произошла ошибка:",t)}break;case a:console.log("needToDownloadVideo",a);try{const t=e.closest("div._aatk._aatl").querySelector("video");if(t){const e=t.src.replace("blob:","");fetch("http://localhost:1234/instagram/getvideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).then((t=>t.blob())).then((t=>{const e=URL.createObjectURL(t),o=document.createElement("a");o.href=e,o.download="video.mp4",document.body.appendChild(o),o.click(),window.URL.revokeObjectURL(e)})).catch((t=>{console.error("Ошибка при загрузке видео:",t)}))}else console.error("Видео не найдено внутри элемента с классом ._aatk._aatl")}catch(t){console.error("Произошла ошибка:",t)}}}))})(),setInterval(e,200))})()})();