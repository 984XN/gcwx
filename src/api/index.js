import Vue from 'vue';
// import { AlertPlugin } from 'vux';
import axios from 'axios';
import router from 'src/router';
import { API_LIST } from 'src/config/apiList';
// Vue.use(AlertPlugin);

const STATUS_CODE = {
  HTTP: {
    401: '身份未验证',
    403: '你请求的内容服务器不让看',
    404: '服务器找不到你要查看的内容',
    405: '请求中指定的方法被禁止',
    406: '无法使用请求的内容特性响应请求的页面',
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
    503: '服务器目前无法使用（由于超载或停机维护）通常这只是暂时状态',
    504: '服务器作为网关或代理，但是没有及时从上游服务器收到请求',
    505: '服务器不支持请求中所用的 HTTP 协议版本',
    511: '需要网络认证'
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

const service = axios.create({
  timeout: 30000
});

axios.defaults.withCredentials = true;

// respone interceptor
service.interceptors.response.use(
  // 已经请求回来了，转小写也没啥意义了
  // // URL 转小写
  // config => {
  //   let url = config.config.url.toLocaleLowerCase();
  //   config.config.url = url;
  //   return config;
  // },
  // response => response,
  response => {
    // console.log('response:', response); // 由服务器提供的响应
    // console.log('response.data:', response.data); // 由服务器提供的响应
    // console.log('response.status:', response.status); // 来自服务器响应的 HTTP 状态码
    // console.log('response.statusText:', response.statusText); // 来自服务器响应的 HTTP 状态信息
    // console.log('response.headers:', response.headers); // 服务器响应的头
    // console.log('response.config:', response.config); // 为请求提供的配置信息
    let api = response.config.url.replace('/api/', '/');
    let moduleName = API_LIST[api]
      ? API_LIST[api].name
      : '未知模块[' + api + ']';
    // if (response.data.StatusCode) {
    if (response.data.StatusCode >= 200 && response.data.StatusCode <= 299) {
      response.data.StatusCodeOrigin = response.data.StatusCode;
      response.data.StatusCode += 1000;
    } else if (
      response.data.StatusCode === 1500 ||
      response.data.StatusCode === 403
    ) {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.hide();
      Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.alert.show({
        title: '无权访问' + moduleName,
        content: response.data.Message + ' 请联系您的上级部门',
        buttonText: '知道了'
      });
      return Promise.reject(response);
    } else if (
      response.data.StatusCode === 1300 ||
      response.data.StatusCode === 401
    ) {
      Vue.$vux.loading.hide();
      Vue.$vux.alert.hide();
      // Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.confirm.show({
        title: '登录超时',
        content: moduleName + '时服务器回复说“' + response.data.Message + '”',
        cancelText: '关闭提示',
        confirmText: '重新登录',
        onConfirm: function() {
          router.replace({
            path: router.getLoginUrl(),
            query: { redirect: router.currentRoute.fullPath }
          });
        },
        onCancel: function() {
          router.go(-1);
        }
      });
      return Promise.reject(response);
    } else {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.hide();
      Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      let message = response.data.Message
        ? '说“' + response.data.Message + '”'
        : '没有回复';
      let code = response.data.StatusCode || '-';
      Vue.$vux.alert.show({
        title: '应用错误',
        // response.data.Message
        content: moduleName + '时服务器' + message + '[' + code + ']',
        buttonText: '关闭提示'
      });
      return Promise.reject(response);
    }
    // } else {
    //   Vue.$vux.loading.hide();
    //   Vue.$vux.confirm.hide();
    //   Vue.$vux.toast.hide();
    //   Vue.$vux.alert.show({
    //     title: '数据错误',
    //     content: '缺少 StatusCode：' + JSON.stringify(response.data),
    //     buttonText: '知道了'
    //   });
    //   return Promise.reject(response);
    // }
    if (response.data === '') {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.hide();
      Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.alert.show({
        title: '服务器没有回应',
        content:
          '服务器可能心情不好，请求' +
          moduleName +
          '的数据时她没有理咱们，要不等一会再来？',
        buttonText: '知道了'
      });
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      let statusText = getStatusText(error.response.status, 'HTTP');
      let statusCode = error.response.status;
      let api = error.config.url.replace('/api/', '/');
      let moduleName = API_LIST[api]
        ? API_LIST[api].name
        : '未知模块[' + api + ']';
      // 服务器会把登录超时的链接强行302到 '/Home/Login'
      if (
        statusCode === 404 &&
        error.request.responseURL.indexOf('/Home/Login') !== -1
      ) {
        Vue.$vux.confirm.show({
          title: '登录超时',
          content:
            '请求' + moduleName + '时服务器给了个电脑版的登录地址让重新登录',
          cancelText: '关闭提示',
          confirmText: '重新登录',
          onConfirm: function() {
            router.replace({
              path: router.getLoginUrl(),
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });
        return false;
      }
      Vue.$vux.loading.hide();
      Vue.$vux.alert.hide();
      // Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.confirm.show({
        title: moduleName + '出错了',
        content: statusText + ' [' + statusCode + ']',
        // cancelText: '返回上一页',
        cancelText: '关闭提示',
        confirmText: '寻求帮助',
        onConfirm: function() {
          let feedbackData = {
            ...error
          };
          console.log(
            '系统 ' + statusCode + ' 错误，转到系统反馈页',
            feedbackData,
            API_LIST
          );
          router.push({
            name: 'feedback',
            params: feedbackData
          });
        },
        onCancel: function() {
          // router.go(-1);
        }
      });
      // alert(error.response.status);
      // console.log('error.response.data:', error.response.data);
      // console.log('error.response.status:', error.response.status);
      // console.log('error.response.headers:', error.response.headers);
    } else if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.hide();
      Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.confirm.show({
        title: '请求超时',
        content: '请重新操作 [504]',
        cancelText: '刷新再试',
        confirmText: '我知道了',
        onCancel() {
          window.location.reload();
        }
      });
      // alert(error.message);
      console.log('未知错误:', error, error.code);
    } else {
      Vue.$vux.loading.hide();
      // Vue.$vux.alert.hide();
      Vue.$vux.confirm.hide();
      Vue.$vux.toast.hide();
      Vue.$vux.alert.show({
        title: '未知错误',
        content: error.message
      });
      // alert(error.message);
      console.log('未知错误:', error, error.code);
    }
    return Promise.reject(error);
  }
);

export default service;
