/* eslint-disable react/prop-types */
import React, { Component } from "react";
import apiUtils from "../../utils/apiUtils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard } from 'swiper';
import HandsPhoto from '../../assets/images/helping_out.jpg';
import FistBump from '../../assets/images/fist_bump.jpg';
import Logo from '../../assets/images/Asset_37.svg';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Homepage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5050";

const HomePage = () => {

  return (
    <section className="homepage">
      <div className="homepage__header">
        <div className="homepage__header-block">
          <h1>Global support, locally sourced</h1>
          <h2 className="homepage__subheader">Because no one should face their toughest challenges alone</h2>
        </div>
      </div>
      <div className="homepage__swiper-block">
        <div className="homepage__swiper-inner-block">
          <div className="homepage__swiper-block--highlight1"></div>
          <div className="homepage__swiper-block--highlight2"></div>
          <div className="homepage__swiper-block--highlight3"></div>

          <Swiper
            keyboard={{ enabled: true }}
            rewind={true}
            grabCursor={true}
            pagination={{ type: "progressbar", }}
            navigation={true}
            modules={[Pagination, Navigation, Keyboard]}
            className="homepage__swiper">

            <SwiperSlide className="swiper">
              <img src={FistBump} alt="fist bump" className="swiper__img" />
              <div className="swiper__block--slide1">
                <img src={Logo} alt='Lost & Found Logo' className="swiper__img--logo" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper">
              <div className="swiper__block--slide2">
                <h2 className="swiper__title--slide2">With a pay it forward mentality, our once in need become drivers of this initiative and in today&apos;s technological boom, it&apos;s never been easier to pool resources.</h2>
              </div>
              <img src={HandsPhoto} alt="Helping out" className="swiper__img" />
            </SwiperSlide>
            <SwiperSlide className="swiper">
              <iframe height="100%" width='100%' src="https://www.youtube-nocookie.com/embed/ap8aTm73baI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </SwiperSlide>
            <SwiperSlide className="swiper--slide4">
              <div className="swiper__block--slide4">
                <div className="swiper__block--slide4-overlay">
                  <h2 className="swiper__title--slide4">
                    We&apos;re Happy you&apos;re here,
                  </h2>
                  <h2 className="swiper__title--slide4">
                    no matter the circumstances :)
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="homepage__intro">
        <div className="homepage__intro-block">
          <div className="homepage__intro-block--left">
            <p>
              Welcome to <i>Lost&Found.</i> We&apos;re glad you&apos;ve made it :)
            </p>
            <p>
              With a pay it forward system, our goal is to equip those in need with the ability to provide. Most of our vollunteers are long time contributers, however in the old model, NFPs rarely communicated with one another, thus leaving a lot of potential lost in the process due to primitive channels of information, leading to poor efficiency.
            </p>
            <p>
              Until Now.
            </p>
            <p>
              With the open source ideals developed into Lost & FOUND, we&apos;ve given birth to a communally run, centralized communication port driven by the one&apos;s who care most, the vollunteers.
            </p>
          </div>
          <div className="homepage__intro-block--right">
            <p>
              At Lost & Found we take pride in directly connecting those who are motivated to help but may not know where to start or may have a concern of how far their contributions go through traditional channels. Through a direct connection, we can mitigate managment costs and focus on spending resources where it counts. You as a vollunteer will also benefit greatly with a deeper connection to those you will impact and be able to grow your network as new friends settle in and adapt with your guidance. If you are ready to help, please <a href={`${SERVER_URL}/auth/google`}>click here</a> to connect with your Google account and begin the sign-up process.  Whether it&apos;s someone going through an unfortunate chapter, or a family seeking refuge from a situation out of their control, they can use your support now.
            </p>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HomePage;