/**
 * 全局函数
 * 用法：Vue.funcName() 或 this.funcName()
 */
exports.install = function(Vue, options) {
  // 简易权限判断（党员可读、微信可读、所有人可读）
  Vue.prototype.hasPower = allow => {
    let hasPower = false;
    let userSystem = sessionStorage.userSystem
      ? JSON.parse(sessionStorage.userSystem)
      : { ID: '' };
    let userWechat = sessionStorage.userWechat
      ? JSON.parse(sessionStorage.userWechat)
      : { OpenId: '' };
    // console.log(userSystem, userWechat);
    switch (allow) {
      case 'member':
        if (userSystem.ID) {
          hasPower = true;
        }
        break;
      case 'wechat':
        if (userWechat.OpenId) {
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

  // 从 sessionStorage 中取出 SESSION
  Vue.prototype.session = item => {
    return sessionStorage[item] ? JSON.parse(sessionStorage[item]) : {};
  };

  // 是否身份证号
  Vue.prototype.isIdCardNo = string => {
    var id = string;
    var a = id.toUpperCase().split('');
    var c = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(',');
    var d = '10X98765432'.split('');
    var s = 0;
    var l = a.length;
    var v = a[l - 1];
    var n = /^\d{6}(18|19|20)\d{2}[01]\d[0123]\d\d{3}(\d|X|x)$/i.test(id); // 18位验证
    var f = /^\d{6}\d{2}[01]\d[0123]\d\d{3}$/i.test(id); // 15位验证
    for (var i = 0; i < l - 1; i++) {
      s += a[i] * c[i];
    }
    var r = s % 11;
    r = d[r];
    return f || (n && r === v); // 通过15位正则 或者 （通过18位正则并且校验码正确）
  };

  // 是否微信内置浏览器（router.js里也有类似的功能，见 router.getLoginUrl）
  // Vue.prototype.isWechat = () => {
  //   return navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
  // };

  // 获取URL坡地中的参数
  Vue.prototype.getUrlParam = name => {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(
      window.location.href
    );
    return results && results[1] ? results[1] : '';
  };
};
