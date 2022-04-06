/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';
import './PostDetails.scss';

const filterOptions = [
  { value: 'housing', label: 'Housing' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'employment_services', label: 'Employment Services' },
  { value: 'on-boarding', label: 'On-boarding' },
  { value: 'translations', label: 'Translations' },
  { value: 'goods', label: 'Free Goods' },
  { value: 'transportation', label: 'Transportation' },
  { value: '', label: 'All' },
];

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
          timestamp: post.data.updated_at,
          isLoading: false
        });
      })
      .catch(err => {
        console.log('Error fetching posts:', err);
      });
  }

  render() {

    const { avatar_url, category, description, first_name, offer, title, timestamp, isLoading, users_id } = this.state;

    if (isLoading === true) return null;

    return (
      <div className='post-details'>
        <div className='post-details__block'>
          <h1 className="post-details__title">{title}</h1>
          <h2 className={offer ? 'post-details__subheading--offer' : 'post-details__subheading--seeking'}>
            {filterOptions.find(filter => filter.value === category).label}
          </h2>
          <div className='post-details__bottom'>
            <Link to={`user/${users_id}`}>
              <img src={avatar_url} alt='user avatar' className='' />
              <h2>{first_name}</h2>
            </Link>
            <h2>{description}</h2>
          </div>
          <p>posted: {timestamp}</p>
        </div>
      </div>
    )
  }
}

export default PostDetails;
