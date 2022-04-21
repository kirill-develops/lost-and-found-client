/* eslint-disable import/no-unresolved */
/* eslint react/prop-types: 0 */
import React from 'react';
import './DashboardSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import Post from '../Post/Post';

const DashboardSwiper = ({ postData, filterBy }) => {
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    // when window width is >= 960px
    960: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  };

  /* Render a list of offer's Post components specifically offering assistance */
  return (
    <Swiper
      className="dashboard__swiper"
      keyboard={{ enabled: true }}
      rewind
      slidesPerView={1}
      spaceBetween={24}
      pagination={{ type: 'bullets', clickable: true, dynamicBullets: true }}
      modules={[Pagination, Keyboard, Navigation]}
      breakpoints={breakpoints}
      grabCursor
    >
      {
        postData
          .filter((post) => (filterBy ? post.category === filterBy : post))
          .map((post) => (
            <SwiperSlide key={post.post_id}>
              <Post post={post} />
            </SwiperSlide>
          ))
      }
    </Swiper>
  );
};

export default DashboardSwiper;
