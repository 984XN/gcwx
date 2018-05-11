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
      // rights: ['member','wechat','all'],
      tabs: [
        { name: '应知应会', allow: 'all', route: '/article/yingzhiyinghui' },
        {
          name: '党章党规',
          allow: 'all',
          route: '/article/dangzhangdanggui'
        },
        { name: '系列讲话', allow: 'all', route: '/article/xiliejianghua' },
        { name: '党史博览', allow: 'all', route: '/article/dangshibolan' },
        {
          name: '典型风采',
          allow: 'all',
          route: '/article/dianxingfengcai'
        },
        { name: '不忘初心', allow: 'all', route: '/article/buwangchuxin' }
      ]
    };
  },
  computed: {
    tabIndex: {
      get() {
        let index = this.$store.state.tabActive.article;
        return index;
      },
      set(val) {
        this.$store.commit('setTabActive', {
          tab: 'article',
          index: val
        });
      }
    }
  },
  methods: {
    tabItemClicked(index) {
      let path = this.tabs[index].route;
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      // 定位顶部 tab
      // 1.激活路由对应的 tabItem 项
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (target.path === this.tabs[i].route) {
          index = i;
          break;
        }
      }
      // console.log('tabPos:', index, 'target:', target);
      this.tabIndex = index;
      this.$store.commit('setTabActive', { tab: 'article', index: index });
      // 2.把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
      if (index > 3) {
        let tab = this.$el.querySelector('.menu-sub .vux-tab.scrollable');
        let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
        tab.scrollLeft = tabItemWidth * (index - 1);
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
