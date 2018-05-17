<template>
  <div class="page-activity-liangdiantoupiao-list">
    <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0">
      <no-data v-if="!list.length && !lazyload.loading"></no-data>
      <ol v-if="list.length" class="voteList">
        <router-link :to="'items/'+v.id" tag="li" class="vote" :class="{expire: isExpire(v.dateEnd)}" v-for="(v,i) in list" :key="i">
          <div class="author">发布单位：{{v.author}}</div>
          <div class="title">{{v.title}}</div>
          <div class="attr">
            <span class="link">前往投票</span>
            <div class="date">{{v.dateStart|substr(0,10,false)}} 至 {{v.dateEnd|substr(0,10,false)}}</div>
            <!-- <div class="view">
              <i class="iconfont icon-eye"></i>
              2541
            </div> -->
          </div>
        </router-link>
      </ol>
    </container>
  </div>
</template>

<script>
import { Swiper } from 'vux';
import Menu from 'src/components/menu';

import * as api from 'src/api/activity';

export default {
  components: {
    Swiper,
    Menu
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      list: [],
      listTpl: [
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          content:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
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
    isExpire(dateEnd) {
      let self = this;
      let expire = false;
      if (dateEnd) {
        let dateEndTime = self.time(dateEnd);
        let nowTime = self.time();
        expire = dateEndTime < nowTime;
      }
      return expire;
    },
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
        api.activity.LiangDianTouPiao.list({
          queryModel: {
            PapersClassify: self.type // int 10表示答题促学 20表示知识竞赛
          },
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
          api: 'all'
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
    &.expire:after {
      content '已结束'
      font-size 18px
      line-height 1
      padding 4px 10px
      border solid 2px #ff0000
      color #ff0000
      display block
      position absolute
      left 50%
      top 50%
      margin-left -40px
      margin-top -20px
      transform rotate(-15deg)
      border-radius 3px
      text-shadow 1px 1px 0px #ffffff
      box-shadow 0 0 0px 2px #ffffff inset
      outline solid 2px #FFF
    }
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
