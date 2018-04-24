import service from 'src/api';

export const login = params => {
  // console.log('params:', params);
  return (
    service
      .post('/api/Sys/SysUser/LoginV2', params)
      // .post('/api/Sys/SysUser/LoginByWeChat', params)
      .then(res => res.data)
  );
};

export const getWechatUserInfoByCode = params => {
  // console.log('params:', params);
  return (
    service
      .post('/api/Sys/SysUser/GetWechatUserInfo', params)
      // .post('/api/Sys/SysUser/LoginByWeChat', params)
      .then(res => res.data)
  );
};

export default {
  login,
  getWechatUserInfoByCode
};
