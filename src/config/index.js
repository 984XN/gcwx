export const ApiServer = {
  protocol: 'http:',
  host: '192.168.0.121:80',
  pathname: '/',
  origin: 'http://192.168.0.121:80/'
};

export const Wechat = {
  appid: 'wxaea78a1e2fe89d49',
  redirect_uri: 'http://gaochengdangjian.dev.honzh.com/#/login/wechat/get-code',
  response_type: 'code',
  scope: 'snsapi_userinfo',
  state: 1
}; // snsapi_base or snsapi_userinfo

export const System = {
  avatarDefault: '/static/img/avatar.jpg'
};

export default {
  ApiServer,
  Wechat,
  System
};
