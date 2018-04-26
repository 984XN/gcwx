<template>
  <div class="login-browser">
    <group title="登录">
      <x-input title="帐号" v-model="user.username" :icon-type="usernameValid" novalidate></x-input>
      <x-input title="密码" v-model="user.password" :icon-type="passwordValid" novalidate type="password"></x-input>
      <x-input title="验证码" v-model="user.vcode" :icon-type="passwordValid" novalidate class="vcode">
        <img slot="right-full-height" src="/api/Sys/SysUser/GetValidateCode" onclick="this.src=this.src+'?'+Math.random()">
      </x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="loginFn" type="warn">登录</x-button>
      <div class="error" center show-icon v-if="errMessage" @click="clearMessage" :closable="false">{{errMessage}}</div>
      <div class="version">GCDJ1.0 (180419)</div>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      user: {
        vcode: '',
        username: localStorage.getItem('username') || 'admin',
        password: '21192X'
      },
      usernameValid: '',
      passwordValid: '',
      errMessage: '',
      random: Math.floor(Math.random(0, 1) * 3)
    };
  },
  methods: {
    clearMessage() {
      this.errMessage = '';
    },
    loginFn() {
      // 记住用户名
      localStorage.setItem('username', this.user.username);
      // JS验证
      if (!this.user.username || !this.user.password) {
        this.errMessage = ' 帐号和密码不能为空 ';
        sessionStorage.logined = 0;
      } else {
        // // api 验证
        // // 转到登录前的页面
        let jumpTo = this.$route.query.redirect || '/article';
        let self = this;
        self.$vux.loading.show({
          text: '正在登录'
        });
        api
          .login({
            ValidateCode: self.user.vcode,
            LoginName: self.user.username,
            LoginPWD: self.user.password
          })
          .then(res => {
            self.$vux.loading.hide();
            sessionStorage.clear();
            if (res.success === true) {
              console.log('登录成功');
              sessionStorage.logined = 1;
              sessionStorage.userSystem = JSON.stringify(
                res.Data.UserInfo || { UserInfo: false }
              );
              sessionStorage.userWechat = JSON.stringify(
                res.Data.WechatUserInfo || { WechatUserInfo: false }
              );
              // this.$store.commit('setSystemUserInfo', res.Data.UserInfo);
              this.$router.push({ path: jumpTo });
            } else {
              self.errMessage = res.Message;
              console.log('登录失败:', res.Message);
            }
          });
      }
    }
  },
  computed: {},
  mounted() {
    console.log('wechatBrowser:', this.$route);
  }
};
</script>

<style lang="stylus" scoped>
.error {
  width 100%
  padding 8px 16px
  margin 10px 0
  box-sizing border-box
  border-radius 4px
  position relative
  overflow hidden
  opacity 1
  transition opacity 0.2s
  background-color #fef0f0
  color #f56c6c
  text-align center
}
.version {
  font-size 12px
  text-align center
  padding 10px
  color #999
}
</style>
