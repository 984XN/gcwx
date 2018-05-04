<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" class="page-activity-jianyanxiance-records">
    <ul class="articleList">
      <li v-for="(item,n) in list" :key="n">
        <router-link :to="'detail/'+item.id">
          <div class="thumb" v-if="item.thumb">
            <img :src="item.thumb" :alt="item.title">
            <div class="sign" v-if="item.sign">{{item.sign}}</div>
          </div>
          <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
          <div class="intro" v-if="!item.thumb">{{item.intro}}</div>
          <div class="attr" :style="getStyleAttr(item)">
            <span class="status">
              {{item.status}}
            </span>
            <span class="date">{{item.date}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </container>
</template>

<script>
import * as api from 'src/api/activity';

export default {
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
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          status: '已接收',
          date: '2016-02-05'
        }
      ]
    };
  },
  methods: {
    loadData() {
      let self = this;
      if (self.lazyload.loading) {
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        self.lazyload.loading = false;
      } else {
        api.activity.JianYanXianCe.getList({
          queryModel: {},
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
        }).then(res => {
          if (res.Data.PageData && res.Data.PageData.length > 0) {
            this.list = [...this.list, ...res.Data.PageData];
            self.lazyload.page += 1;
          } else {
            self.lazyload.nodata = true;
          }
          self.lazyload.loading = false;
          console.log('loadData:', res);
        });
      }
    },
    getStyleTitle(item) {
      let style = {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        lineHeight: '140%'
      };
      if (item.thumb) {
        style['-webkit-line-clamp'] = '2';
        style.height = '44px';
      } else {
        style['-webkit-line-clamp'] = '1';
        style.height = '22px';
      }
      return style;
    },
    getStyleAttr(item) {
      let style = {};
      if (item.thumb) {
        style = {
          position: 'absolute',
          bottom: '0',
          right: '0',
          left: '170px'
        };
      }
      return style;
    }
  }
};
</script>

<style lang="stylus" scoped>
.articleList {
  padding 10px
  list-style none
  position relative
  z-index 11
  li {
    background-color #fff
    padding 10px
    margin-bottom 5px
    border-radius 5px
    a {
      display block
      color #333
      position relative
      &:after {
        content ''
        display block
        clear both
      }
    }
    .thumb {
      float left
      margin-right 10px
      background-color #EEE
      border-radius 5px
      overflow hidden
      position relative
      img {
        width 160px
        height 110px
        float left
      }
      .sign {
        position absolute
        left 0
        top 0
        background-color #20619ac7
        color #FFF
        font-size 12px
        line-height 1
        padding 5px
        border-radius 0 0 5px 0
        text-transform uppercase
      }
    }
    .title {
      font-size 16px
      margin-bottom 5px
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
    }
    .intro {
      font-size 11px
      height 48px // 3行的高度
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      color #666
      word-wrap break-word
    }
    .attr {
      font-size 12px
      padding-top 10px
      line-height 1
      &:after {
        content ''
        display block
        clear both
      }
      .date {
        float right
      }
      .status {
        float left
        color #C00
      }
    }
  }
}
</style>
