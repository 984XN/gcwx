/**
 * 全局函数
 * 用法：Vue.funcName() 或 this.funcName()
 */
exports.install = function(Vue, options) {
  // 简易权限判断（党员可读、微信可读、所有人可读）
  Vue.prototype.hasPower = allowRole => {
    let hasPower = false;
    let userSystem = sessionStorage.userSystem
      ? JSON.parse(sessionStorage.userSystem)
      : { ID: '' };
    let userWechat = sessionStorage.userWechat
      ? JSON.parse(sessionStorage.userWechat)
      : { OpenId: '' };
    // console.log(userSystem, userWechat);
    switch (allowRole) {
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
    // console.log('hasPower:', allowRole, hasPower, userSystem, userWechat);
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

  // 当前时间戳
  Vue.prototype.time = (dateString = '') => {
    dateString = dateString.replace(/-/g, '/');
    return Date.parse(dateString || new Date()) / 1000;
  };

  // UUID
  Vue.prototype.uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  /**
   * 时间戳转日期
   * @param format 只支持 'Y-m-d H:i:s','Y-m-d','H:i:s' 三种调用方式
   * @param time 为空时，取当前时间
   * @return 日期格式化的字符串
   */
  Vue.prototype.date = (format, time) => {
    var _temp = time != null ? new Date(time * 1000) : new Date();
    var _return = '';
    if (/Y-m-d/.test(format)) {
      var _day = [
        _temp.getFullYear(),
        addzero(1 + _temp.getMonth()),
        addzero(_temp.getDate())
      ];
      _return = _day.join('-');
    }
    if (/H:i:s/.test(format)) {
      var _time = [
        addzero(_temp.getHours()),
        addzero(_temp.getMinutes()),
        addzero(_temp.getSeconds())
      ];
      _return += ' ' + _time.join(':');
    }
    return _return;
    function addzero(i) {
      if (i <= 9) {
        return '0' + i;
      } else {
        return i;
      }
    }
  };
  // 上传时预览的图片地址
  Vue.prototype.getObjectURL = file => {
    let url = null;
    if (window.createObjectURL !== undefined) {
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  };
  // 再次进入页面时滚动出上次退出时的位置
  Vue.prototype.scrollTo = vm => {
    let self = vm;
    let keepAlive = self.$route.meta.keepAlive || false;
    let path = '';
    let scrollTop = '';
    if (keepAlive) {
      path = self.$route.fullPath || '';
      scrollTop = self.session('scrollTop')[path] || 0;
      // console.log('scrollTo:', path, scrollTop, self.$el);
      let elm = self.$el.querySelector('.container') || self.$el;
      elm.scrollTop = scrollTop;
    }
  };

  Vue.prototype.mutiUploadable = () => {
    // 部分Android手机在微信里的WEB上传功能有问题，华为好像被特殊对待得比较严重
    // [华为的UA] => Mozilla/5.0 (Linux; Android 8.0.0; VKY-AL00 Build/HUAWEIVKY-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/63.0.3239.111 Mobile Safari/537.36 MicroMessenger/6.6.6.1300(0x26060637) NetType/WIFI Language/zh_CN
    let userAgent = navigator.userAgent || '';
    return !/HUAWEI/.test(userAgent);
  };
};
