/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';
import TrashIco from '../../assets/icons/trash-can-outline.svg';
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

// type matchType = {
//   match: {
//     params: {
//       id: string
//     }
//   }
// }

const PostDetails = ({
  match,
  history,
}) => {
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
      .then((post) => {
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
      .catch((err) => {
        console.log('Error fetching posts:', err);
      });
  };

  const deletePost = (id) => {
    apiUtils
      .deletePostById(id)
      .then(history.goBack())
      .catch();
  };

  useEffect(() => {
    fetchPost();
  });

  return isLoading === true ? (
    null
  ) : (
    <div className="post-details">
      <div className="post-details__block">
        <h1 className="post-details__title">{title}</h1>
        <div className={offer ? 'post-details__subheading-block--offer' : 'post-details__subheading-block--seeking'}>
          <h2 className="post-details__subheading">
            {filterOptions.find((filter) => filter.value === category).label}
          </h2>
          {isCurrentUser && (
            <div className="post-details__button-wrapper">
              <button
                type="button"
                className={offer === 1 ? 'post-details__edit-button--offer' : 'post__edit-button--seeking'}
              >
                Edit Post
              </button>
              <button
                type="button"
                onClick={() => deletePost(match.params.id)}
                className="post-details__icon-wrapper"
              >
                <img
                  src={TrashIco}
                  alt="trash icon"
                  className={offer === 1 ? 'post-details__icon--offer' : 'post__icon--seeking'}
                />
              </button>
            </div>
          )}
        </div>
        <div className="post-details__frame">
          <Link
            to={`user/${usersId}`}
            className="post-details__card--avatar"
          >
            <img
              src={avatarUrl}
              alt="user avatar"
              className="post-details__avatar"
            />
            <h2>{firstName}</h2>
          </Link>
          <div className="post-details__card">
            <h2 className="post-details__body">{description}</h2>
            <p className="post-details__label">
              posted:
              {' '}
              {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;