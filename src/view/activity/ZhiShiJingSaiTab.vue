<template>
  <tab v-model="tabIndex">
    <tab-item selected @on-item-click="switchTab('list')">竞赛列表</tab-item>
    <tab-item @on-item-click="switchTab('order')">竞赛排名</tab-item>
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
      let path = '/activity/zhishijingsai/' + to;
      console.log(path);
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      if (target.path === '/activity/zhishijingsai/list') {
        this.tabIndex = 0;
      } else if (target.path === '/activity/zhishijingsai/order') {
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
