<template>
  <tab v-model="tabIndex" bar-position="bottom">
    <tab-item selected @on-item-click="switchTab('turntable-score')">积分抽奖</tab-item>
    <tab-item @on-item-click="switchTab('turntable-question')">答题抽奖</tab-item>
  </tab>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    switchTab(to) {
      let path = '/activity/choujiangzhuanqu/' + to;
      console.log(path);
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      if (target.path === '/activity/choujiangzhuanqu/turntable-score') {
        this.tabIndex = 0;
      } else if (target.path === '/activity/choujiangzhuanqu/turntable-question') {
        this.tabIndex = 1;
      } else {
      }
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
