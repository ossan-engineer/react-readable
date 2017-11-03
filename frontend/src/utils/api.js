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

const put = (url, data) => apiClient.put(url, data)
  .then(res => console.log(res))
  .catch(err => console.log(err));

const api = {
  get,
  post,
  put,
};


export default api;
