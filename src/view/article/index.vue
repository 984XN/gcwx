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
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 激活路由对应的 tabItem 项
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.$route.fullPath === this.tabs[i].route) {
          index = i;
          break;
        }
      }
      this.tabIndex = index;
      this.$store.commit('setTabActive', { tab: 'article', index: index });
      // 把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
      if (index > 3) {
        let tab = this.$el.querySelector('.vux-tab.scrollable');
        let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
        tab.scrollLeft = tabItemWidth * (index - 1);
      }
    });
  }
};
</script>
