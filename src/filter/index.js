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
  let ts = 0;
  var now = new Date().getTime();
  if (typeof time === 'string') {
    ts = new Date(Date.parse(time.replace(/-/g, '/'))).getTime();
  } else if (!isNaN(parseFloat(time)) && isFinite(time)) {
    // isNumber
    ts = time;
  } else {
    return time;
  }
  var span = now - ts;
  var seconds = (span / 1000).toFixed(0);
  if (seconds < -60 * 60 * 24 * 30) {
    str = (-seconds / (60 * 60 * 24 * 30)).toFixed(0) + '月';
  } else if (seconds < -60 * 60 * 24) {
    str = (-seconds / (60 * 60 * 24)).toFixed(0) + '天';
  } else if (seconds < 60) {
    str = '刚刚';
  } else if (seconds < 60 * 60) {
    str = (seconds / 60).toFixed(0) + '分钟前';
  } else if (seconds < 60 * 60 * 24) {
    if (
      (seconds / (60 * 60)).toFixed(0) >= 24 &&
      (seconds / (60 * 60)).toFixed(0) <= 48
    ) {
      str = '昨天';
    } else {
      str = (seconds / (60 * 60)).toFixed(0) + '小时前';
    }
  } else if (seconds < 60 * 60 * 24 * 30) {
    str = (seconds / (60 * 60 * 24)).toFixed(0) + '天前';
  } else if (seconds < 60 * 60 * 24 * 365) {
    str = (seconds / (60 * 60 * 24 * 30)).toFixed(0) + '月前';
  } else {
    // str = (seconds / (60 * 60 * 24 * 365)).toFixed(0) + '年前'; // N年前
    // str = time; // 年月日时分秒
    str = time.substr(0, 10); // 年月日
  }
  return str;
};

const strPad = (str, len, sign = '-', dir = 'before') => {
  let newStr = '';
  str += ''; // 转换为字符串
  len = len < str.length ? str.length : len; // 负值 new Array 时会出错
  if (dir === 'before') {
    // before, after
    newStr = new Array(len - str.length + 1).join(sign) + str;
  } else {
    newStr = str + new Array(len - str.length + 1).join(sign);
  }
  return newStr;
};

const clearStyle = html => {
  html = html.replace(/(&nbsp;|\s|\u3000)/gi, ' '); // 删除空格、空白、全角空格
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

// 秒数转时间
const second2clock = val => {
  // 强制转换为非NAN的数值
  val = parseInt(val);
  val = isNaN(val) ? 0 : val;
  let m = Math.floor(val / 60);
  let s = val % 60;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
};

export default {
  install(Vue) {
    Vue.filter('trim', trim);
    Vue.filter('int', int);
    Vue.filter('substr', substr);
    Vue.filter('textTime', textTime);
    Vue.filter('strPad', strPad);
    Vue.filter('clearStyle', clearStyle);
    Vue.filter('second2clock', second2clock);
  }
};
