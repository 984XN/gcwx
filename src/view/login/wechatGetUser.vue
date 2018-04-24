<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">登录中</div>
      <div class="process">正在获取用户数据</div>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  methods: {
    getParam(name) {
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(
        window.location.href
      );
      return results && results[1] ? results[1] : 0;
    }
  },
  mounted() {
    let code = this.getParam('code');
    api.getWechatUserInfoByCode({ code: code }).then(res => {
      console.log('getWechatUserInfoByCode:', res);
      sessionStorage.logined = 1;
      this.$store.commit('setUserInfo', res.Data);
    });
  }
};
</script>
