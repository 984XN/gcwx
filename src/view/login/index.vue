<template>
  <div class="login">
    <form>
      <img src="/static/img/logo.png" alt="宜昌党建" class="logo">
      <label class="label">
        <el-input placeholder="请输入帐号" type="text" v-model="user.username">
          <i slot="prefix" class="el-input__icon el-icon-tickets"></i>
        </el-input>
      </label>
      <label class="label">
        <el-input placeholder="请输入密码" type="password" v-model="user.password">
          <i slot="prefix" class="el-input__icon el-icon-document"></i>
        </el-input>
      </label>
      <div class="label">
        <el-button @click="loginFn" type="primary">登录</el-button>
      </div>
      <el-alert :title="errMessage" type="error" center show-icon v-if="errMessage" @click="clearMessage" :closable="false"> </el-alert>
    </form>
  </div>
</template>

<script>
import * as user from '@/api/user';
export default {
  data() {
    return {
      user: {
        username: localStorage.getItem('username') || 'admin',
        password: '123456'
      },
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
        this.errMessage = '用户名和密码不能为空';
        return;
      }
      // 登录
      this.$Progress.start();
      let _this = this;
      user.login(this.login).then(res => {
        if (res.status === 1200) {
          window.sessionStorage['userInfo'] = JSON.stringify(res.data.userInfo);
          if (res.data.popedoms) {
            window.sessionStorage['popedoms'] = JSON.stringify(
              res.data.popedoms
            );
            if (this.$route.query.redirect) {
              // 跳转到指定链接
              this.$router.push({ path: this.$route.query.redirect });
            } else {
              this.$router.push({ path: '/welcome' });
            }
          } else {
            _this.errMessage = '当前用户无操作权限，请联系管理员处理！';
          }
        } else if (res.status === 1100) {
          _this.errMessage = res.message;
        } else {
          _this.errMessage = '登录失败，请联系管理员处理！';
        }
        _this.$Progress.finish();
      });
    }
  },
  computed: {}
};
</script>

<style lang="stylus" src="./login.styl" scoped></style>
