const { ndown } = require("nayan-media-downloader");

const getVideo = async (req, res, next) => {
  try {
    const { url } = req.body;
    let response = await ndown(url);
    console.log(
      `  url: response.data[0].url,
        thumbnail: response.data[0].thumbnail,`,
      response.data[0].url,
      response.data[0].thumbnail
    );
    if (response.status && response.data[0].thumbnail && response.data[0].url) {
      // Sending video URL back to the client
      res.send({
        success: true,
        message: "Successful request",
        url: response.data[0].url,
        thumbnail: response.data[0].thumbnail,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "The specified post does not contain a media",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getVideo;
// https://adebola-niran.medium.com/how-to-build-an-instagram-video-downloader-in-node-js-adee4d63a71e
