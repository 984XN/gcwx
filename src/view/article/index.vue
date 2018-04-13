<template>
  <div class="page page-xuexipingtai">
    <template v-if="$route.name !=='detail-article'">
      <tab v-model="tabIndex" :scroll-threshold="4" active-color="#f17474" @on-index-change="tabSwitched">
        <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n">{{tab.name}}</tab-item>
      </tab>
      <router-view></router-view>
      <Menu></Menu>
    </template>
    <template v-if="$route.name ==='detail-article'">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux';
import Menu from 'src/components/menu';

export default {
  components: {
    Tab,
    TabItem,
    Menu
  },
  data() {
    return {
      tabs: [
        { name: '应知应会', route: '/article/yingzhiyinghui' },
        { name: '党章党规', route: '/article/dangzhangdanggui' },
        { name: '系列讲话', route: '/article/xiliejianghua' },
        { name: '党史博览', route: '/article/dangshibolan' },
        { name: '典型风采', route: '/article/dianxingfengcai' },
        { name: '不忘初心', route: '/article/buwangchuxin' },
        { name: '心得体会', route: '/article/xindetihui' }
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
      this.$router.push({ path: path });
    },
    tabSwitched() {
      // console.log(new Date().getTime(), 'methods - tabSwitched');
    },
    setTabItemActive(target) {
      // 定位顶部 tab
      // 1.激活路由对应的 tabItem 项
      let i = 0;
      for (i = 0; i < this.tabs.length; i++) {
        if (target.fullPath === this.tabs[i].route) {
          break;
        }
      }
      this.tabIndex = i;
      this.$store.commit('setTabActive', { tab: 'article', index: i });
      // 2.把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
      if (i > 3) {
        let tab = this.$el.querySelector('.vux-tab.scrollable');
        let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
        tab.scrollLeft = tabItemWidth * (i - 1);
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.setTabItemActive(this.$route)
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
