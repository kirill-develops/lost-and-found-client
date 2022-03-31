/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import LoginButton from '../LoginButton/LoginButton';
import './CreatePost.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class CreatePost extends Component {
  state = {
    isLoggedIn: false,
    category: "",
    volunteer: false,
  }

  // Create a change handler for all inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  isProfileComplete = (user) => {
    if (!user.city || !user.phone || !user.province || !user.volunteer) {
      return false;
    }
    return true;
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { title, description, category } = e.target;

    // Post to API (remember to use `withCredentials`)
    axios
      .post(
        `${SERVER_URL}/post`,
        {
          title: title.value,
          description: description.value,
          category: category.value,
          offer: this.state.volunteer,
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

  componentDidMount() {
    // Check if user is currently logged in, so we can display a form or login button conditionally
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then(res => {
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
              {this.state.volunteer ? <h3>Create New Offer</h3> : <h3>What Can We Connect You With?</h3>}
              <div className="post-form__fields">
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
                <div className="post-form__field">
                  <label
                    htmlFor="postContent"
                    className="post-form__label">
                    Category</label>
                  <select
                    name='category'
                    value={this.state.category}
                    onChange={this.handleChange}>
                    <option>Please Select</option>
                    <option value='housing'>Housing</option>
                    <option value='jobs'>Jobs</option>
                    <option value='employment Services'>Employment Services</option>
                    <option value='on-boarding'>On-boarding</option>
                    <option value='translations'>Translations</option>
                    <option value='goods'>Free Goods</option>
                    <option value='transportation'>Transportation</option>
                  </select>
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
}

export default CreatePost;