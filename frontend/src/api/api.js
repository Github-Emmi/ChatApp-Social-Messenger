import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('access');
  
  // Don't attach token to public endpoints
  const publicPaths = ['/register/', '/token/'];
  const isPublic = publicPaths.some(path => req.url.includes(path));

  if (token && !isPublic) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


export const fetchPosts = () => API.get('/posts/');
export const likePost = (postId) => API.post(`/posts/${postId}/like/`);
export const commentPost = (postId, text) => API.post(`/posts/${postId}/comments/`, { text });
export const login = (username, password) => API.post('/token/', { username, password });
export const register = (data) =>
  axios.post(`${process.env.REACT_APP_API_URL}/register/`, data, {
    headers: { 'Content-Type': 'application/json' },
  });

export const fetchProfile = (userId) => API.get(`/users/${userId}/`);