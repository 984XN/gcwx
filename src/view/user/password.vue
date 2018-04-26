<template>
  <div class="page-user-password">
    <group title="修改密码">
      <x-input title="旧密码" v-model="user.password0" :min="6" placeholder="正在使用的密码" type="password"></x-input>
      <x-input title="新密码" v-model="user.password1" :min="6" placeholder="输入新密码" type="password"></x-input>
      <x-input title="新密码" v-model="user.password2" :min="6" placeholder="再次输入新密码" type="password"></x-input>
    </group>
    <div class="weui-cells__tips">密码最短6个字符</div>
    <div style="padding:15px;">
      <x-button @click.native="save" type="warn" :disabled="!enable">修改</x-button>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      user: {
        password0: '',
        password1: '',
        password2: ''
      }
    };
  },
  computed: {
    enable() {
      let enable = true;
      let self = this;
      if (
        self.user.password0 === '' ||
        self.user.password1 === '' ||
        self.user.password2 === ''
      ) {
        enable = false;
      }
      return enable;
    }
  },
  methods: {
    save() {
      let self = this;
      if (self.user.password0.length < 6 || self.user.password1.length < 6) {
        self.$vux.toast.show({
          text: '密码最短需要6位',
          type: 'warn',
          time: 2000,
          width: '10em'
        });
        return false;
      }
      if (self.user.password1 !== self.user.password2) {
        self.$vux.toast.show({
          text: '两次新密码不一致',
          type: 'warn',
          time: 2000,
          width: '10em'
        });
        return false;
      }
      api
        .password({
          OldLoginPWD: self.user.password0,
          NewLoginPWD: self.user.password1
        })
        .then(res => {
          // console.log('password:', res);
          if (res.StatusCode === 1200) {
            self.$vux.toast.show({
              text: '密码修改成功',
              time: 1000,
              onHide() {
                self.$router.replace({ path: '/user' });
              }
            });
          } else {
            self.$vux.alert.show({
              title: '修改失败',
              content: res.Message || '未知错误',
              buttonText: '好的'
            });
          }
        });
    }
  }
};
</script>
