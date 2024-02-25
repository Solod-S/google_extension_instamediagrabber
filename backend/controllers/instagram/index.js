const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const getVideo = require("./getVideo");

module.exports = {
  getVideo: ctrlWrapper(getVideo),
};
