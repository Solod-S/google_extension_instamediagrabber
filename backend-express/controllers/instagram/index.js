const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const getVideo = require("./getVideo");
const proxy = require("./proxy");

module.exports = {
  getVideo: ctrlWrapper(getVideo),
  proxy: ctrlWrapper(proxy),
};
