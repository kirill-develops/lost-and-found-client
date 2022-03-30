import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class PostsPage extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.fetchPosts();
  }

  // Fetch posts from the DB
  fetchPosts = () => {
    // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
    axios
      .get(`${SERVER_URL}/posts`, { withCredentials: true })
      .then(posts => {
        // Update state with fetched posts
        this.setState({
          posts: posts.data
        });
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
          // eslint-disable-next-line react/prop-types
          history={this.props.history} />

        {/* Render a list of individual Post components */}
        {this.state.posts.map(post => <Post key={post.post_id} post={post} />)}
      </section>
    );
  }
}

export default PostsPage;
