<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">登录中</div>
      <div class="process">正在获取code</div>
    </div>
  </div>
</template>

<script>
import { Wechat } from 'src/config';

export default {
  mounted() {
    // 获取 code
    let codeUrl =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      Wechat.appid +
      '&redirect_uri=' +
      encodeURIComponent(Wechat.redirect_uri) +
      '&response_type=code&scope=' +
      Wechat.scope +
      '&state=' +
      Wechat.state +
      '#wechat_redirect';
    // console.log(codeUrl);
    window.location.href = codeUrl;
  }
};
</script>
