import { useEffect, useState } from 'react';
import apiUtils from './apiUtils';

const useFetchPosts = (check) => {
  const [offersData, setOffersData] = useState([]);
  const [seekingData, setSeekingData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = () => {
    // Fetch posts from the DB
    apiUtils
      .getAllPosts()
      .then((posts) => {
      // Update state with fetched posts
        setOffersData(posts.data.filter((post) => post.offer === 1));
        setSeekingData(posts.data.filter((post) => post.offer === 0));
      })
      .catch((err) => {
        console.log('Error fetching posts:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [check]);
  return [offersData, seekingData, isLoading];
};

export default useFetchPosts;
