<template>
  <ul class="articleList" :style="styleContainer">
    <li v-for="(item,n) in list" :key="n">
      <a href="javascript:;">
        <img class="thumb" v-if="item.thumb" :src="item.thumb" :alt="item.title">
        <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
        <div class="intro" v-if="!item.thumb">{{item.intro}}</div>
        <div class="attr" :style="getStyleAttr(item)">
          <span class="view">{{item.view}}</span>
          <span class="date">{{item.date}}</span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import bgi from 'src/assets/img/articleBg.png';

export default {
  props: {
    list: Array
  },
  data() {
    return {
      styleContainer: {
        background: 'url(' + bgi + ') center top no-repeat',
        backgroundSize: 'contain'
      }
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
  // background url('/src/assets/img/articleBg.png') center top no-repeat
  // background-size contain
  padding 200px 10px 0
  list-style none
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
      width 160px
      height 100px
      margin-right 10px
      background-color #EEE
      border-radius 5px
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
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
    }
    .attr {
      font-size 12px
      padding-top 10px
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
      }
    }
  }
}
</style>
