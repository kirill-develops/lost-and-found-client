import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getProfile = {
  baseURL: SERVER_URL,
  url: '/auth/profile',
  withCredentials: true,
};

const editProfileConfig = (profileObj) => ({
  baseURL: SERVER_URL,
  method: 'put',
  url: '/auth/profile',
  withCredentials: true,
  data: profileObj,
});

const getAProfile = (id) => ({
  baseURL: SERVER_URL,
  method: 'get',
  url: `/auth/profile/${id}`,
  withCredentials: true,
});

const getAllPosts = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/post',
  withCredentials: true,
};

const getOnePost = (id) => ({
  baseURL: SERVER_URL,
  method: 'get',
  url: `/post/${id}`,
  withCredentials: true,
});

const addPostConfig = (postObj) => ({
  baseURL: SERVER_URL,
  method: 'post',
  url: '/post',
  withCredentials: true,
  data: postObj,
});

const editPost = (postId, postObj) => ({
  baseURL: SERVER_URL,
  method: 'put',
  url: `/post/${postId}`,
  withCredentials: true,
  data: postObj,
});

const deletePost = (id) => ({
  baseURL: SERVER_URL,
  method: 'delete',
  url: `/post/${id}`,
  withCredentials: true,
});

const apiUtils = {

  // If user is currently logged in, we will get profile data,
  // if they are not logged in, we will get 401(Unauthorized) that we can handle in `.catch`
  // Note that we need to use `withCredentials` in order to pass the cookie to a server
  getProfile: () => axios(getProfile),
  editProfile: (profileObj) => axios(editProfileConfig(profileObj)),
  getProfileById: (userId) => axios(getAProfile(userId)),

  getAllPosts: () => axios(getAllPosts),
  getPostById: (postId) => axios(getOnePost(postId)),
  addPost: (postObj) => axios(addPostConfig(postObj)),
  editPostById: (postId, postObj) => axios(editPost(postId, postObj)),
  deletePostById: (postId) => axios(deletePost(postId)),
};

export default apiUtils;
