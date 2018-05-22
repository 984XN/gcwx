<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">{{loadingTitle}}</div>
      <div class="process">{{loadingProcess}}</div>
      <div>
        <spinner type="ios-small" size="22px"></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { Spinner } from 'vux'
import * as api from 'src/api/user';

export default {
  components: {
    Spinner
  },
  data() {
    return {
      loadingTitle: '登录中',
      loadingProcess: '正在等待微信返回数据'
    };
  },
  mounted() {
    let self = this;
    let code = self.$route.query.code || '';
    let jumpTo = this.$route.query.redirect || '/article';
    console.log('微信登录中…');
    if (!code) {
      self.$router.replace({
        path: '/login/wechat/get-code?redirect=' + jumpTo
      });
    } else {
      api.user.wechat
        .getUserInfoByCode({ code: code })
        .then(res => {
          console.log('getUserInfoByCode:', res);
          sessionStorage.clear();
          if (res.StatusCode === 1200) {
            let binded = res.Data.IsBinding;
            sessionStorage.logined = self.time();
            sessionStorage.binded = binded;
            sessionStorage.userSystem = JSON.stringify(
              res.Data.UserInfo || { UserInfo: false }
            );
            sessionStorage.userWechat = JSON.stringify(
              res.Data.WechatUserInfo || { WechatUserInfo: false }
            );
            // self.$store.commit('setUserInfo', res.Data);
            if (binded) {
              self.$router.replace({ path: jumpTo });
            } else {
              self.$vux.toast.show({
                text: '登录成功',
                time: 1000,
                onHide() {
                  self.$router.replace({ path: '/user/wechat/binding?redirect=' + jumpTo });
                }
              });
            }
          } else {
            self.$vux.confirm.show({
              title: '登录出错',
              content: res.Message || '未知错误',
              confirmText: '重新登录',
              cancelText: '返回首页',
              onCancel() {
                self.$router.replace({ path: '/' });
              },
              onConfirm() {
                self.$router.replace({ path: '/login/wechat/get-code?redirect=' + jumpTo });
              }
            });
          }
        })
        .catch(function() {
          self.loadingTitle = '登录失败';
          self.loadingProcess = '中止登录';
        });
    }
  }
};
</script>
