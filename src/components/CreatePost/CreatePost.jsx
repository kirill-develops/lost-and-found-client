/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable sort-imports */
import './CreatePost.scss';
import React, {
  useEffect, useReducer, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import isProfileComplete from '../../utils/isProfileComplete';
import LoginButton from '../buttons/LoginButton/LoginButton';
import { dropdownCategoryOptions } from '../../utils/constants';
import FormButtons from '../buttons/FormButtons/FormButtons';

const CreatePost = ({
  userData,
  toggleFetchPosts,
}) => {
  // initiate Navigation Hook
  const navigate = useNavigate();

  // deconstructing variable from userData for readability
  const { volunteer } = userData;

  // STATE HOOKS for Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [offer, toggleOffer] = useReducer((checked) => !checked, volunteer === 'true');
  // checks to see if user has attempted submitting form with invalid inputs
  const [hasSubmitted, toggleSubmitted] = useState(false);

  const clearState = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    toggleSubmitted(false);
  };

  const [makePost, toggleMakePost] = useReducer((checked) => {
    clearState();
    return !checked;
  }, false);

  const handleFormSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    // Create a postObj with state value's from each field
    (!title || !description || !category || offer === undefined) ? (
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
          toggleFetchPosts();
          // reset the form values
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
    if (userData.id && !isProfileComplete(userData)) navigate('/profile/edit');
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
          <div className="post-form__title-block">
            <h3 className="post-form__title">
              {/* check to see if user is volunteer and produce proper heading  */}
              {offer
                ? 'Create New Offer' : 'What Can We Connect You With?'}
            </h3>
            <button
              type="button"
              onClick={toggleOffer}
              className={offer
                ? 'post-form__button--seeking' : 'post-form__button--offer'}
            >
              {offer
                ? 'Seeking' : 'Offer'}
            </button>
          </div>
          <div className={offer
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
                    // value={category.label}
                    onChange={(e) => setCategory(e.value)}
                    options={dropdownCategoryOptions}
                    blurInputOnSelect
                    captureMenuScroll
                    menuPlacement="auto"
                    menuShouldBlockScroll
                    className={`post-form__field--select ${!category && hasSubmitted
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
            <FormButtons
              handleSubmit={handleFormSubmit}
              handleCancel={toggleMakePost}
            />
          </form>
        </div>
      </div>
    </div>
  ) : (
    <section className="create-post">
      {
        userData.id ? (
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
