<template>
  <div class="page page-xuexipingtai">
    <template v-if="$route.meta.fullpage !== true">
      <tab v-model="tabIndex" :scroll-threshold="4" active-color="#f17474">
        <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n">{{tab.name}}</tab-item>
      </tab>
      <router-view></router-view>
      <Menu></Menu>
    </template>
    <template v-if="$route.meta.fullpage === true">
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
      this.$router.replace({ path: path });
    },
    setTabItemActive(target) {
      // 定位顶部 tab
      if (target.meta.fullpage !== true) {
        // 1.激活路由对应的 tabItem 项
        let index = 0;
        for (let i = 0; i < this.tabs.length; i++) {
          if (target.path === this.tabs[i].route) {
            index = i;
            break;
          }
        }
        console.log('tabPos:', index);
        this.tabIndex = index;
        this.$store.commit('setTabActive', { tab: 'article', index: index });
        // 2.把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
        if (index > 3) {
          let tab = this.$el.querySelector('.vux-tab.scrollable');
          let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
          tab.scrollLeft = tabItemWidth * (index - 1);
        }
      } else {
        console.log('没有顶部tab');
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
