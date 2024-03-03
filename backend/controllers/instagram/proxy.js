const axios = require("axios");

const proxy = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).send("Не указан URL изображения");
    }

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    };

    // Выполняем GET-запрос к указанному URL через прокси
    const response = await axios.get(url, {
      headers: headers,
      responseType: "arraybuffer", // Устанавливаем тип ответа как бинарный массив
    });
    // console.log(`response`, response);
    // Отправляем содержимое изображения в ответ
    res.contentType("image/jpeg"); // Устанавливаем тип содержимого как JPEG
    res.send(response.data);
  } catch (error) {
    console.log(`error`, error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = proxy;
