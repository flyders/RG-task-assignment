import axios from 'axios';

// Declaring axios API defaults and baseURL

const api = axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'Content-Type: application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.timeout = 5000;

export default api;
