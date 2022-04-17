/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation } from 'swiper';
import apiUtils from '../../utils/apiUtils';
import DashBoardNav from '../../components/DashboardNav/DashBoardNav';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './Dashboard.scss';

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

const filterOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'employment_services', label: 'Employment Services' },
  { value: 'on-boarding', label: 'On-boarding' },
  { value: 'translations', label: 'Translations' },
  { value: 'goods', label: 'Free Goods' },
  { value: 'transportation', label: 'Transportation' },
  { value: '', label: 'All' },
]

const Dashboard = ({ isLoggedIn, userData, history }) => {

  const [offers, setOffers] = useState([]);
  const [seeking, setSeeking] = useState([]);
  const [volunteer, setVolunteer] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  // Fetch posts from the DB
  const fetchPosts = () => {
    // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
    apiUtils
      .getAllPosts()
      .then(posts => {
        // Update state with fetched posts
        setOffers(posts.data.filter(post => post.offer === 1));
        setSeeking(posts.data.filter(post => post.offer === 0));

        apiUtils.getProfile()
          .then(user => {
            user.data.volunteer.toLowerCase() === 'true' ? setVolunteer(true) : setVolunteer(false);
          })
          .catch(err => {
            console.log('Error fetching user:', err);
          })
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  const handleFilter = (filterProp) => {
    setFilterBy(filterProp);
  }

  useEffect(() => {
    fetchPosts();
  }, [isLoggedIn]);

  return (
    <section className="dashboard">
      <DashBoardNav handleFilter={handleFilter} />
      <div className="dashboard__block">
        {/* if the user is logged in show their user metrics */}
        {userData.first_name &&
          (
            <>
              <h1 className='dashboard__title'>Dashboard</h1>
              <div className='dashboard__user-block'>
                <div className='list-block__filler--user'></div>
                <div className='dashboard__user-wrapper'>
                  <div className='dashboard__avatar-frame'>
                    <img
                      className="dashboard__avatar"
                      src={userData.avatar_url}
                      alt={`${userData.first_name} avatar`}
                    />
                  </div>
                  <div className='dashboard__user-frame'>
                    <h3 className='profile-card__subheading'>Messenger</h3>
                    <h3 className='profile-card__label'>New Contacts:
                      <span className='profile-card__body'> 1</span></h3>
                    <h3 className='profile-card__label'>Awaiting Replies:
                      <span className='profile-card__body'> 3</span></h3>
                    <h3 className='profile-card__label'>View All </h3>
                  </div>
                  <div className='dashboard__user-frame'>
                    <h3 className='profile-card__subheading'>User Metrics</h3>
                    <h3 className='profile-card__label'>Open Offers:
                      <span className='profile-card__body'> 3</span></h3>
                    <h3 className='profile-card__label'>Open Seeking:
                      <span className='profile-card__body'> 1</span></h3>
                    <h3 className='profile-card__label'>User Posts</h3>
                  </div>
                </div>
              </div>
            </>
          )
        }

        <h2 className='dashboard__title'>{filterOptions.find(option => option.value === filterBy).label} Posts</h2>
        {/*
          Create new post component.
          Note the passed prop that allows it to re-fetch the posts after new one is created
        */}
        <CreatePost
          isOffer={volunteer}
          onPostCreate={fetchPosts}
          history={history} />

        <div className='list-block'>
          <div className={`${volunteer ? 'list-block__second' : 'list-block__first'}`}>
            <h3 className='dashboard__subheading--offer'>Offering a Hand</h3>
            {/* Render a list of offer's Post components specifically offering assistance */}
            <Swiper
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
              {offers
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
                )}
            </Swiper>
          </div>
          {/* <div className='list-block__fill'></div> */}
          <div className='list-block__filler--second'></div>
          <div className={` ${volunteer ? 'list-block__first' : 'list-block__second'}`}>
            <h3 className='dashboard__subheading--seeking'>Seeking a Hand</h3>
            <Swiper
              className='dashboard__swiper'
              keyboard={{ enabled: true }}
              rewind={true}
              slidesPerView={1}
              spaceBetween={24}
              grabCursor={true}
              pagination={{ type: 'bullets', clickable: true, dynamicBullets: true }}
              modules={[Pagination, Keyboard, Navigation]}
              breakpoints={breakpoints}
            >
              {/* Render a list of Post components specifically seeking assistance */}
              {seeking.filter(post => {
                if (filterBy) {
                  return post.category === filterBy
                }
                return post;
              }).map(post =>
                <SwiperSlide key={post.post_id}>
                  <Post post={post} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Dashboard;
