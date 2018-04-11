<template>
  <div>
    <tab v-model="tabIndex" :scroll-threshold="0" active-color="#f17474" @on-index-change="tabSwitched">
      <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n">{{tab.name}}</tab-item>
      <!-- <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n" :selected="n===activeTabIndex">{{tab.name}}</tab-item> -->
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
        // console.log(
        //   new Date().getTime(),
        //   'computed tabIndex get',
        //   this.$store.state.tabItemActive.article
        // );
        return this.$store.state.tabItemActive.article;
      },
      set(val) {
        // if (val === 0) debugger;
        this.$store.commit('setTabActive', {
          tab: 'article',
          index: val
        });
        // console.log(new Date().getTime(), 'computed tabIndex set', val);
      }
    }
  },
  methods: {
    tabItemClicked(index) {
      let path = this.tabs[index].route;
      this.$router.push({ path: path });
      if (index === 0) debugger;
      // this.$store.commit('setTabActive', { tab: 'article', index: index });
      // console.log(new Date().getTime(), 'methods - tabItemClicked');
    },
    tabSwitched() {
      // console.log(new Date().getTime(), 'methods - tabSwitched');
    }
  },
  mounted() {
    // console.warn(new Date().getTime(), 'mounted');
    this.$nextTick(function() {
      // console.warn(new Date().getTime(), 'mounted this.$nexttick');
      let index = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.$route.fullPath === this.tabs[i].route) {
          // console.log(
          //   new Date().getTime(),
          //   this.$route.fullPath + ' === ' + this.tabs[i].route,
          //   i
          // );
          index = i;
          break;
        }
      }
      this.tabIndex = index;
      // console.log(
      //   new Date().getTime(),
      //   'mounted before commit',
      //   index,
      //   this.tabIndex
      // );
      // if (index === 0) debugger;
      this.$store.commit('setTabActive', { tab: 'article', index: index });
      // console.log(
      //   new Date().getTime(),
      //   'mounted after commit',
      //   index,
      //   this.tabIndex
      // );
    });
  }
};
</script>
