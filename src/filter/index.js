// 去除开头和结尾的空白
const trim = string => {
  return typeof string === 'string' ? string.replace(/(^\s*)|(\s*$)/g, '') : '';
};

// 强制转换为数值
const int = val => {
  // 强制转换为非NAN的数值
  val = parseInt(val);
  return isNaN(val) ? 0 : val;
};

// 字符串截取
const substr = (string, start, length, usetail = true) => {
  var newString = '';
  var prefix = '';
  var suffix = '';
  // 转 String
  if (typeof string !== 'string') {
    string = JSON.stringify(string);
  }
  if (typeof string === 'string') {
    newString = string.substr(start, length);
    // 结尾的省略号
    var idx = string.indexOf(newString);
    if (newString.length < string.substr(idx).length) {
      suffix = '...';
    }
    // 开头的省略号
    if (start < 0 && start > -string.length) {
      prefix = '...';
    }
    // 是否关闭了“添加省略号功能”
    if (!usetail) prefix = suffix = '';
    // 结果
    newString = prefix + newString + suffix;
  }
  return newString;
};

export default {
  install(Vue) {
    Vue.filter('trim', trim);
    Vue.filter('int', int);
    Vue.filter('substr', substr);
  }
};
