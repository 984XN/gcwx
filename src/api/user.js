import service from './api';

export const login = params => {
  return service.post('/user/login', params).then(
    res => res.data
  );
};

export default {
  login
};
