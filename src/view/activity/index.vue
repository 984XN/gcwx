<template>
  <div class="page page-hudongzhuanqu">
    <template v-if="fullpages.indexOf($route.name) === -1">
      <swiper :list="banners" auto loop dots-class="swiper-control-dot" dots-position="center"></swiper>
      <tab v-model="tabIndex" :scroll-threshold="4" active-color="#f17474" class="tab-icon">
        <tab-item @on-item-click="tabItemClicked" v-for="(tab,n) in tabs" :key="n">
          <div class="icon">
            <i class="iconfont" :class="tab.icon"></i>
          </div>
          <div class="label">
            {{tab.name}}
          </div>
        </tab-item>
      </tab>
      <router-view></router-view>
      <Menu></Menu>
    </template>
    <template v-if="fullpages.indexOf($route.name) !== -1">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { Swiper, Tab, TabItem } from 'vux';
import Menu from 'src/components/menu';

export default {
  components: {
    Swiper,
    Tab,
    TabItem,
    Menu
  },
  data() {
    return {
      fullpages: ['JianYanXianCe'],
      banners: [
        {
          url: 'javascript:',
          img: '/static/banner/01.png'
        },
        {
          url: 'javascript:',
          img: '/static/banner/01.png'
        }
      ],
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
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 定位顶部 tab
      if (this.fullpages.indexOf(this.$route.name) === -1) {
        // 1.激活路由对应的 tabItem 项
        let index = 0;
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.$route.fullPath === this.tabs[i].route) {
            index = i;
            break;
          }
        }
        this.tabIndex = index;
        this.$store.commit('setTabActive', { tab: 'activity', index: index });
        // 2.把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
        if (index > 3) {
          let tab = this.$el.querySelector('.vux-tab.scrollable');
          let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
          tab.scrollLeft = tabItemWidth * (index - 1);
        }
      } else {
        console.log('没有顶部tab');
      }
    });
  }
};
</script>
