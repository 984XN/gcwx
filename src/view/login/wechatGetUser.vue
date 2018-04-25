<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">{{loadingTitle}}</div>
      <div class="process">{{loadingProcess}}</div>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      loadingTitle: '登录中',
      loadingProcess: '正在等待微信返回数据'
    };
  },
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
    api
      .getWechatUserInfoByCode({ code: code })
      .then(res => {
        console.log('getWechatUserInfoByCode:', res);
        if (res.StatusCode === 1200) {
          let binded = res.Data.IsBinding;
          sessionStorage.logined = 1;
          sessionStorage.binded = binded;
          sessionStorage.userWechat = JSON.stringify(res.Data.WechatUser);
          // self.$store.commit('setUserInfo', res.Data);
          if (binded) {
            self.$router.replace({ path: '/' });
          } else {
            self.$vux.toast.show({
              text: '登录成功',
              time: 1000,
              onHide() {
                self.$router.replace({ path: '/user/wechat/binding' });
              }
            });
          }
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
      })
      .catch(function() {
        self.loadingTitle = '登录失败';
        self.loadingProcess = '中止登录';
      });
  }
};
</script>
