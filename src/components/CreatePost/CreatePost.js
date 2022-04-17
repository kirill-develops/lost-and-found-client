/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import LoginButton from '../LoginButton/LoginButton';
import closeIco from '../../assets/icons/x_close.svg';
import isProfileComplete from '../../utils/isProfileComplete';
import './CreatePost.scss';

const dropdownOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'employment_services', label: 'Employment Services' },
  { value: 'on-boarding', label: 'On-boarding' },
  { value: 'translations', label: 'Translations' },
  { value: 'goods', label: 'Free Goods' },
  { value: 'transportation', label: 'Transportation' },
]

const CreatePost = ({ isOffer, onPostCreate, history }) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [volunteer, setVolunteer] = useState(isOffer);
  const [makePost, toggleNewPost] = useReducer(
    (checked) => !checked,
    false
  );

  const handleFormSubmit = e => {
    // todo form validation
    // prevent page reload
    e.preventDefault();
    // Create a postObj with state value's from each field
    const postObj = {
      title: title,
      description: description,
      category: category,
      offer: volunteer,
    }
    apiUtils.addPost(postObj)
      .then(() => {
        // Re-fetch all posts
        onPostCreate();
        // reset the form values
        e.target.reset();
        setMakePost(false);
      })
      .catch(err => {
        console.log('Error creating a new post:', err);
      })
  }

  useEffect(() => {
    // Check if user is currently logged in, so we can display a form or login button conditionally
    apiUtils
      .getProfile()
      .then(res => {
        // checks to see if user's profile is complete
        // if the user's profile is incomplete, send them to the profile page
        (res.data && !isProfileComplete(res.data)) ? history.push('/profile') : setLoggedIn(true);
        // check to see if user is a volunteer and change state accordingly
        res.data.volunteer.toLowerCase() === 'true' ? setVolunteer(true) : setVolunteer(false);
      });
  }, [isLoggedIn])

  if (makePost)
    return (
      <div className='post-form'>
        <div className='slide-inelliptic-bottom-bck'>
          <div className="post-form__block">
            <img
              onClick={() => toggleNewPost}
              src={closeIco}
              alt='close icon'
              className='post-form__close-ico' />
            <h3 className='post-form__title'>
              {/* check to see if user is volunteer and produce proper heading  */}
              {volunteer ? 'Create New Offer' : 'What Can We Connect You With?'}
            </h3>
            <div className={isOffer ? 'post-form__filler--offer' : 'post-form__filler--seeking'}></div>
            <form className="post-form__fields" onSubmit={handleFormSubmit}>
              <div className="post-form__fields-block">
                <div className="post-form__field">
                  <label
                    htmlFor="title"
                    className="post-form__label">
                    Brief Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    maxLength="75"
                    required
                  />
                </div>
                <div className="post-form__field">
                  <label
                    htmlFor="category"
                    className="post-form__label">
                    Category
                  </label>
                  <Select
                    onChange={(e) => setCategory(e.value)}
                    options={dropdownOptions}
                    menuPlacement="auto"
                    menuShouldBlockScroll={true}
                    required
                  />
                </div>
                <div className="post-form__field">
                  <label
                    htmlFor="description"
                    className="post-form__label">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    required
                  />
                </div>
              </div>
              <div className='post-form__button-block'>
                <button className='post-form__button--submit'>
                  SUBMIT
                </button>
                <button
                  onClick={toggleNewPost}
                  className='post-form__button--cancel'>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <section className="create-post">
      {
        isLoggedIn ?
          (
            <>
              {/* If user is logged in, render form for creating a post */}
              <button
                onClick={toggleNewPost}
                className='create-post__button'
              >
                create post
              </button>
            </>

          ) : (

            // If user is not logged in, render login button
            <>
              <p className='create-post__button-label'>
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
}

export default CreatePost;