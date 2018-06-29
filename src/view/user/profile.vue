<template>
  <div class="page-user-profile">
    <group title="基本信息">
      <cell title="姓名" :value="userInfo.Name"></cell>
      <cell title="性别" :value="userInfo.Sex"></cell>
      <cell title="民族" :value="userInfo.Nation"></cell>
      <cell title="出生日期" :value="userInfo.Birthday|substr(0,10,false)"></cell>
      <cell title="学历" :value="userInfo.EducationBackgroundCode"></cell>
      <cell title="联系电话" :value="userInfo.Tel"></cell>
      <cell title="人员类别" :value="userInfo.MemberState"></cell>
      <!-- <cell title="缴费标准" :value=""></cell> -->
      <cell title="工作岗位" :value="userInfo.WorkJobs"></cell>
      <cell title="所在党组织" :value="userInfo.OrganizationName"></cell>
    </group>
    <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
import * as api from 'src/api/user';

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      userInfo: {
        Birthday: '',
        EducationBackgroundCode: '',
        MemberState: '',
        Name: '',
        Nation: '',
        OrganizationName: '',
        PhotoName: '',
        Sex: '',
        Tel: '',
        WorkJobs: ''
      }
    };
  },
  computed: {
    name() {
      let userSystem = sessionStorage.userSystem
        ? JSON.parse(sessionStorage.userSystem)
        : { UserName: '' };
      let userWechat = sessionStorage.userWechat
        ? JSON.parse(sessionStorage.userWechat)
        : { NickName: '' };
      let username = userSystem.UserName;
      let nickname = userWechat.NickName;
      // console.log(userSystem, userWechat, username, nickname);
      return username || nickname;
    }
  },
  mounted() {
    let self = this;
    self.$vux.loading.show({
      text: '获取数据'
    });
    self.$nextTick(() => {
      api.user.member.profile().then(res => {
        self.$vux.loading.hide();
        self.userInfo = res.Data.userInfo || {};
        console.log('api.user.member.profile:', res);
      });
      // .catch(e => {
      //   self.$vux.loading.hide();
      //   self.$vux.confirm.show({
      //     title: '提示',
      //     content: e.message || e.Message || '接口数据错误',
      //     confirmText: '返回上一页',
      //     cancelText: '关闭提示',
      //     onConfirm() {
      //       this.$router.go(-1);
      //     }
      //   });
      // });
    });
  }
};
</script>
