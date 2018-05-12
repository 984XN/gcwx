export const Wechat = {
  appid: 'wxaea78a1e2fe89d49',
  redirect_uri: 'http://wechat.gczhdj.demo.honzh.com#/login/wechat/get-code',
  response_type: 'code',
  scope: 'snsapi_userinfo',
  state: 1
}; // snsapi_base or snsapi_userinfo

export const System = {
  avatarDefault: '/static/img/avatar.jpg'
};

export default {
  Wechat,
  System
};
