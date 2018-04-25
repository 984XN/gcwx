<template>
  <div class="page-user-profile">
    <group title="基本信息">
      <cell title="姓名" value="张小三"></cell>
      <cell title="性别" value="男"></cell>
      <cell title="民族" value="汉族"></cell>
      <cell title="出生日期" value="1988-02-17"></cell>
      <cell title="学历" value="研究生"></cell>
      <cell title="联系电话" value="176-3034-6541"></cell>
      <cell title="人员类别" value="正式党员"></cell>
      <cell title="缴费标准" value="200元"></cell>
      <cell title="工作岗位" value="非公有企业工勤岗位"></cell>
      <cell title="所在党组织" value="中共洛阳鸿卓电子信息技术有限公司支部委员会"></cell>
    </group>
    <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {};
  },
  computed: {
    name() {
      let userSystem = sessionStorage.userSystem
        ? JSON.parse(sessionStorage.userSystem)
        : { UserName: '' };
      let userWechat = sessionStorage.userWechat
        ? JSON.parse(sessionStorage.userWechat)
        : { nickname: '' };
      let username = userSystem.UserName;
      let nickname = userWechat.nickname;
      // console.log(userSystem, userWechat, username, nickname);
      return username || nickname;
    }
  }
};
</script>

<style lang="stylus">
.vux-label {
  white-space nowrap
}
</style>
