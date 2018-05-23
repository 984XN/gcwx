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

const textTime = time => {
  var str = '';
  var now = new Date();
  if (typeof time === 'string') {
    time = new Date(Date.parse(time));
  }
  var span = now - time;
  var minutes = (span / 1000).toFixed(0);
  if (minutes < -60 * 60 * 24 * 30) {
    str = (-minutes / (60 * 60 * 24 * 30)).toFixed(0) + '月';
  } else if (minutes < -60 * 60 * 24) {
    str = (-minutes / (60 * 60 * 24)).toFixed(0) + '天';
  } else if (minutes < 60) {
    str = '刚刚';
  } else if (minutes < 60 * 60) {
    str = (minutes / 60).toFixed(0) + '分钟前';
  } else if (minutes < 60 * 60 * 24) {
    if (
      (minutes / (60 * 60)).toFixed(0) >= 24 &&
      (minutes / (60 * 60)).toFixed(0) <= 48
    ) {
      str = '昨天';
    } else {
      str = (minutes / (60 * 60)).toFixed(0) + '小时前';
    }
  } else if (minutes < 60 * 60 * 24 * 30) {
    str = (minutes / (60 * 60 * 24)).toFixed(0) + '天前';
  } else if (minutes < 60 * 60 * 24 * 365) {
    str = (minutes / (60 * 60 * 24 * 30)).toFixed(0) + '月前';
  } else {
    str = (minutes / (60 * 60 * 24 * 365)).toFixed(0) + '年前';
  }
  return str;
};

const strPad = (str, len, sign = '-', dir = 'before') => {
  str = str + ''; // 转换为字符串
  let newStr = '';
  if (dir === 'before') {
    // before, after
    newStr = new Array(len - str.length + 1).join(sign) + str;
  } else {
    newStr = str + new Array(len - str.length + 1).join(sign);
  }
  return newStr;
};

const clearStyle = html => {
  html = html.replace(/&nbsp;/gi, ''); // 删除空格
  html = html.replace(/(<.*?) style=".*?"(>)/gi, '$1$2'); // 删除 style 属性
  html = html.replace(/(<.*?) width=".*?"(>)/gi, '$1$2'); // 删除 width 属性
  html = html.replace(/(<.*?) height=".*?"(>)/gi, '$1$2'); // 删除 height 属性
  html = html.replace(/<br\s*\/?>/gi, ''); // 删除 <br /> <br>
  html = html.replace(/<\w+>\s*<\/\w+>/gi, ''); // 删除空标签
  html = html.replace(/<\w+>\s*<\/\w+>/gi, ''); // 删除第2层空标签
  html = html.replace(/<\w+>\s*<\/\w+>/gi, ''); // 删除第3层空标签
  html = html.replace(/<\w+>\s*<\/\w+>/gi, '');
  // html = html.replace(/(<\/?\w+).*?(>)/gi, '$1$2'); // 删除 html标签中的属性（style=""、width=""）除了 src=""
  // console.log('clearStyle:', html);
  return html;
};

export default {
  install(Vue) {
    Vue.filter('trim', trim);
    Vue.filter('int', int);
    Vue.filter('substr', substr);
    Vue.filter('textTime', textTime);
    Vue.filter('strPad', strPad);
    Vue.filter('clearStyle', clearStyle);
  }
};
