import React from 'react';

import logo from '../../assets/img/logo-pop-up.png';

import * as Styled from './Popup.styled';
import './Popup.css';
import useChromeStorage from '../../hooks/useChromeStorage';

const Popup = () => {
  const [
    isVideoBtnVisible,
    setIsVideoBtnVisible,
    { loading: useVideoBtnSettingsisLoading },
  ] = useChromeStorage('instagraber-show-videoBtn', true);
  const [
    isPhotoBtnVisible,
    setIsPhotoBtnVisible,
    { loading: usePhotoBtnSettingsisLoading },
  ] = useChromeStorage('instagraber-show-photoBtn', true);
  return (
    <Styled.Wrapper>
      <img src={logo} alt="logo" className="logo" />

      {/* Options */}
      <label htmlFor="open-api-key" className="title">
        Options:
      </label>

      <div className="control">
        <input
          type="checkbox"
          id="checkboxVideoBtn"
          checked={isVideoBtnVisible}
          disabled={useVideoBtnSettingsisLoading}
          onChange={(e) => {
            setIsVideoBtnVisible(e.target.checked);
          }}
        />{' '}
        <label htmlFor="checkboxVideoBtn">Show video download button</label>
      </div>
      <div className="control">
        <input
          type="checkbox"
          id="checkboxPhotoBtn"
          checked={isPhotoBtnVisible}
          disabled={usePhotoBtnSettingsisLoading}
          onChange={(e) => {
            setIsPhotoBtnVisible(e.target.checked);
          }}
        />{' '}
        <label htmlFor="checkboxPhotoBtn">Show photo download button</label>
      </div>

      {/* Help */}
      <p>
        Have some questions? More information{' '}
        <a target="_blank" rel="noreferrer" href="3">
          here.
        </a>
      </p>
    </Styled.Wrapper>
  );
};

export default Popup;
