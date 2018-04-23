import Vue from 'vue';
// import { AlertPlugin } from 'vux';
import axios from 'axios';
import router from 'src/router';
// Vue.use(AlertPlugin);

const service = axios.create({
  timeout: 5000
});

const STATUS_CODE = {
  HTTP: {
    401: '身份未验证',
    403: '服务器拒绝请求',
    404: '服务器找不到请求的网页',
    405: '请求中指定的方法被禁止',
    406: '无法使用请求的内容特性响应请求的网页',
    407: '请求者未授权使用代理',
    408: '服务器等候请求时发生超时',
    409: '服务器在完成请求时发生冲突服务器必须在响应中包含有关冲突的信息',
    410: '如果请求的资源已永久删除，服务器就会返回此响应',
    411: '服务器不接受不含有效内容长度标头字段的请求',
    412: '服务器未满足请求者在请求中设置的其中一个前提条件',
    413: '服务器无法处理请求，因为请求实体过大，超出服务器的处理能力',
    414: '请求的 URI（通常为网址）过长，服务器无法处理',
    400: '服务器不理解请求的语法',
    415: '请求的格式不受请求页面的支持',
    416: '如果页面无法提供请求的范围，则服务器会返回此状态代码',
    417: '服务器未满足”期望”请求标头字段的要求。',
    429: '请求过多',
    431: '请求头字段太大',
    500: '服务器内部错误，无法完成请求',
    501: '服务器不具备完成请求的功能例如，服务器无法识别请求方法时可能会返回此代码',
    502: '服务器作为网关或代理，从上游服务器收到无效响应',
    503: '服务器目前无法使用（由于超载或停机维护）通常，这只是暂时状态',
    504: '服务器作为网关或代理，但是没有及时从上游服务器收到请求',
    505: '服务器不支持请求中所用的 HTTP 协议版本',
    511: '要求网络认证'
  },
  SYSTEM: {
    10001: '请先登录' // 此 code 仅用于占位 201804231118
  }
};

function getStatusText(code, type) {
  let text = '未知状态码';
  if (STATUS_CODE[type][code] !== undefined) {
    text = STATUS_CODE[type][code];
  }
  return text;
}

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    // console.log('response.data:', response.data); // 由服务器提供的响应
    // console.log('response.status:', response.status); // 来自服务器响应的 HTTP 状态码
    // console.log('response.statusText:', response.statusText); // 来自服务器响应的 HTTP 状态信息
    // console.log('response.headers:', response.headers); // 服务器响应的头
    // console.log('response.config:', response.config); // 为请求提供的配置信息
    return response;
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      let statusText = getStatusText(error.response.status, 'HTTP');
      let statusCode = error.response.status;
      Vue.$vux.confirm.show({
        title: '出错了',
        content: statusText + ' [' + statusCode + ']',
        cancelText: '返回上一页',
        confirmText: '寻求帮助',
        onConfirm: function() {
          let feedbackData = { ...error };
          console.log(
            '系统 ' + statusCode + ' 错误，转到系统反馈页',
            feedbackData
          );
          router.push({ name: 'feedback', params: feedbackData });
        },
        onCancel: function() {
          router.go(-1);
        }
      });
      // alert(error.response.status);
      // console.log('error.response.data:', error.response.data);
      // console.log('error.response.status:', error.response.status);
      // console.log('error.response.headers:', error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      Vue.$vux.alert.show({
        title: '未知错误',
        content: error.message
      });
      // alert(error.message);
      console.log('未知错误:', error);
    }
    return Promise.reject(error);
  }
);

export default service;
