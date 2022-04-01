/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import apiUtils from '../../utils/apiUtils';

class PostDetails extends Component {
  state = {
    active: 0,
    avatar_url: '',
    category: '',
    description: '',
    first_name: '',
    isCurrentUser: '',
    offer: '',
    pic_url: '',
    title: '',
    timestamp: '',
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = () => {
    apiUtils
      .getPostById(this.props.match.params.id)
      .then(post => {
        // Update state with fetched post data
        this.setState({
          active: post.data.active,
          avatar_url: post.data.avatar_url,
          category: post.data.category,
          description: post.data.description,
          first_name: post.data.first_name,
          isCurrentUser: post.data.isCurrentUser,
          offer: post.data.offer,
          pic_url: post.data.pic_url,
          title: post.data.title,
          timestamp: post.data.timestamp,
        });
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  render() {

    return (
      <div>PostDetails</div>
    )
  }
}

export default PostDetails;
