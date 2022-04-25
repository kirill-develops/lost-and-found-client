/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable sort-imports */
import './CreatePost.scss';
import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import isProfileComplete from '../../utils/isProfileComplete';
import LoginButton from '../LoginButton/LoginButton';
import { dropdownCategoryOptions } from '../../utils/constants';

const CreatePost = ({
  userData,
  onPostCreate,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [offer, setOffer] = useState(userData.volunteer);
  const [hasSubmitted, toggleSubmitted] = useState(false);
  const [makePost, toggleMakePost] = useReducer(
    (checked) => !checked,
    false,
  );

  const handleFormSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    // Create a postObj with state value's from each field
    (!title || !description || !category || !isLoggedIn || !offer) ? (
      toggleSubmitted(true)
    ) : (
      apiUtils.addPost({
        title,
        description,
        category,
        offer,
      })
        .then(() => {
          // Re-fetch all posts
          onPostCreate();
          // reset the form values
          toggleSubmitted(false);
          toggleMakePost();
        })
        .catch((err) => {
          console.log('Error creating a new post:', err);
        })
    );
  };

  useEffect(() => {
    // checks to see if user's profile is complete
    // if the user's profile is incomplete, send them to the profile page
    (userData.id && !isProfileComplete(userData))
      ? navigate('/profile') : setLoggedIn(true);
    // check to see if user is a volunteer and change state accordingly
    userData.volunteer
      && userData.volunteer.toLowerCase() === 'true'
      ? setOffer(true) : setOffer(false);
  }, [userData, navigate]);

  return makePost ? (
    <div className="post-form">
      <div className="slide-inelliptic-bottom-bck">
        <div className="post-form__block">
          <button
            type="button"
            onClick={toggleMakePost}
            onKeyUp={(e) => e.key === 'Escape' && toggleMakePost}
            className="post-form__close-ico-wrapper"
          >
            <img
              src={closeIco}
              alt="close icon"
              className="post-form__close-ico"
            />
          </button>
          <h3 className="post-form__title">
            {/* check to see if user is volunteer and produce proper heading  */}
            {userData.volunteer
              ? 'Create New Offer' : 'What Can We Connect You With?'}
          </h3>
          <div className={userData.volunteer
            ? 'post-form__filler--offer' : 'post-form__filler--seeking'}
          />
          <form
            onSubmit={handleFormSubmit}
            className="post-form__form"
          >
            <div className="post-form__form-block">
              <div className="post-form__field">
                <label className="post-form__label">
                  BRIEF TITLE*
                  {!title && hasSubmitted
                    && <span className="post-form__label--error"> This field is required</span>}
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    maxLength="75"
                    className={`post-form__field ${!title && hasSubmitted
                      && 'post-form__field--error'}`}
                  />
                </label>
              </div>
              <div className="post-form__field">
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label className="post-form__label">
                  CATEGORY*
                  {!category && hasSubmitted
                    && <span className="post-form__label--error"> This field is required</span>}
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.value)}
                    options={dropdownCategoryOptions}
                    menuPlacement="auto"
                    menuShouldBlockScroll
                    className={`post-form__field ${!category && hasSubmitted
                      && 'post-form__field--error'}`}
                  />
                </label>
              </div>
              <div className="post-form__field">
                <label className="post-form__label">
                  DESCRIPTION*
                  {!description && hasSubmitted
                    && <span className="post-form__label--error"> This field is required</span>}
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className={`post-form__field ${!description && hasSubmitted
                      && 'post-form__field--error'}`}
                  />
                </label>
              </div>
            </div>
            <div className="post-form__button-block">
              <button
                type="submit"
                className="post-form__button--submit"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={toggleMakePost}
                className="post-form__button--cancel"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <section className="create-post">
      {
        isLoggedIn ? (
          // If user is logged in, render form for creating a post
          <button
            type="button"
            onClick={toggleMakePost}
            className="create-post__button"
          >
            create post
          </button>
        ) : (
          // If user is not logged in, render login button
          <>
            <p className="create-post__button-label">
              <strong>
                Login to create your own posts.
              </strong>
            </p>
            <LoginButton />
          </>
        )
      }
    </section>
  );
};

export default React.memo(CreatePost);
