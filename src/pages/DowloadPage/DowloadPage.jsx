import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import './DowloadPage.css';

function DowloadPage() {
  const [urls, setUrls] = useState([]);
  const [selectedUrls, setSelectedUrls] = useState([]);

  useEffect(() => {
    // Принять сообщение от другой вкладки
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Обработать сообщение здесь
      console.log('Received message:', message);
      // Добавить обработку сообщения, например, обновить список URL-адресов
      setUrls(message);
      // Отправить подтверждение
      sendResponse('Message received!');
    });
  }, []); // Пустой массив зависимостей гарантирует, что обработчик будет добавлен только один раз

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedUrls((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedUrls((prevSelected) =>
        prevSelected.filter((url) => url !== value)
      );
    }
  };

  const handleDownload = async () => {
    if (selectedUrls.length === 0) {
      alert('Please, select at least one image');
      return;
    }

    try {
      const archive = await createArchive(selectedUrls);
      downloadArchive(archive);
    } catch (err) {
      alert(err.message);
    }
  };

  const createArchive = async (urls) => {
    const zip = new JSZip();
    for (let index in urls) {
      try {
        const url = urls[index];
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(checkAndGetFileName(index, blob), blob);
      } catch (err) {
        console.error(err);
      }
    }
    return zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    });
  };

  const checkAndGetFileName = (index, blob) => {
    let name = parseInt(index) + 1;
    const [type, extension] = blob.type.split('/');
    if (type !== 'image' || blob.size <= 0) {
      throw new Error('Incorrect content');
    }
    return name + '.' + extension;
  };

  const downloadArchive = (archive) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(archive);
    link.download = 'images.zip';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="header">
        <div>
          <label for="selectAll" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="selectAll"
              id="selectAll"
              onChange={(event) => {
                const checked = event.target.checked;
                const items = document.querySelectorAll('.container input');
                for (let item of items) {
                  item.checked = checked;
                  handleCheckboxChange(event);
                }
              }}
            />
            &nbsp;
            <span>Select all</span>
          </label>
        </div>
        {/* <span>Instagram Media Grabber</span> */}
        <button id="downloadBtn" onClick={handleDownload}>
          Download
        </button>
      </div>
      <div className="container">
        {urls.length > 0 &&
          urls.map((url, index) => (
            <label for={`img_checkbox` + index} key={index}>
              <div className="imageDiv">
                <img crossorigin="anonymous" src={url} alt="img" />
                <input
                  class="checkbox-input"
                  name={`img_checkbox` + index}
                  id={`img_checkbox` + index}
                  type="checkbox"
                  value={url}
                  onChange={handleCheckboxChange}
                />
              </div>
            </label>
          ))}
      </div>
    </div>
  );
}

export default DowloadPage;
