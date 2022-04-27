/* eslint-disable sort-imports */
/* eslint-disable import/no-unresolved */
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './DashboardSwiper.scss';
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useMemo } from 'react';
import PostCard from '../PostCard/PostCard';

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
const DashboardSwiper = ({ postData, filterBy }) => (
  <Swiper
    className="dashboard-swiper"
    keyboard={{ enabled: true }}
    rewind
    slidesPerView={1}
    spaceBetween={24}
    pagination={{ type: 'bullets', clickable: true, dynamicBullets: true }}
    modules={[Pagination, Keyboard, Navigation]}
    breakpoints={breakpoints}
    grabCursor
  >
    {useMemo(
      () => postData
        .filter((post) => (filterBy.get('filter')
          ? post.category === filterBy.get('filter') : post))
        .map((post) => (
          <SwiperSlide key={post.post_id}>
            <PostCard post={post} />
          </SwiperSlide>
        )),
      [postData, filterBy],
    )}
  </Swiper>
);

export default React.memo(DashboardSwiper);
