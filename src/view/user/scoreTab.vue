<template>
  <tab v-model="tabIndex" :scroll-threshold="4" :animate="false" class="menu-sub">
    <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n" :disabled="!hasPower(tab.allow)">
      {{tab.name}}
      <i class="iconfont icon-lock" v-if="!hasPower(tab.allow)"></i>
    </tab-item>
  </tab>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      // rights: ['member','wechat','all'],
      tabs: [
        {
          name: '积分记录',
          allow: 'member',
          route: { path: '/user/score', append: false }
        },
        {
          name: '积分排名',
          allow: 'member',
          route: { path: '/user/score/order', append: true }
        }
      ]
    };
  },
  methods: {
    tabItemClicked(index) {
      let self = this;
      self.$router.replace(self.tabs[index].route);
    },
    setTabItemActive(target) {
      // 定位顶部 tab
      // 1.激活路由对应的 tabItem 项
      let self = this;
      let index = 0;
      for (let i = 0; i < self.tabs.length; i++) {
        if (target.path === self.tabs[i].route.path) {
          index = i;
          break;
        }
      }
      // console.log('tabPos:', index, 'target:', target);
      self.tabIndex = index;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.setTabItemActive(this.$route);
    });
  },
  watch: {
    $route(to) {
      // console.log('\narticle/index.vue watch $route.to', to);
      this.setTabItemActive(to);
    }
  }
};
</script>
