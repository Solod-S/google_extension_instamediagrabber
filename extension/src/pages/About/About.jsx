import React from 'react';
import { useLayoutEffect } from 'react';
import Lottie from 'lottie-react';
import './About.css';
import './Intro.css';
import animation from '../../assets/img/intagif2.gif';

import {
  GithubIcon,
  GithubIconLink,
  StackoverflowIcon,
  StackoverflowIconLink,
} from './About.styled';

import animationData from '../../assets/img/animation.json';

const About = () => {
  useLayoutEffect(() => {
    let intro = document.querySelector('.intro');
    // let logo = document.querySelector('.logo-header');
    let logoSpan = document.querySelectorAll('.logo');

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (idx + 1) * 400);
      });

      setTimeout(() => {
        logoSpan.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (idx + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        intro.style.top = '-100vh';
      }, 2300);
    }, 0); // Выполнить код после рендера компонента
  }, []);
  return (
    <div className="about-container">
      <div className="intro">
        <h1 className="logo-header">
          <span className="logo">👋 Thanks </span>{' '}
          <span className="logo"> for installing</span>
        </h1>
      </div>

      <div className="about-content">
        <h2 className="about-title">About Instagram Media Graber</h2>
        <p className="about-text">
          This Chrome extension simplifies the process of downloading media
          content from Instagram.
        </p>
        <h3 className="about-features-title">Main Features:</h3>
        <ul className="about-features-list">
          <li className="about-features-item">
            Download Photos: Easily save images from the Instagram news feed and
            user profiles.
          </li>
          <li className="about-features-item">
            Download Videos: Capture videos from user profiles and Instagram
            reels effortlessly.
          </li>
        </ul>
        <GithubIconLink
          href="https://github.com/Solod-S/google_extension_instamediagrabber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size="3.2rem" />
        </GithubIconLink>
        <StackoverflowIconLink
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StackoverflowIcon size="3.2rem" />
        </StackoverflowIconLink>
      </div>

      <div className="animation-container">
        {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
        <div style={{ width: '400px', height: '400px' }}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      <div className="about-animation">
        <img
          src={animation}
          alt="how to instal animation"
          width="100%"
          className="about-animation-item"
        />
      </div>
    </div>
  );
};

export default About;
