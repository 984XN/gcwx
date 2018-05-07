<template>
  <ul class="examinationPaperList">
    <li v-for="(item,n) in list" :key="n">
      <router-link :to="{path: path+'/'+item.id}">
        <div class="thumb" v-if="item.thumb">
          <img :src="item.thumb" :alt="item.title">
          <div class="sign" v-if="item.sign">{{item.sign}}</div>
        </div>
        <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
        <div class="intro" v-if="!item.thumb && item.content">{{item.content}}</div>
        <div class="attr" :style="getStyleAttr(item)">
          <span class="date" v-if="item.date">考试时间：{{item.date|substr(0,10,false)}}</span>
        </div>
        <x-button v-if="!item.expire && !item.done" mini type="warn">开始测试</x-button>
        <x-button v-if="!item.expire && item.done" mini disabled>已完成</x-button>
        <x-button v-if="item.expire" mini disabled>已结束</x-button>
        <x-button v-if="item.notYet" mini disabled>未开始</x-button>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    path: {
      default: () => {
        return 'paper';
      }
    }
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
        style['-webkit-line-clamp'] = '2';
        style.height = '38px';
      } else {
        style['-webkit-line-clamp'] = '1';
        style.height = '22px';
      }
      return style;
    },
    getStyleAttr(item) {
      let style = {};
      if (!item.thumb) {
        style = {};
      } else {
        style.paddingTop = 0;
      }
      return style;
    }
  }
};
</script>

<style lang="stylus" scoped>
.examinationPaperList {
  padding 10px
  list-style none
  position relative
  z-index 11
  li {
    background-color #fff
    padding 15px
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
        width 120px
        height 90px
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
      color rgb(234, 61, 61)
      font-size 14px
      margin-bottom 5px
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
    }
    .intro {
      font-size 11px
      height 32px // 3行的高度
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      color #666
    }
    .attr {
      font-size 12px
      padding 20px 0 10px
      line-height 1
      float left
      &:after {
        content ''
        display block
        clear both
      }
      .date {
        float left
        color #999
      }
    }
    .weui-btn {
      position absolute
      right 0
      bottom 0
      font-size 12px
      line-height 30px
      min-width 6em
      display inline-block
      padding 0
    }
  }
}
</style>
