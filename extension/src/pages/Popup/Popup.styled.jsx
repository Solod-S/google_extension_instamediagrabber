import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  font-size: large;
  /* align-items: center; */
  flex-direction: column;
  /* width: 330px; */
  height: auto;
  padding: 24px;
  position: relative;

  .logo {
    margin-bottom: 24px;
    /* height: 48px; */
    margin-bottom: 12px;
  }
  .title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
  }

  input {
    padding: 15px 20px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    /* width: 100%; */
    text-align: center;
    margin: 6px 0;
  }

  select {
    width: 100%;
  }

  input:focus {
    outline: none !important;
    border-color: rgba(0, 0, 0, 0.4);
  }

  p {
    font-size: 10px;
    text-align: center;
  }

  p a {
    font-weight: bold;
    text-decoration: none;
  }
`;

export const SettingsBtn = styled.div`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  transition: background 1s ease;

  &:hover {
    color: #fff;
    background: linear-gradient(
      133.43deg,
      rgb(42 111 219) 0%,
      rgb(7 40 93) 102.89%
    );

    svg {
      fill: #fff;
      transform: rotate(30deg);
    }
  }

  &,
  svg {
    transition: all 0.2s ease;
  }

  .settings-btn:hover svg {
    fill: #fff;
    transform: rotate(30deg);
  }
`;
