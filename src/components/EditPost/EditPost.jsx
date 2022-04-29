/* eslint-disable sort-imports */
import './EditPost.scss';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import closeIco from '../../assets/icons/x_close.svg';
import { dropdownCategoryOptions } from '../../utils/constants';
import FormButtons from '../buttons/FormButtons/FormButtons';

const EditPost = ({
  isOffer,
  setOffer,
  postData,
  setPostData,
  id,
}) => {
  // duplicates dataSet
  let postObj = { ...postData };
  // Navigation Hook
  const navTo = useNavigate();
  // STATE HOOKS for form
  const [title, setTitle] = useState(postData.title || '');
  const [description, setDescription] = useState(postData.description || '');
  // determine the user's category selection by matching it to a an arr of objs
  // with {values, labels}
  const menuOption = useMemo(() => dropdownCategoryOptions
    .find((option) => option.value === postData.category), [postData.category]);
  const [category, setCategory] = useState(menuOption);
  // function to return opisite value of current Offer status
  const toggleOffer = () => setOffer((checked) => !checked);
  // checker to see if user has attempted to submit and failed
  const [hasSubmitted, toggleSubmitted] = useState(false);

  const handleFormSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    // Create a postObj with state value's from each field
    (!title || !description || !category.value) ? (
      toggleSubmitted(true)
    ) : (
      apiUtils.editPostById(id, postObj = {
        ...{
          title,
          description,
          category: category.value,
          offer: isOffer,
        },
      })
        .then(() => {
          // Update Post Obj
          setPostData(postObj);
          toggleSubmitted(false);
          navTo(-1);
        })
        .catch((err) => {
          console.log('Error creating a new post:', err);
        })
    );
  };

  return (
    <div className="edit-post">
      <div className="slide-inelliptic-bottom-bck">
        <div className="edit-post__block">
          <button
            type="button"
            onClick={() => navTo(-1)}
            className="edit-post__close-ico-wrapper"
          >
            <img
              src={closeIco}
              alt="close icon"
              className="edit-post__close-ico"
            />
          </button>
          <div className="edit-post__title-block">
            <h3 className="edit-post__title">
              {/* check to see if user is volunteer and produce proper heading  */}
              {isOffer
                ? 'Update Offer' : 'Update what you\'re Seeking'}
            </h3>
            <button
              type="button"
              onClick={toggleOffer}
              className={isOffer
                ? 'edit-post__button--seeking' : 'edit-post__button--offer'}
            >
              {isOffer
                ? 'Seeking' : 'Offer'}
            </button>
          </div>
          <div className={isOffer
            ? 'edit-post__filler--offer' : 'edit-post__filler--seeking'}
          />
          <form
            onSubmit={handleFormSubmit}
            className="edit-post__form"
          >
            <div className="edit-post__form-block">
              <div className="edit-post__field">
                <label className="edit-post__label">
                  BRIEF TITLE*
                  {!title && hasSubmitted
                    && <span className="edit-post__label--error"> This field is required</span>}
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    maxLength="75"
                    className={`edit-post__field ${!title && hasSubmitted
                      && 'edit-post__field--error'}`}
                  />
                </label>
              </div>
              <div className="edit-post__field">
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label className="edit-post__label">
                  CATEGORY*
                  {!category && hasSubmitted
                    && <span className="edit-post__label--error"> This field is required</span>}
                  <Select
                    onChange={(e) => setCategory(e)}
                    options={dropdownCategoryOptions}
                    blurInputOnSelect
                    captureMenuScroll
                    menuPlacement="auto"
                    menuShouldBlockScroll
                    className={`edit-post__field ${!category && hasSubmitted
                      && 'edit-post__field--error'}`}
                  />
                </label>
              </div>
              <div className="edit-post__field">
                <label className="edit-post__label">
                  DESCRIPTION*
                  {!description && hasSubmitted
                    && <span className="edit-post__label--error"> This field is required</span>}
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className={`edit-post__field ${!description && hasSubmitted
                      && 'edit-post__field--error'}`}
                  />
                </label>
              </div>
            </div>
            <FormButtons
              handleSubmit={handleFormSubmit}
              handleCancel={() => navTo(-1)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditPost);
