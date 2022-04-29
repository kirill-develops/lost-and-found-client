/* eslint-disable sort-imports */
import './Dashboard.scss';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterPostOptions } from '../../utils/constants';
import CreatePost from '../../components/CreatePost/CreatePost';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import DashbaordUser from '../../components/DashboardUser/DashbaordUser';
import DashboardSwiper from '../../components/DashboardSwiper/DashboardSwiper';
import apiUtils from '../../utils/apiUtils';

// type userData = {
//   userData: {
//     first_name: string,
//     last_name: string,
//     address: ?string,
//     city: string,
//     province: string,
//     phone: number,
//     volunteer: boolean,
//     postal: string,
//     avatar_url: ?string,
//     updated_at: string
//   }
// }

const Dashboard = ({ userData }) => {
  const [offersData, setOffersData] = useState([]);
  const [seekingData, setSeekingData] = useState([]);
  const [filterParams, setFilterParams] = useSearchParams();

  // Fetch posts from the DB
  const fetchPosts = useCallback(() => {
    apiUtils
      .getAllPosts()
      .then((posts) => {
        // Update state with fetched posts
        setOffersData(posts.data.filter((post) => post.offer === 1));
        setSeekingData(posts.data.filter((post) => post.offer === 0));
      })
      .catch((err) => {
        console.log('Error fetching posts:', err);
      });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="dashboard">
      <DashboardNav
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <div className="dashboard__block">
        {/* if the user is logged in show their user metrics */}
        {userData.first_name && (
          <DashbaordUser
            userData={userData}
          />
        )}
        {/* Create new post component.
          Note the passed prop that allows it to re-fetch the posts after new one is created */}
        <CreatePost
          userData={userData}
          onPostCreate={fetchPosts}
        />
        {/* Dynamic Heading showing which posts, in the case they are filtered */}
        <h2 className="dashboard__title">
          {useMemo(() => filterPostOptions
            .find((option) => option.value === (filterParams
              .get('filter') || ''))
            .label, [filterParams])}
          {' '}
          Posts
        </h2>
        <div className="list-block">
          <div className={`${userData.volunteer
            ? 'list-block__second' : 'list-block__first'}`}
          >
            <h3 className="dashboard__subheading--offer">Offering a Hand</h3>
            <DashboardSwiper
              postData={offersData}
              filterBy={filterParams}
            />
          </div>
          {/* <div className='list-block__fill'></div> */}
          <div className="list-block__filler" />
          <div className={` ${userData.volunteer
            ? 'list-block__first' : 'list-block__second'}`}
          >
            <h3 className="dashboard__subheading--seeking">Seeking a Hand</h3>
            <DashboardSwiper
              postData={seekingData}
              filterBy={filterParams}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Dashboard);
