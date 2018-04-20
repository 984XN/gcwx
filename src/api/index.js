import axios from 'axios';

const service = axios.create({
  timeout: 5000
});

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('ERROR:', error); // for debug
    alert(error.message);
    return Promise.reject(error);
  }
);

export default service;
