<template>
  <tab v-model="tabIndex">
    <tab-item selected @on-item-click="switchTab('xuexixinde')">学习心得</tab-item>
    <tab-item @on-item-click="switchTab('liuyanpinglun')">留言评论</tab-item>
    <tab-item @on-item-click="switchTab('sixianghuibao')">思想汇报</tab-item>
    <tab-item @on-item-click="switchTab('dangwuzixun')">党务咨询</tab-item>
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
      let path = '/activity/zhibuejia/' + to;
      console.log(path);
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      if (target.path === '/activity/zhibuejia/xuexixinde') {
        this.tabIndex = 0;
      } else if (target.path === '/activity/zhibuejia/liuyanpinglun') {
        this.tabIndex = 1;
      } else if (target.path === '/activity/zhibuejia/sixianghuibao') {
        this.tabIndex = 2;
      } else if (target.path === '/activity/zhibuejia/dangwuzixun') {
        this.tabIndex = 3;
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
