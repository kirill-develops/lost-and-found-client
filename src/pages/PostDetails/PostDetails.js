/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';
import './PostDetails.scss';

const filterOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'employment_services', label: 'Employment Services' },
  { value: 'on-boarding', label: 'On-boarding' },
  { value: 'translations', label: 'Translations' },
  { value: 'goods', label: 'Free Goods' },
  { value: 'transportation', label: 'Transportation' },
  { value: '', label: 'All' },
];

const PostDetails = ({ match }) => {

  const [active, setActive] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isCurrentUser, setCurrentUser] = useState('');
  const [offer, setOffer] = useState('');
  const [picUrl, setPicUrl] = useState('');
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [usersId, setUsersId] = useState('');
  const [isLoading, setLoading] = useState(true);

  const fetchPost = () => {
    apiUtils
      .getPostById(match.params.id)
      .then(post => {
        // Update state with fetched post data
        setActive(post.data.active);
        setAvatarUrl(post.data.avatar_url);
        setCategory(post.data.category);
        setDescription(post.data.description);
        setFirstName(post.data.first_name);
        setCurrentUser(post.data.isCurrentUser);
        setOffer(post.data.offer);
        setPicUrl(post.data.pic_url);
        setTitle(post.data.title);
        setUsersId(post.data.users_id);
        setTimestamp(post.data.updated_at);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  useEffect(() => {
    fetchPost();
  });

  if (isLoading === true) return null;

  return (
    <div className='post-details'>
      <div className='post-details__block'>
        <h1 className="post-details__title">{title}</h1>
        <h2 className={offer ? 'post-details__subheading--offer' : 'post-details__subheading--seeking'}>
          {filterOptions.find(filter => filter.value === category).label}
        </h2>
        <div className='post-details__bottom'>
          <Link to={`user/${usersId}`}>
            <img src={avatarUrl} alt='user avatar' className='' />
            <h2>{firstName}</h2>
          </Link>
          <h2>{description}</h2>
        </div>
        <p>posted: {timestamp}</p>
      </div>
    </div>
  )
}


export default PostDetails;
