/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import apiUtils from '../../utils/apiUtils';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import './Dashboard.scss';


class Dashboard extends Component {
  state = {
    offers: [],
    seeking: [],
    volunteer: false
  }

  componentDidMount() {
    this.fetchPosts();
  }

  // Fetch posts from the DB
  fetchPosts = () => {
    // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
    apiUtils
      .getAllPosts()
      .then(posts => {
        // Update state with fetched posts
        this.setState({
          posts: posts.data,
          offers: posts.data.filter(post => post.offer === 1),
          seeking: posts.data.filter(post => post.offer === 0),
        });

        apiUtils.getProfile()
          .then(user => {
            user.data.volunteer.toLowerCase() === 'true' ? this.setState({ volunteer: true }) : this.setState({ volunteer: false });
          })
          .catch(err => {
            console.log('Error fetching posts:', err);
          })
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  render() {
    return (
      <section className="posts-page">
        <h1>Posts</h1>

        {/*
          Create new post component.
          Note the passed prop that allows it to re-fetch the posts after new one is created
        */}

        <CreatePost
          onPostCreate={this.fetchPosts}
          history={this.props.history} />

        <div className='list-block'>
          <div className={` ${this.state.volunteer ? 'second' : 'first'}`}>
            <h3 className=''>Currently Available:</h3>
            {/* Render a list of offer's Post components specifically offering assistance */}
            {this.state.offers.map(post =>
              <Post
                key={post.post_id}
                post={post}
              />)}
          </div>
          <div className={` ${this.state.volunteer ? 'first' : 'second'}`}>
            <h3 className=''>Seeking A Hand:</h3>
            {/* Render a list of Post components specifically seeking assistance */}
            {this.state.seeking.map(post =>
              <Post
                key={post.post_id}
                post={post}
              />)}
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
