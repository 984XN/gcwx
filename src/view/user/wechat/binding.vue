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
      <div class="error" center show-icon v-if="errMessage" @click="clearMessage" :closable="false">{{errMessage}}</div>
      <div class="faq">如果忘记密码请联系你的上级部门</div>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      user: {
        username: localStorage.getItem('username') || '',
        password: ''
      },
      wechat: {
        OpenId: '',
        NickName: ''
      },
      usernameValid: '',
      passwordValid: '',
      errMessage: '',
      idCardNoCheck: string => {
        return {
          valid: this.isIdCardNo(string),
          msg: '请输入正确的身份证号'
        };
      }
    };
  },
  methods: {
    clearMessage() {
      this.errMessage = '';
    },
    binding() {
      let self = this;
      let jumpTo = self.$route.query.redirect || '/article';
      if (!self.user.username || !self.user.password) {
        self.errMessage = ' 帐号和密码不能为空 ';
      } else if (!self.isIdCardNo(self.user.username)) {
        self.errMessage = ' 身份证号不正确 ';
      } else {
        self.$vux.loading.show({
          text: '正在绑定'
        });
        // 存下帐号，修改密码的 isDefaultPassword 要用
        localStorage.setItem('username', self.user.username);
        // console.log('wechat binding...', this.wechat, this.user);
        api.user.wechat
          .bindMember({
            LoginName: self.user.username,
            LoginPWD: self.user.password
          })
          .then(res => {
            self.$vux.loading.hide();
            // console.log('wechatUnbindMember', res);
            if (res.StatusCode === 1200) {
              sessionStorage.binded = true;
              sessionStorage.userSystem = JSON.stringify(res.Data.UserInfo);
              sessionStorage.isDefaultPassword = self.usedDefaultPassword(
                self.user.username,
                self.user.password
              );
              self.$vux.toast.show({
                text: '绑定成功',
                time: 1000,
                onHide() {
                  self.$router.replace({ path: jumpTo });
                }
              });
              // 绑定送积分（后台不能自动加分）
              api.user.wechat.emitBinded();
            } else {
              self.$vux.alert.show({
                title: '绑定出错',
                content: res.Message || '未知错误'
              });
            }
          });
      }
    },
    skip() {
      let self = this;
      let jumpTo = self.$route.query.redirect || '/article';
      if (/^\/activity/.test(jumpTo)) {
        // 互动专区需要绑定党员帐号后才能进入，其它两个（学习平台和个人中心）可以不绑定党员
        self.$vux.confirm.show({
          title: '仅党员可用',
          content: '你没有使用互动专区的权限，请先绑定党员帐号',
          confirmText: '绑定党员',
          cancelText: '转到首页',
          onCancel() {
            self.$router.replace({
              path: '/'
            });
          },
          onConfirm() {
            self.$router.replace({
              path: '/user/wechat/binding?redirect=' + jumpTo
            });
          }
        });
      } else {
        self.$router.push({ path: jumpTo });
      }
    }
  },
  mounted() {
    let self = this;
    let userWechat = self.session('userWechat');
    let userSystem = self.session('userSystem');
    let openid = userWechat.OpenId || '';
    let nickname = userWechat.NickName || '[无名氏]';
    let jumpTo = self.$route.query.redirect || '/article';
    if (openid === '') {
      self.wechat.NickName = '未登录';
      self.$vux.confirm.show({
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
      self.$vux.alert.show({
        title: '已绑定',
        content: '禁止重复绑定，如需要绑定，请先在“个人中心”中解绑这个帐号'
      });
    } else {
      self.wechat.NickName = nickname;
      self.wechat.OpenId = openid;
      // console.log('openid:', openid);
    }
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
.faq {
  font-size 12px
  text-align center
  padding 10px
  color #999
}
</style>
