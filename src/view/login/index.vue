<template>
  <div class="login">
    <group title="登录">
      <x-input title="帐号" v-model="user.username" :icon-type="usernameValid" novalidate></x-input>
      <x-input title="密码" v-model="user.password" :icon-type="passwordValid" novalidate type="password"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="loginFn" type="warn">登录</x-button>
      <div style="font-size:12px;text-align:center;padding:10px;">更新时间：201804191419</div>
      <div class="error" center show-icon v-if="errMessage" @click="clearMessage" :closable="false">{{errMessage}}</div>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux';
// import * as user from 'src/api/user';

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      user: {
        username: localStorage.getItem('username') || 'admin',
        password: '123456'
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
        sessionStorage.isLogin = 0;
      } else {
        // api 验证
        sessionStorage.isLogin = 1;
        // 转到登录前的页面
        let jumpTo = this.$route.query.redirect || '/article';
        this.$router.push({ path: jumpTo });
      }
      // // 登录
      // this.$Progress.start();
      // let _this = this;
      // user.login(this.login).then(res => {
      //   if (res.status === 1200) {
      //     window.sessionStorage['userInfo'] = JSON.stringify(res.data.userInfo);
      //     if (res.data.popedoms) {
      //       window.sessionStorage['popedoms'] = JSON.stringify(
      //         res.data.popedoms
      //       );
      //       if (this.$route.query.redirect) {
      //         // 跳转到指定链接
      //         this.$router.push({ path: this.$route.query.redirect });
      //       } else {
      //         this.$router.push({ path: '/article' });
      //       }
      //     } else {
      //       _this.errMessage = '当前用户无操作权限，请联系管理员处理！';
      //     }
      //   } else if (res.status === 1100) {
      //     _this.errMessage = res.message;
      //   } else {
      //     _this.errMessage = '登录失败，请联系管理员处理！';
      //   }
      //   _this.$Progress.finish();
      // });
    }
  },
  computed: {},
  mounted() {
    console.log('login.vue mount');
  }
};
</script>

<style lang="stylus">
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
</style>
