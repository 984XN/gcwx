import service from 'src/api';

export const login = params => {
  return service.post('/api/Sys/SysUser/LoginV2', params).then(res => res.data);
};

export const getWechatUserInfoByCode = params => {
  return service
    .post('/api/Sys/SysUser/GetWechatUserInfo', params)
    .then(res => res.data);
};

export const wechatBindMember = params => {
  return service
    .post('/api/Sys/SysUser/BindPartyMember', params)
    .then(res => res.data);
};

export const wechatUnbindMember = params => {
  return service
    .post('/api/Sys/SysUser/UnBindPartyMember', params)
    .then(res => res.data);
};

export default {
  login,
  getWechatUserInfoByCode,
  wechatBindMember,
  wechatUnbindMember
};
