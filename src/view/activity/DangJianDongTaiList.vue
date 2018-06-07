<template>
  <div class="page-activity-liangdiantoupiao-list">
    <container :lazyload="lazyload" @loadData="loadData" bottom="50" top="0">
      <swiper :list="banners" auto loop dots-class="swiper-control-dot" dots-position="center"></swiper>
      <tab v-model="tabIndex" :scroll-threshold="4" active-color="#f17474" class="tab-icon">
        <tab-item @on-item-click="jumpTo" v-for="(tab,n) in tabs" :key="n" :disabled="!hasPower(tab.allowRole)">
          <div class="icon">
            <i class="iconfont" :class="tab.icon"></i>
          </div>
          <div class="label">
            {{tab.name}}
            <i class="iconfont icon-lock" v-if="!hasPower(tab.allowRole)"></i>
          </div>
        </tab-item>
      </tab>
      <no-data v-if="!list.length && !lazyload.loading"></no-data>
      <ArticleList v-if="list.length" :list="list"></ArticleList>
    </container>
    <Menu></Menu>
  </div>
</template>

<script>
import { Swiper } from 'vux';
import Menu from 'src/components/menu';
import ArticleList from 'src/components/articleList';

import * as api from 'src/api/activity';

export default {
  components: {
    Swiper,
    Menu,
    ArticleList
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      tabIndex: 0,
      list: [],
      banners: [
        {
          url: 'javascript:',
          img: '/static/img/banner/01.jpg'
        }
      ],
      tabs: [
        {
          name: '党建动态',
          route: '/activity/dangjiandongtai',
          icon: 'icon-news',
          allowRole: 'all'
        },
        {
          name: '亮点投票',
          route: '/activity/liangdiantoupiao',
          icon: 'icon-favor',
          allowRole: 'member'
        },
        {
          name: '答题促学',
          route: '/activity/daticuxue',
          icon: 'icon-read',
          allowRole: 'member'
        },
        {
          name: '知识竞赛',
          route: '/activity/zhishijingsai',
          icon: 'icon-upstage',
          allowRole: 'member'
        },
        {
          name: '正能量',
          route: '/activity/zhengnengliang',
          icon: 'icon-appreciate',
          allowRole: 'member'
        },
        {
          name: '建言献策',
          route: '/activity/jianyanxiance',
          icon: 'icon-new',
          allowRole: 'member'
        },
        {
          name: '支部e家',
          route: '/activity/zhibuejia',
          icon: 'icon-home',
          allowRole: 'member'
        },
        {
          name: '抽奖专区',
          route: '/activity/choujiangzhuanqu',
          icon: 'icon-goods_favor_light',
          allowRole: 'member'
        }
      ]
    };
  },
  computed: {
    // tabIndex: {
    //   get() {
    //     let index = this.$store.state.tabActive.activity;
    //     return index;
    //   },
    //   set(val) {
    //     this.$store.commit('setTabActive', {
    //       tab: 'activity',
    //       index: val
    //     });
    //   }
    // }
  },
  methods: {
    loadData() {
      // console.log('XiLieJianHua.loadData...');
      let self = this;
      if (self.lazyload.loading) {
        // console.log('已经在加载中，return');
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        // console.log('XiLieJianHua.loadData...没有数据了');
        self.lazyload.loading = false;
      } else {
        // console.log('XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据');
        api.activity.DangJianDongTai.list({
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
        }).then(res => {
          if (res.Data.list && res.Data.list.length > 0) {
            self.list = [...self.list, ...res.Data.list];
            self.lazyload.page += 1;
            if (!res.Data.PageIndex) {
              // 没有分页功能
              self.lazyload.nodata = true;
            }
          } else {
            // console.log('木有数据了');
            self.lazyload.nodata = true;
          }
          // console.log('loadData res:', res);
          // console.log('list:', self.list);
          self.lazyload.loading = false;
        });
      }
    },
    jumpTo(index) {
      let path = this.tabs[index].route;
      this.$router.push({ path: path });
      return false;
    },
    setTabItemActive(target) {
      // 定位顶部 tab
      // 1.激活路由对应的 tabItem 项
      let self = this;
      let index = 0;
      for (let i = 0; i < self.tabs.length; i++) {
        if (target.path === self.tabs[i].route) {
          index = i;
          break;
        }
      }
      // console.log('tabPos:', index);
      self.tabIndex = index;
      self.$store.commit('setTabActive', { tab: 'article', index: index });
      // 2.把 tabItem 滚出来（激活最后的一个时，刷新页面后激活的这个在最后边，组件没有自己把它滚动显示出来
      if (index > 3) {
        let tab = self.$el.querySelector('.menu-sub .vux-tab.scrollable');
        let tabItemWidth = tab.querySelector('.vux-tab-item').offsetWidth;
        tab.scrollLeft = tabItemWidth * (index - 1);
      }
    }
  },
  // mounted() {
  //   let self = this;
  //   console.log('mounted:', this.$route);
  //   self.$nextTick(function() {
  //     // 开启 keep-alive 后，再次回到这个页面不执行 mounted
  //     self.setTabItemActive(self.$route);
  //   });
  // },
  activated() {
    let self = this;
    // console.log('LiangDianTouPiaoList activated:', self.$route);
    self.setTabItemActive(self.$route);
    this.scrollTo(this);
  }
  // watch: {
  //   $route(to) {
  //     // console.log('\narticle/index.vue watch $route.to', to);
  //     this.setTabItemActive(to);
  //   }
  // }
};
</script>

<style lang="stylus" scoped>
.voteList {
  margin 10px
  list-style none
  .vote {
    margin-bottom 5px
    background-color #fff
    padding 10px 15px
    border-radius 5px
    position relative
    a {
      display block
      color #000
    }
    .author {
      font-size 12px
      color #666
    }
    .title {
      padding 20px 0
      text-align center
    }
    .attr {
      font-size 12px
      line-height 1
      color #999
      padding-top 5px
      &:after {
        content ''
        display block
        clear both
      }
      .link {
        float right
        color #f17474
        &:after {
          content ' '
          display inline-block
          height 8px
          width 8px
          border-width 1px 1px 0 0
          border-color #C8C8CD
          border-style solid
          -webkit-transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
          transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
          position relative
          top 50%
          left 3px
          margin-top -4px
          right 2px
        }
      }
      .date,
      .view {
        float left
      }
      .date {
        margin-right 25px
      }
      .view {
        i {
          font-size inherit
        }
      }
    }
    .status {
      border 2px solid #F00
      width 5em
      text-align center
      color #F00
      border-radius 3px
      position absolute
      left 50%
      top 50%
      margin-top -15px
      margin-left -42px
      font-weight bold
      box-shadow 0 0 0 2px #ffffff inset
      text-shadow 0 0 2px #FFF
      transform rotate(-15deg)
    }
  }
}
</style>
