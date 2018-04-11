<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar>
      <tabbar-item :link="{path:'/article'}" :selected="'article' == currentTab">
        <img slot="icon" src="/static/img/tab1.png">
        <img slot="icon-active" src="/static/img/tab1_active.png">
        <span slot="label">学习平台</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/activity'}" :selected="'activity' == currentTab">
        <img slot="icon" src="/static/img/tab2.png">
        <img slot="icon-active" src="/static/img/tab2_active.png">
        <span slot="label">互动专区</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/user'}" :selected="'user' == currentTab">
        <img slot="icon" src="/static/img/tab3.png">
        <img slot="icon-active" src="/static/img/tab3_active.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux';
export default {
  data() {
    return {
      currentTab: 'article'
    };
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
};
</script>
