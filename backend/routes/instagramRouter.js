const instagramRouter = require("express").Router();

const { instagram } = require("../controllers");

//  get video
instagramRouter.post("/getvideo", instagram.getVideo);

//  proxy
instagramRouter.post("/proxy", instagram.proxy);

module.exports = instagramRouter;
