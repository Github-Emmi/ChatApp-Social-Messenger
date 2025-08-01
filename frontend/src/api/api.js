import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('access');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Sending token:', token);
  }
  return req;
});


export const fetchPosts = () => API.get('/posts/');
export const likePost = (postId) => API.post(`/posts/${postId}/like/`);
export const commentPost = (postId, text) => API.post(`/posts/${postId}/comments/`, { text });
export const login = (username, password) => API.post('/token/', { username, password });
export const register = (data) => API.post('/register/', data);

export const fetchProfile = (userId) =>
  API.get(`/users/${userId}/`);