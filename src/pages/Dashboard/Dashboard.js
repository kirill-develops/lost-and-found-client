/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation } from 'swiper';
import apiUtils from '../../utils/apiUtils';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './Dashboard.scss';
import DashBoardNav from '../../components/DashboardNav/DashBoardNav';

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

class Dashboard extends Component {
  state = {
    offers: [],
    seeking: [],
    volunteer: false,
    filter: ""
  }

  componentDidMount() {
    this.fetchPosts();
  }

  // Fetch posts from the DB
  fetchPosts = () => {
    // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
    apiUtils
      .getAllPosts()
      .then(posts => {
        // Update state with fetched posts
        this.setState({
          posts: posts.data,
          offers: posts.data.filter(post => post.offer === 1),
          seeking: posts.data.filter(post => post.offer === 0),
        });

        apiUtils.getProfile()
          .then(user => {
            user.data.volunteer.toLowerCase() === 'true' ? this.setState({ volunteer: true }) : this.setState({ volunteer: false });
          })
          .catch(err => {
            console.log('Error fetching user:', err);
          })
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  handleFilter = (filterProp) => {
    console.log(filterProp);
    this.setState({ filter: filterProp });
  }

  render() {
    return (
      <section className="dashboard">
        <DashBoardNav handleFilter={this.handleFilter} />
        <div className="dashboard__block">
          <h1 className='dashboard__title'>Posts</h1>

          {/*
          Create new post component.
          Note the passed prop that allows it to re-fetch the posts after new one is created
        */}
          <CreatePost
            onPostCreate={this.fetchPosts}
            history={this.props.history} />

          <div className='list-block'>
            <div className={` ${this.state.volunteer ? 'second' : 'first'}`}>
              <h3 className=''>Offering a Hand</h3>
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
                {this.state.offers
                  .filter(post => {
                    if (this.state.filter) {
                      return post.category === this.state.filter
                    }
                    return post;
                  })
                  .map(post =>
                    <SwiperSlide
                      key={post.post_id}
                    >
                      <Post
                        post={post}
                      />
                    </SwiperSlide>
                  )}
              </Swiper>
            </div>
            {/* <div className='list-block__fill'></div> */}
            <div className='list-block__filler'></div>
            <div className={` ${this.state.volunteer ? 'first' : 'second'}`}>
              <h3 className=''>Seeking a Hand</h3>
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
                {this.state.seeking.filter(post => {
                  if (this.state.filter) {
                    return post.category === this.state.filter
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
  }
}

export default Dashboard;
