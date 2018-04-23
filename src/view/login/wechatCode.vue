<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">登录中</div>
      <div class="process">正在获取openid</div>
    </div>
  </div>
</template>

<script>
// import { Server, Wechat } from 'src/config';

export default {
  mounted() {
    console.log(this.$route, this.$router);

    // // 获取 code
    // let codeUrl =
    //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    //   Wechat.appid +
    //   '&redirect_uri=' +
    //   Wechat.redirect_uri +
    //   '&response_type=code&scope=' +
    //   Wechat.scope +
    //   '&state=' +
    //   Wechat.state +
    //   '#wechat_redirect';
    // window.location.href = codeUrl;
  }
};
</script>

<style lang="stylus" scoped>
.login-wechat {
  height 100%
  background-color #fff
  display flex
  justify-content center
  align-items center
  .tipBox {
    padding 10px
    text-align center
    width 50vw
    position relative
    margin-top -40vh
    i {
      font-size 120px
      line-height 1
      color rgb(81, 195, 50)
    }
    .text {
      font-size 18px
    }
    .process {
      color #999
      text-align center
      font-size 12px
    }
  }
}
</style>
