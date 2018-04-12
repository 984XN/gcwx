<template>
  <div class="page page-hudongzhuanqu">
    <tab v-model="tabIndex" :scroll-threshold="4" active-color="#f17474" @on-index-change="tabSwitched" class="tab-icon">
      <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n">
        <div class="icon">
          <i class="iconfont" :class="tab.icon"></i>
        </div>
        <div class="label">
          {{tab.name}}
        </div>
      </tab-item>
    </tab>
    /activity/
    <router-view></router-view>
    <Menu></Menu>
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
        {
          name: '参与投票',
          route: '/activity/canyutoupiao',
          icon: 'icon-favor'
        },
        {
          name: '答题促学',
          route: '/activity/daticuxue',
          icon: 'icon-read'
        },
        {
          name: '知识竞赛',
          route: '/activity/zhishijingsai',
          icon: 'icon-upstage'
        },
        {
          name: '正能量',
          route: '/activity/zhengnengliang',
          icon: 'icon-appreciate'
        },
        {
          name: '建言献策',
          route: '/activity/jianyanxiance',
          icon: 'icon-new'
        },
        {
          name: '支部e家',
          route: '/activity/zhibuejia',
          icon: 'icon-home'
        },
        {
          name: '积分抽奖',
          route: '/activity/jifenchoujiang',
          icon: 'icon-goods_favor_light'
        }
      ]
    };
  },
  computed: {
    tabIndex: {
      get() {
        let index = this.$store.state.tabActive.activity;
        return index;
      },
      set(val) {
        this.$store.commit('setTabActive', {
          tab: 'activity',
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
      this.$store.commit('setTabActive', { tab: 'activity', index: index });
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
