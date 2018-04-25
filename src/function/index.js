exports.install = function(Vue, options) {
  Vue.prototype.hasPower = allow => {
    let hasPower = false;
    let userSystem = sessionStorage.userSystem
      ? JSON.parse(sessionStorage.userSystem)
      : { ID: '' };
    let userWechat = sessionStorage.userWechat
      ? JSON.parse(sessionStorage.userWechat)
      : { openid: '' };
    // console.log(userSystem, userWechat);
    switch (allow) {
      case 'member':
        if (userSystem.ID) {
          hasPower = true;
        }
        break;
      case 'wechat':
        if (userWechat.openid) {
          hasPower = true;
        }
        break;
      case 'all':
        hasPower = true;
        break;
    }
    // console.log('hasPower:', allow, hasPower, userSystem, userWechat);
    return hasPower;
  };
};
