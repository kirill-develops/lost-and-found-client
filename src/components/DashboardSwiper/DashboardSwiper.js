/* eslint-disable react/prop-types */
import React from 'react';
import Post from '../../components/Post/Post';
import './DashboardSwiper.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


const DashboardSwiper = ({ postData, filterBy }) => {
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 24
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    // when window width is >= 960px
    960: {
      slidesPerView: 3,
      spaceBetween: 24
    }
  };

  {/* Render a list of offer's Post components specifically offering assistance */ }
  return (
    < Swiper
      className='dashboard__swiper'
      keyboard={{ enabled: true }}
      rewind={true}
      slidesPerView={1}
      spaceBetween={24}
      pagination={{ type: 'bullets', clickable: true, dynamicBullets: true }}
      modules={[Pagination, Keyboard, Navigation]}
      breakpoints={breakpoints}
      grabCursor={true}
    >
      {
        postData
          .filter(post => {
            if (filterBy) {
              return post.category === filterBy
            }
            return post;
          })
          .map(post =>
            <SwiperSlide key={post.post_id}>
              <Post post={post} />
            </SwiperSlide>
          )
      }
    </Swiper >
  )
}

export default DashboardSwiper;