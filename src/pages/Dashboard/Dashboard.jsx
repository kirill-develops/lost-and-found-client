import './Dashboard.scss';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import CreatePost from '../../components/CreatePost/CreatePost';
import DashBoardNav from '../../components/DashboardNav/DashboardNav';
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
const filterPostOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'employment_services', label: 'Employment Services' },
  { value: 'on-boarding', label: 'On-boarding' },
  { value: 'translations', label: 'Translations' },
  { value: 'goods', label: 'Free Goods' },
  { value: 'transportation', label: 'Transportation' },
  { value: '', label: 'All' },
];

const Dashboard = ({ history, userData }) => {
  const [offersData, setOffersData] = useState([]);
  const [seekingData, setSeekingData] = useState([]);
  const [volunteer, setVolunteer] = useState(userData.volunteer
    && userData.volunteer.toLowerCase() === 'true');
  const [filterBy, setFilterBy] = useState('');
  // const [isUserRegistered, setIsUserRegistered] = useState(true);
  console.log(userData);
  // Fetch posts from the DB
  const fetchPosts = useCallback(() => {
    apiUtils
      .getAllPosts()
      .then((posts) => {
        // Update state with fetched posts
        setOffersData(posts.data.filter((post) => post.offer === 1));
        setSeekingData(posts.data.filter((post) => post.offer === 0));

        apiUtils.getProfile()
          .then((user) => {
            user.data.volunteer.toLowerCase() === 'true' ? setVolunteer(true) : setVolunteer(false);
          })
          .catch((err) => {
            console.log('Error fetching user:', err);
          });
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
      <DashBoardNav
        setFilterBy={setFilterBy}
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
          isOffer={volunteer}
          onPostCreate={() => fetchPosts}
          history={history}
        />
        {/* Dynamic Heading showing which posts, in the case they are filtered */}
        <h2 className="dashboard__title">
          {useMemo(
            () => filterPostOptions.find(
              (option) => option.value === filterBy,
            ).label,
            [filterBy],
          )}
          {' '}
          Posts
        </h2>
        <div className="list-block">
          <div className={`${volunteer ? 'list-block__second' : 'list-block__first'}`}>
            <h3 className="dashboard__subheading--offer">Offering a Hand</h3>
            <DashboardSwiper
              postData={offersData}
              filterBy={filterBy}
            />
          </div>
          {/* <div className='list-block__fill'></div> */}
          <div className="list-block__filler" />
          <div className={` ${volunteer ? 'list-block__first' : 'list-block__second'}`}>
            <h3 className="dashboard__subheading--seeking">Seeking a Hand</h3>
            <DashboardSwiper
              postData={seekingData}
              filterBy={filterBy}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Dashboard);
