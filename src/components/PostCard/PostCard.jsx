import './PostCard.scss';
import { Link } from 'react-router-dom';
import React from 'react';

const categoryArr = [
  ['jobs', 'Jobs'],
  ['employment_services', 'Employment Services'],
  ['housing', 'Housing'],
  ['on-boarding', 'On-boarding'],
  ['translations', 'Translations'],
  ['goods', 'Free Goods'],
  ['transportation', 'Transportation'],
];

const PostCard = ({ post }) => {
  // convert post.category to nicely formated font
  const category = categoryArr.find((selection) => selection[0] === post.category);

  // Return the post timestamp formatted as 'month/day/year, hr:min:sec'
  const formatTimestamp = (timestamp) => (new Date(timestamp)).toLocaleString('en-US');

  return (
    <article className="post-card">
      <Link to={`/post/${post.post_id}`} className="post-card__link">
        <div className={post.offer === 1 ? 'post-card__title-block--offer' : 'post-card__title-block--seeking'}>
          <h2 className="post-card__title">{category[1]}</h2>
          {/* Show a "Your Post" label for posts that have been created by currently user */}
          {post.isCurrentUser && (
            <div className="post-card__button-wrapper">
              <h4 className={post.offer === 1 ? 'post-card__users--offer' : 'post-card__users--seeking'}>
                Your Post
              </h4>
            </div>
          )}
        </div>
        <div className="post-card__block">
          <div className={post.offer === 1 ? 'post-card__author--offer' : 'post-card__author--seeking'}>
            <img
              className="post-card__avatar"
              src={post.avatar_url}
              alt={`${post.first_name} avatar`}
            />
            <div>
              <h3 className="post-card__username">
                {post.first_name}
                {' '}
                {post.last_name}
              </h3>
              <p className="post-card__published">
                posted:
                {' '}
                {formatTimestamp(post.updated_at)}
              </p>
            </div>
          </div>
          <div className="post-card__details">
            <h3 className="post-card__subheading">
              {post.title}
            </h3>
            <p className={post.offer === 1 ? 'post-card__city--offer' : 'post-card__city--seeking'}>
              {post.city}
              ,
            </p>
            <p className={post.offer === 1 ? 'post-card__city--offer' : 'post-card__city--seeking'}>
              {post.province}
            </p>
            <p className="post-card__body">
              {post.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default React.memo(PostCard);
