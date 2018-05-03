<template>
  <tab v-model="tabIndex" :animate="false">
    <tab-item @on-item-click="switchTab('xindetihui')" selected>心得体会</tab-item>
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
      // console.log(path);
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      // console.log('target:', target);
      if (target.path.indexOf('/zhibuejia/xindetihui') > 0) {
        this.tabIndex = 0;
      } else if (target.path.indexOf('/zhibuejia/liuyanpinglun') > 0) {
        this.tabIndex = 1;
      } else if (target.path.indexOf('/zhibuejia/sixianghuibao') > 0) {
        this.tabIndex = 2;
      } else if (target.path.indexOf('/zhibuejia/dangwuzixun') > 0) {
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
