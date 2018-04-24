<template>
  <div class="page-user-wechat-binding">
    <group title="绑定微信与帐号">
      <cell title="微信" value="动感超人"></cell>
      <x-input title="帐号" v-model="user.username" placeholder="请输入身份证号"></x-input>
      <x-input title="密码" v-model="user.password" placeholder="请输入密码"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="binding" type="warn">绑定</x-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    binding() {
      console.log('wechat binding...');
    }
  },
  mounted() {
    let openid = this.$store.state.userInfo.wechat.openid;
    let jumpTo = this.$route.query.redirect || '/article';
    let self = this;
    if (openid === '') {
      this.$vux.confirm.show({
        title: '需要微信重新授权',
        content: '微信 openid 丢失，需要微信重新授权后才能绑定',
        cancelText: '放弃',
        confirmText: '去授权',
        onConfirm: function() {
          self.$router.push({ path: '/login/wechat', query: { redirect: jumpTo } });
        },
        onCancel: function() {
          self.$router.go(-1);
        }
      });
    }
  }
};
</script>
