<template>
  <div>
    <tab :scroll-threshold="0" active-color='#f17474'>
      <tab-item @on-item-click="switchTab" v-for="(tab,n) in tabs" :key="n" :selected="n===activeTabIndex">{{tab.name}}</tab-item>
    </tab> /article/
    <router-view></router-view>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux';

export default {
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
      true: 0,
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
    activeTabIndex: {
      get() {
        return this.$store.state.tabItemActive.article;
        // let path = this.$store.state.tabItemActive.article;
        // let index = 0;
        // for (let i = 0; i < this.tabs.length; i++) {
        //   if (path === this.tabs[i].route) {
        //     index = i;
        //     break;
        //   }
        // }
        // console.log('computed activeTabIndex get', index);
        // return index;
      },
      set(val) {
        this.$store.commit('setTabActive', {
          tab: 'article',
          index: val
        });
        // this.$store.commit('setTabActive', {
        //   tab: 'article',
        //   path: this.tabs[val].route
        // });
        // console.log('computed activeTabIndex set', val);
      }
    }
  },
  methods: {
    switchTab(index) {
      let path = this.tabs[index].route;
      this.$router.push({ path: path });
      this.$store.commit('setTabActive', { tab: 'article', index: index });
    }
  },
  mounted() {
    let index = 0;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.$route.fullPath === this.tabs[i].route) {
        index = i;
        break;
      }
    }
    this.$store.commit('setTabActive', { tab: 'article', index: index });
    console.log('article/index.vue mounted', this.$route);
  }
};
</script>
