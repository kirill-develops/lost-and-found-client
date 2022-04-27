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
  offer,
  postData,
  setPostData,
  toggleEditPost,
  id,
}) => {
  const [title, setTitle] = useState(postData.title || '');
  const [description, setDescription] = useState(postData.description || '');
  // determine the user's category selection by matching it to a an arr of objs with
  // {values, labels}
  const menuOption = useMemo(() => dropdownCategoryOptions
    .find((option) => option.value === postData.category), [postData.category]);
  const [category, setCategory] = useState(menuOption);

  const [hasSubmitted, toggleSubmitted] = useState(false);
  const navTo = useNavigate();
  let postObj = { ...postData };

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
          offer,
        },
      })
        .then(() => {
          // Update Post Obj
          setPostData(postObj);
          toggleSubmitted(false);
          navTo('../');
        })
        .catch((err) => {
          console.log('Error creating a new post:', err);
        })
    );
  };

  return (
    <div className="post-form">
      <div className="slide-inelliptic-bottom-bck">
        <div className="post-form__block">
          <button
            type="button"
            onClick={() => navTo(-1)}
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
            {offer ? 'Create New Offer' : 'What Can We Connect You With?'}
          </h3>
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
                    value={category}
                    defaultInputValue={menuOption.label}
                    onChange={(e) => setCategory(e)}
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
            <FormButtons clickHandler={toggleEditPost} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditPost);
