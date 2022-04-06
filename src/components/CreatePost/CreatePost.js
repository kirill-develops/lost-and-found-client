/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Select from 'react-select';
import apiUtils from '../../utils/apiUtils';
import LoginButton from '../LoginButton/LoginButton';
import closeIco from '../../assets/icons/x_close.svg';
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
class CreatePost extends Component {
  state = {
    isLoggedIn: false,
    category: "",
    volunteer: false,
    makePost: false,
  }

  // Create a change handler for all inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Create a change handler for dropdown
  handleSelectMenu = (e) => {
    this.setState({
      category: e.value,
    });
  };

  handleCancel = () => {
    this.setState({ makePost: false });
  }

  // check to see if the user has previously logged in by confirming they have
  // the mandatory form fields filled out
  isProfileComplete = (user) => {
    if (!user.city || !user.phone || !user.province || !user.volunteer) {
      return false;
    }
    return true;
  }

  handleFormSubmit = e => {
    // todo form validation
    // prevent page reload
    e.preventDefault();
    // Deconstruct Event Target's by attribute name
    const { title, description, category } = e.target;
    // Create a postObj with event target value's from each field
    const postObj = {
      title: title.value,
      description: description.value,
      category: category.value,
      offer: this.state.volunteer,
    }
    apiUtils.addPost(postObj)
      .then(() => {
        // Re-fetch all posts
        this.props.onPostCreate();
        // reset the form values
        e.target.reset();
        this.setState({ makePost: false })
      })
      .catch(err => {
        console.log('Error creating a new post:', err);
      })
  }

  componentDidMount() {
    // Check if user is currently logged in, so we can display a form or login button conditionally
    apiUtils
      .getProfile()
      .then(res => {
        // checks to see if user is a volunteer or not and change state accordingly
        if (res.data && this.isProfileComplete(res.data)) {
          res.data.volunteer.toLowerCase() === 'true' ?
            this.setState({
              isLoggedIn: true,
              volunteer: true
            })
            : this.setState({
              isLoggedIn: true,
              volunteer: false
            })
        }
        // if the user's profile is incomplete, send them to the profile page
        else if (!this.isProfileComplete(res.data)) {
          this.props.history.push('/profile');
        }
      });
  }

  toggleNewPost = () => {
    const newState = !this.state.makePost;
    this.setState({ makePost: newState })
  }

  render() {

    if (this.state.makePost)
      return (
        <div className='post-form'>
          <div className='slide-inelliptic-bottom-bck'>
            <div className="post-form__block">
              <img
                onClick={this.handleCancel}
                src={closeIco}
                alt='close icon'
                className='post-form__close-ico' />
              <h3 className='post-form__title'>
                {/* check to see if user is volunteer and produce proper heading  */}
                {this.state.volunteer ? 'Create New Offer' : 'What Can We Connect You With?'}
              </h3>
              <div className={this.props.isOffer ? 'post-form__filler--offer' : 'post-form__filler--seeking'}></div>
              <form className="post-form__fields" onSubmit={this.handleFormSubmit}>
                <div className="post-form__fields-block">
                  <div className="post-form__field">
                    <label
                      htmlFor="title"
                      className="post-form__label">
                      Brief Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      maxLength="75"
                      required
                    />
                  </div>
                  <div className="post-form__field">
                    <label
                      htmlFor="postContent"
                      className="post-form__label">
                      Category</label>
                    <Select
                      name='category'
                      onChange={this.handleSelectMenu}
                      options={dropdownOptions}
                      menuPlacement="auto"
                      menuShouldBlockScroll={true}
                    />
                  </div>
                  <div className="post-form__field">
                    <label
                      htmlFor="description"
                      className="post-form__label">
                      Description</label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      required
                    />
                  </div>
                </div>
                <div className='post-form__button-block'>
                  <button className='post-form__button--submit'>SUBMIT</button>
                  <button
                    onClick={this.handleCancel}
                    className='post-form__button--cancel'>CANCEL</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );

    return (
      <section className="create-post">
        {
          this.state.isLoggedIn ? (
            <>
              {/* If user is logged in, render form for creating a post */}
              <button className='create-post__button' onClick={this.toggleNewPost}>create post</button>
            </>
          ) : (
            // If user is not logged in, render login button
            <>
              <p className='create-post__button-label'><strong>Login to create your own posts.</strong></p>
              <LoginButton />
            </>
          )
        }
      </section>
    );
  }
}

export default CreatePost;