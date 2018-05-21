<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">登录中</div>
      <div class="process">正在向微信申请登录码</div>
    </div>
  </div>
</template>

<script>
import { Wechat } from 'src/config';

export default {
  mounted() {
    // 获取 code
    let code = this.getUrlParam('code');
    let jumpTo = this.$route.query.redirect || '/article';
    if (code) {
      let origin = window.location.origin;
      let pathname = window.location.pathname;
      let url =
        origin +
        pathname +
        '#/login/wechat/get-user?code=' +
        code +
        '&redirect=' +
        jumpTo;
      window.location.href = url;
    } else {
      let jumpToParam =
        Wechat.redirect_uri.indexOf('?') === -1
          ? '?redirect=' + jumpTo
          : '&redirect=' + jumpTo;
      let codeUrl =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        Wechat.appid +
        '&redirect_uri=' +
        encodeURIComponent(Wechat.redirect_uri + jumpToParam) +
        '&response_type=code&scope=' +
        Wechat.scope +
        '&state=' +
        Wechat.state +
        '#wechat_redirect';
      // console.log(codeUrl);
      window.location.href = codeUrl;
    }
  }
};
</script>
