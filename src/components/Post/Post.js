/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';
import './Post.scss';

const Post = ({ post }) => {

  const categoryArr = [
    ['jobs', 'Jobs'],
    ['employment_services', 'Employment Services'],
    ['housing', 'Housing'],
    ['on-boarding', 'On-boarding'],
    ['translations', 'Translations'],
    ['goods', 'Free Goods'],
    ['transportation', 'Transportation']
  ];

  // convert post.category to nicely formated font
  const category = categoryArr.find(category => category[0] === post.category);

  const formatTimestamp = timestamp => {
    // Return the post timestamp formatted as 'month/day/year, hr:min:sec'
    return (new Date(timestamp)).toLocaleString('en-US')
  };

  return (
    <article className="post">
      <Link to={`/post/${post.post_id}`} className='post__link'>
        <div className={post.offer === 1 ? "post__title-block--offer" : "post__title-block--seeking"}>
          <h2 className="post__title">
            {category[1]}</h2>
          {// Show a "Your Post" label for posts that have been created by currently logged in user
            post.isCurrentUser &&
            <div className="post__owned">Your Post</div>}
        </div>
        <div className="post__block">
          <h3 className="post__subheading">{post.title}</h3>
          <div className="post__details">
            <div className="post__author">
              <img
                className="post__avatar"
                src={post.avatar_url}
                alt={`${post.first_name} avatar`}
              />
              <h3 className="post__username">{post.first_name}</h3>
              <p className="post__city">{post.city}, {post.province}</p>
            </div>
          </div>
          <p className="post__published">{formatTimestamp(post.updated_at)}</p>
          <p className="post__content">{post.description}</p>
        </div>
      </Link>
    </article>
  );
};

export default Post;