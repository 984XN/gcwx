<template>
  <div class="page-user-wechat-binding">
    <group title="绑定党员帐号">
      <cell title="微信" :value="wechat.NickName"></cell>
      <x-input title="帐号" v-model="user.username" placeholder="请输入身份证号" :is-type="idCardNoCheck"></x-input>
      <x-input title="密码" v-model="user.password" placeholder="请输入密码" type="password"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="binding" type="warn">绑定</x-button>
      <x-button @click.native="skip" type="default">暂不绑定</x-button>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      user: {
        username: '13018219890221192X',
        password: '21192X'
      },
      wechat: {
        OpenId: '',
        NickName: ''
      },
      idCardNoCheck: string => {
        return {
          valid: this.isIdCardNo(string),
          msg: '请输入正确的身份证号'
        };
      }
    };
  },
  methods: {
    binding() {
      let self = this;
      self.$vux.loading.show({
        text: '正在绑定'
      });
      // console.log('wechat binding...', this.wechat, this.user);
      api
        .wechatBindMember({
          LoginName: self.user.username,
          LoginPWD: self.user.password
        })
        .then(res => {
          self.$vux.loading.hide();
          // console.log('wechatUnbindMember', res);
          if (res.StatusCode === 1200) {
            sessionStorage.binded = true;
            sessionStorage.userSystem = JSON.stringify(res.Data.UserInfo);
            self.$vux.toast.show({
              text: '绑定成功',
              time: 1000,
              onHide() {
                self.$router.replace({ path: '/' });
              }
            });
          } else {
            self.$vux.alert.show({
              title: '绑定出错',
              content: res.Message + ' [' + res.StatusCode + ']'
            });
          }
        });
    },
    skip() {
      this.$router.push({ path: '/' });
    }
  },
  mounted() {
    let userWechat = this.session('userWechat');
    let userSystem = this.session('userSystem');
    let openid = userWechat.OpenId || '';
    let nickname = userWechat.NickName || '[无名氏]';
    let jumpTo = this.$route.query.redirect || '/article';
    let self = this;
    if (openid === '') {
      this.wechat.NickName = '未登录';
      this.$vux.confirm.show({
        title: '需要微信重新授权',
        content: '微信 openid 丢失，需要微信重新授权后才能绑定',
        cancelText: '放弃',
        confirmText: '去授权',
        onConfirm: function() {
          self.$router.push({
            path: '/login/wechat',
            query: { redirect: jumpTo }
          });
        },
        onCancel: function() {
          self.$router.go(-1);
        }
      });
    } else if (userSystem.ID) {
      this.$vux.alert.show({
        title: '已绑定',
        content: '禁止重复绑定，如需要绑定，请先在“个人中心”中解绑这个帐号'
      });
    } else {
      this.wechat.NickName = nickname;
      this.wechat.OpenId = openid;
      // console.log('openid:', openid);
    }
  }
};
</script>
