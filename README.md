![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with Google Scripting API](https://img.shields.io/badge/Runs%20with%20Chrome_Scripting_API-000.svg?style=flat-square&logo=Google&labelColor=DF3A2A&logoColor=E8AF01)](https://developer.chrome.com/docs/extensions/reference/api/scripting)
[![runs with react](https://img.shields.io/badge/Runs%20with%20React-000.svg?style=flat-square&logo=React&labelColor=f3f3f3&logoColor=61DAFB)](https://uk.legacy.reactjs.org/)
[![runs with nodeJs](https://img.shields.io/badge/Runs%20with%20NodeJs-000.svg?style=flat-square&logo=nodedotjs&labelColor=f3f3f3&logoColor=#3C823B)](https://nodejs.org/ru)
[![runs with nestJs](https://img.shields.io/badge/Runs%20with%20NestJs-000.svg?style=flat-square&logo=NestJs&labelColor=f3f3f3&logoColor=red)](https://docs.nestjs.com/)

![InstagramMediaGraber](./media/4882388.jpg)

# Instagram Media Graber

**Built using React, Google Chrome Scripting API, NodeJs, NestJs & Swagger**.

This Chrome extension facilitates downloading:

- Photos from the Instagram news feed.
- Photos from user or company profiles.
- Videos from user or company profiles.
- Videos from Instagram reels.

![InstagramMediaGraber](./media//extension-720.gif)

## Features and Fuctionality

- Add save video button to DOM elements (save video)
- Add save photo button to DOM elements (save video)
- Add context menu options to save all images on the page (select and save all images)

<!-- ![InstagramMediaGraber](./media/intagif2.gif) -->

## Load extension to chrome

1. Create and set environment variables `secrets.development.js` && `secrets.production.js`

```
export default {
  serverUrl: 'ServerUrl',
  xApiKey: 'ApiKey',
};

```

2. Go to `extension` folder
3. Run build command

```
npm run build

```

4. Go to `chrome://extensions/` and click Load Unpacked
5. Load `build` folder

## Start server

1. Go to `backend-nest` folder
2. Run start command

```
npm run start:dev
```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
