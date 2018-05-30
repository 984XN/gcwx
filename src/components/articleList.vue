<template>
  <ul class="articleList dataList">
    <li v-for="(item,n) in list" :key="n">
      <router-link :to="'detail/'+item.id">
        <div class="thumb" v-if="item.thumb">
          <img :src="item.thumb" :alt="item.title">
          <div class="sign" v-if="item.sign">{{item.sign}}</div>
        </div>
        <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
        <div class="intro" v-if="!item.thumb && item.intro" v-html="item.content"></div>
        <div class="attr" :style="getStyleAttr(item)">
          <span class="type" v-if="!item.thumb && item.sign">
            <i class="iconfont icon-type"></i>
            {{item.sign}}
          </span>
          <span class="view">
            <i class="iconfont icon-eye"></i>
            {{item.view}}
          </span>
          <span class="date">{{item.date|substr(0,10,false)}}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {};
  },
  methods: {
    getStyleTitle(item) {
      let style = {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        lineHeight: '140%'
      };
      if (item.thumb) {
        style['-webkit-line-clamp'] = '3';
        style.height = '68px';
      } else {
        if (item.intro) {
          style['-webkit-line-clamp'] = '1';
          style.height = '22px';
        } else {
          style['-webkit-line-clamp'] = '3';
          style.height = '65px';
        }
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
    padding 15px
    margin-bottom 5px
    border-radius 5px
    position relative
    overflow hidden
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
        width 120px
        height 90px
        float left
        color #EEE
      }
      .sign {
        position absolute
        left 0
        top 0
        background-color #20619ac7
        color #FFF
        font-size 10px
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
      line-height 16px
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      color #666
    }
    .attr {
      font-size 12px
      padding-top 10px
      line-height 1
      color #999
      i {
        font-size inherit
        color #12a2ff
      }
      &:after {
        content ''
        display block
        clear both
      }
      .date {
        float right
      }
      .type,
      .view {
        margin-right 10px
      }
    }
  }
}
</style>
