// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';

export const login = params => {
  return service.post('/api/Sys/SysUser/LoginV2', params).then(res => res.data);
};

export const password = params => {
  return service
    .post('/api/Sys/SysUser/UpdatePwd', params)
    .then(res => res.data);
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
  password,
  getWechatUserInfoByCode,
  wechatBindMember,
  wechatUnbindMember
};
