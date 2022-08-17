import React from 'react';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './HomepageSwiper.scss';
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import FistBump from '../../assets/images/fist_bump.jpg';
import HandsPhoto from '../../assets/images/helping_out.jpg';
import Logo from '../../assets/images/Asset_37.svg';

// eslint-disable-next-line arrow-body-style
const HomepageSwiper = () => {
  return (
    <div className="swiper-block">
      <div className="swiper-block__inner">
        <div className="swiper-block__accent1" />
        <div className="swiper-block__accent2" />
        <div className="swiper-block__accent3" />
        <Swiper
          keyboard={{ enabled: true }}
          rewind
          grabCursor
          pagination={{ type: 'progressbar' }}
          navigation
          modules={[Pagination, Navigation, Keyboard]}
          className="swiper-component"
        >
          {/* Slide 1 */}
          <SwiperSlide className="swiper">
            <img src={FistBump} alt="fist bump" className="swiper__img" />
            <div className="swiper__block--slide1">
              <img src={Logo} alt="Lost & Found Logo" className="swiper__img--logo" />
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide className="swiper">
            <div className="swiper__block--slide2">
              <h2 className="swiper__title--slide2">
                With a pay it forward mentality, our once in need become drivers of this initiative and in today&apos;s technological boom, it&apos;s never been easier to pool resources.
              </h2>
            </div>
            <img src={HandsPhoto} alt="Helping out" className="swiper__img" />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <iframe
              height="100%"
              width="100%"
              src="https://www.youtube-nocookie.com/embed/ap8aTm73baI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
          <SwiperSlide className="swiper">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube-nocookie.com/embed/UE89_hkMoBU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomepageSwiper;
