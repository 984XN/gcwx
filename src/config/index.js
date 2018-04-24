export const Server = {
  protocol: 'http:',
  host: 'localhost:8080',
  pathname: '/',
  origin: 'http://localhost:8080/'
};

export const Wechat = {
  appid: 'wxaea78a1e2fe89d49',
  redirect_uri: 'http://gaochengdangjian.dev.honzh.com/#/login/wechat/get-user',
  response_type: 'code',
  scope: 'snsapi_userinfo',
  state: 1
}; // snsapi_base or snsapi_userinfo

export default {
  Server,
  Wechat
};
