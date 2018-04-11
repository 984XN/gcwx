<template>
  <tabbar v-model="tabbarIndex">
    <tabbar-item :link="tab.route" v-for="(tab,n) in tabs" :key="n">
      <img slot="icon" :src="tab.icon">
      <img slot="icon-active" :src="tab.iconActive">
      <span slot="label">{{tab.name}}</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
export default {
  data() {
    return {
      tabbarIndex: 2,
      currentTab: 'article',
      tabs: [
        {
          name: '学习平台',
          route: '/article',
          icon: require('src/assets/img/tab1.png'),
          iconActive: require('src/assets/img/tab1_active.png')
        },
        {
          name: '互动专区',
          route: '/activity',
          icon: require('src/assets/img/tab2.png'),
          iconActive: require('src/assets/img/tab2_active.png')
        },
        {
          name: '个人中心',
          route: '/user',
          icon: require('src/assets/img/tab3.png'),
          iconActive: require('src/assets/img/tab3_active.png')
        }
      ]
    };
  },
  components: {
    Tabbar,
    TabbarItem
  },
  mounted() {
    this.$nextTick(function() {
      // 激活路由对应的 tabItem 项
      let tabRoute = this.$route.matched[0].path;
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (tabRoute === this.tabs[i].route) {
          index = i;
          break;
        }
      }
      this.tabbarIndex = index;
      this.$store.commit('setTabbarActive', index);
    });
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
