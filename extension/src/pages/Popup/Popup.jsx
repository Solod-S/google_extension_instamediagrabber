import React from 'react';
import { allImagesHandler } from '../../services';
import './Popup.css';

const Popup = () => {
  return (
    <div>
      <div className="container">
        <button onClick={allImagesHandler}>Grab Images</button>
      </div>
    </div>
  );
};

export default Popup;
