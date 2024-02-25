const instagramRouter = require("express").Router();

const { instagram } = require("../controllers");

//  get video
instagramRouter.post("/getvideo", instagram.getVideo);

module.exports = instagramRouter;
