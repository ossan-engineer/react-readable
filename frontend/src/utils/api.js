import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Authorization: 'whatever-you-want',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const get = url => apiClient.get(url);

const post = (url, data) => apiClient.post(url, data)
  .then(res => console.log(res))
  .catch(err => console.log(err));

const api = {
  get,
  post,
};


export default api;
