<template>
  <tab v-model="tabIndex">
    <tab-item selected @on-item-click="switchTab('form')">建言献策</tab-item>
    <tab-item @on-item-click="switchTab('records')">历史记录</tab-item>
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
      let path = '/activity/jianyanxiance/' + to;
      console.log(path);
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      if (target.path === '/activity/jianyanxiance/form') {
        this.tabIndex = 0;
      } else if (target.path === '/activity/jianyanxiance/records') {
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
