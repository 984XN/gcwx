<template>
  <ul class="articleList">
    <li v-for="(item,n) in list" :key="n">
      <router-link to="detail">
        <div class="thumb" v-if="item.thumb">
          <img :src="item.thumb" :alt="item.title">
          <div class="sign" v-if="item.sign">{{item.sign}}</div>
        </div>
        <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
        <div class="intro" v-if="!item.thumb">{{item.intro}}</div>
        <div class="attr" :style="getStyleAttr(item)">
          <span class="view">
            <i class="iconfont icon-eye"></i>
            {{item.view}}
          </span>
          <span class="date">{{item.date}}</span>
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
    return {
    };
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
  position: relative;
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
      .view {
        float left
        i {
          color rgb(18, 162, 263)
          font-size 12px
          margin-right 3px
        }
      }
    }
  }
}
</style>
