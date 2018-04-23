export const Server = {
  protocol: 'http:',
  host: 'localhost:8080',
  pathname: '/',
  origin: 'http://localhost:8080/'
};

export const Wechat = {
  appid: 'wxeb3a2d83f29c5cf6',
  redirect_uri: 'http://gaochengdangjian.dev.honzh.com/#/login/wechat/code',
  response_type: 'code',
  scope: 'snsapi_base',
  state: 1
}; // snsapi_base or snsapi_userinfo

export default {
  Server,
  Wechat
};
