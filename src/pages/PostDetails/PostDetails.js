/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';
import './PostDetails.scss';

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
    users_id: '',
    isLoading: true,
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = () => {
    apiUtils
      .getPostById(this.props.match.params.id)
      .then(post => {
        console.log(post);
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
          users_id: post.data.users_id,
          timestamp: post.data.timestamp,
          isLoading: false
        });
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  render() {

    const { active, avatar_url, category, description, first_name, isCurrentUser, offer, pic_url, title, timestamp, isLoading, users_id } = this.state;

    if (isLoading === true) return null;

    return (
      <div className='post-details'>
        <h1>{active}</h1>
        <img src={avatar_url} alt='user avatar' className='' />
        <h2>{category}</h2>
        <h2>{description}</h2>
        <Link to={`user/${users_id}`}>
          <h2>{first_name}</h2>
        </Link>
        <h2>{isCurrentUser}</h2>
        <h2>{offer}</h2>
        <h2>{pic_url}</h2>
        <h2>{title}</h2>
        <h2>{timestamp}</h2>
        <h2>{isLoading}</h2>
      </div>
    )
  }
}

export default PostDetails;
