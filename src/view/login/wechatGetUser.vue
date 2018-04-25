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
    let self = this;
    let code = self.getParam('code');
    api.getWechatUserInfoByCode({ code: code }).then(res => {
      console.log('getWechatUserInfoByCode:', res);
      if (res.StatusCode === 1200) {
        sessionStorage.logined = 1;
        sessionStorage.binded = res.Data.IsBinding;
        sessionStorage.userWechat = JSON.stringify(res.Data.WechatInfo);
        // self.$store.commit('setUserInfo', res.Data);
        self.$router.replace({ path: '/' });
      } else {
        let message = res.Message || '登录失败';
        self.$vux.confirm.show({
          title: '登录出错',
          content: message + ' [' + res.StatusCode + ']',
          confirmText: '重新登录',
          cancelText: '返回首页',
          onCancel() {
            self.$router.replace({ path: '/' });
          },
          onConfirm() {
            self.$router.replace({ path: '/login/wechat' });
          }
        });
      }
    });
  }
};
</script>
