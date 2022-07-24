/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
//! /* eslint-disable no-unused-vars */
import './PostDetails.scss';
import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import {
  Link, Outlet, Route, Routes, useNavigate, useParams,
} from 'react-router-dom';
import { filterPostOptions } from '../../utils/constants';
import apiUtils from '../../utils/apiUtils';
import TrashIco from '../../assets/icons/trash-can-outline.svg';
import BackButton from '../../components/buttons/BackButton/BackButton';
import EditPost from '../../components/EditPost/EditPost';

const PostDetails = ({ toggleFetchPosts }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);

  // STATE HOOKS for Post details
  const [active, setActive] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [usersId, setUsersId] = useState('');
  const [isCurrentUser, setCurrentUser] = useState('');
  const [offer, setOffer] = useState('');
  const [picUrl, setPicUrl] = useState('');
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const postData = { title, description, category };
  const setPostData = (postObj) => {
    setTitle(postObj.title);
    setDescription(postObj.description);
    setCategory(postObj.category);
  };

  const fetchPost = useCallback(() => {
    apiUtils
      .getPostById(id)
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
        setTimestamp(post.data.updated_at);
        setUsersId(post.data.users_id);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching posts:', err);
      });
  }, [id]);

  const deletePost = (byId) => {
    apiUtils
      .deletePostById(byId)
      .then(() => { toggleFetchPosts(); navigate(-1); })
      .catch();
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return isLoading === true ? (
    null
  ) : (
    <div className="post-details">
      <Routes>
        <Route
          path="edit"
          element={(
            <EditPost
              isOffer={offer}
              setOffer={setOffer}
              postData={postData}
              setPostData={setPostData}
              id={id}
              toggleFetchPosts={toggleFetchPosts}
            />
          )}
        />
      </Routes>
      <Outlet />
      <div className="post-details__block">
        <div className="post-details__title-wrapper">
          <BackButton
            to="../dashboard"
          />
          <h1 className="post-details__title">{title}</h1>
        </div>
        <div className={offer
          ? 'post-details__subheading-block--offer' : 'post-details__subheading-block--seeking'}
        >
          <h2 className="post-details__subheading">
            {filterPostOptions
              .find((filter) => filter.value === category).label}
          </h2>
          {isCurrentUser && (
            <div className="post-details__button-wrapper">
              <Link
                to="Edit"
                className={offer === 1
                  ? 'post-details__edit-button--offer' : 'post-details__edit-button--seeking'}
              >
                Edit Post
              </Link>
              <button
                type="button"
                onClick={() => deletePost(id)}
                className="post-details__icon-wrapper"
              >
                <img
                  src={TrashIco}
                  alt="trash icon"
                  className={offer === 1
                    ? 'post-details__icon--offer' : 'post-details__icon--seeking'}
                />
              </button>
            </div>
          )}
        </div>
        <div className="post-details__frame">
          <Link
            to={`../profile/${usersId}`}
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

export default React.memo(PostDetails);
