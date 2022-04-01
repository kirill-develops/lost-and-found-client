import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getProfile = {
  baseURL: SERVER_URL,
  url: '/auth/profile',
  withCredentials: true,
}

const editProfileConfig = (profileObj) => {
  return ({
    baseURL: SERVER_URL,
    method: 'put',
    url: '/auth/profile',
    withCredentials: true,
    data: profileObj,
  })
}

const getAllPosts = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/post',
  withCredentials: true,
}

const getOnePost = (id) => {
  return ({
    baseURL: SERVER_URL,
    method: 'get',
    url: `/post/${id}`,
    withCredentials: true,
  })
}

const addPostConfig = (postObj) => {
  return ({
    baseURL: SERVER_URL,
    method: 'post',
    url: '/post',
    withCredentials: true,
    data: postObj
  })
}

const editPost = (postId, postObj) => {
  return ({
    baseURL: SERVER_URL,
    method: 'put',
    url: `/post/${postId}`,
    withCredentials: true,
    data: postObj
  })
}

const deletePost = (id) => {
  return ({
    baseURL: SERVER_URL,
    method: 'delete',
    url: `/post/${id}`,
    withCredentials: true,
  })
}

const apiUtils = {
  getProfile: () => axios(getProfile),
  editProfile: (profileObj) => axios(editProfileConfig(profileObj)),

  getAllPosts: () => axios(getAllPosts),
  getPostById: (postId) => axios(getOnePost(postId)),
  addPost: (postObj) => axios(addPostConfig(postObj)),
  editPostById: (postId, postObj) => axios(editPost(postId, postObj)),
  deletePostById: (postId) => axios(deletePost(postId))
};

export default apiUtils;