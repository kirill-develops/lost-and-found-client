import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getProfile = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/auth/profile',
}

const editProfile = {
  baseURL: SERVER_URL,
  method: 'put',
  url: '/auth/profile',
}

const getAllPosts = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/post',
}

const getOnePost = (id) => {
  return ({
    baseURL: SERVER_URL,
    method: 'get',
    url: `/post/${id}`,
  })
}

const addPost = {
  baseURL: SERVER_URL,
  method: 'post',
  url: '/post',
}

const editPost = (id) => {
  return ({
    baseURL: SERVER_URL,
    method: 'put',
    url: `/post/${id}`,
  })
}

const deletePost = (id) => {
  return ({
    baseURL: SERVER_URL,
    method: 'delete',
    url: `/post/${id}`,
  })
}

const apiUtils = {
  getProfile: () => axios(getProfile, { withCredentials: true }),
  editProfile: (profileObj) => axios(editProfile, profileObj, { withCredentials: true }),

  getAllPosts: () => axios(getAllPosts, { withCredentials: true }),
  getPostById: (postId) => axios(getOnePost(postId), { withCredentials: true }),
  addPost: (postObj) => axios(addPost, postObj, { withCredentials: true }),
  editPostById: (postId, postObj) => axios(editPost(postId), postObj, { withCredentials: true }),
  deletePostById: (postId) => axios(deletePost(postId), { withCredentials: true })
};

export default apiUtils;