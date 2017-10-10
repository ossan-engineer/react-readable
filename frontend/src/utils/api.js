import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Authorization: 'whatever-you-want',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const get = path => apiClient.get(path);

const api = {
  get,
};


export default api;
