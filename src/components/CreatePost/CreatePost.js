/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import LoginButton from '../LoginButton/LoginButton';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class CreatePost extends Component {
  state = {
    isLoggedIn: false
  }

  isProfileComplete = (user) => {
    if (!user.city || !user.phone || !user.province || !user.volunteer) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    // Check if user is currently logged in, so we can display a form or login button conditionally
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then(res => {
        if (res.data && this.isProfileComplete(res.data)) {
          console.log(res.data);
          this.setState({
            isLoggedIn: true
          });
        } else if (!this.isProfileComplete(res.data)) {
          this.props.history.push('/profile');
        }
      });
  }

  render() {
    return (
      <section className="create-post">
        {
          this.state.isLoggedIn ? (
            // If user is logged in, render form for creating a post
            <form className="post-form" onSubmit={this.handleFormSubmit}>
              <h3>Create New Post</h3>
              <div className="post-form__fields">
                <div className="post-form__field">
                  <label
                    htmlFor="postTitle"
                    className="post-form__label">
                    Post Title</label>
                  <input
                    type="text"
                    name="postTitle"
                    id="postTitle"
                    maxLength="75"
                    required
                  />
                </div>
                <div className="post-form__field">
                  <label
                    htmlFor="postContent"
                    className="post-form__label">
                    Post Content</label>
                  <textarea
                    type="text"
                    name="postContent"
                    id="postContent"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="post-form__submit">🖋️&nbsp;&nbsp;Submit</button>
            </form>
          ) : (
            // If user is not logged in, render login button
            <>
              <p><strong>Login to create your own posts.</strong></p>
              <LoginButton />
            </>
          )
        }
      </section>
    );
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { postTitle, postContent } = e.target;

    // Post to API (remember to use `withCredentials`)
    axios
      .post(
        `${SERVER_URL}/post`,
        {
          title: postTitle.value,
          content: postContent.value
        },
        { withCredentials: true }
      )
      .then(() => {
        // Re-fetch the posts
        this.props.onPostCreate();
        e.target.reset();
      })
      .catch(err => {
        console.log('Error creating a new post:', err);
      })
  }
}

export default CreatePost;