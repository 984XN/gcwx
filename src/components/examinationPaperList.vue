<template>
  <ul class="examinationPaperList">
    <li v-for="(item,n) in list" :key="n">
      <router-link :to="go(item)" class="box">
        <div class="thumb" v-if="item.thumb">
          <img :src="item.thumb" :alt="item.title">
          <div class="sign" v-if="item.sign">{{item.sign}}</div>
        </div>
        <div class="title" :style="getStyleTitle(item)">{{item.title}}</div>
        <div class="intro" v-if="!item.thumb && item.content">
          {{item.content}}
        </div>
        <div class="attr" :style="getStyleAttr(item)">
          <span class="date" v-if="item.date">考试时间：{{item.date|substr(0,10,false)}}</span>
        </div>
        <template v-if="type === 10">
          <template v-if="!item.expire && !item.done">
            <template v-if="item.statusCode === 1 && inWechat">
              <x-button mini type="warn">继续答题</x-button>
            </template>
            <template v-else-if="item.statusCode === 1 && !inWechat">
              <x-button mini default>{{item.statusText}}</x-button>
            </template>
            <template v-else-if="item.statusCode === 2">
              <x-button mini default>{{item.statusText}}</x-button>
            </template>
            <template v-else>
              <x-button mini type="warn">开始答题</x-button>
            </template>
          </template>
          <x-button v-if="!item.expire && item.done" mini default>已完成</x-button>
          <x-button v-if="item.expire" mini default>已结束</x-button>
          <x-button v-if="item.notYet" mini default :disabled="true">尚未开始</x-button>
        </template>
        <template v-else-if="type === 20">
          <template v-if="!item.expire && !item.done">
            <template v-if="item.statusCode === 1 && inWechat">
              <x-button mini type="warn">继续答题</x-button>
            </template>
            <template v-else-if="item.statusCode === 1 && !inWechat">
              <x-button mini default>{{item.statusText}}</x-button>
            </template>
            <template v-else-if="item.statusCode === 2">
              <x-button mini default>{{item.statusText}}</x-button>
            </template>
            <template v-else>
              <x-button mini type="warn">开始答题</x-button>
            </template>
          </template>
          <x-button v-if="!item.expire && item.done" mini default>已完成</x-button>
          <x-button v-if="item.expire" mini type="primary">查看排名</x-button>
          <x-button v-if="item.notYet" mini default :disabled="true">尚未开始</x-button>
        </template>
        <template v-else>
        </template>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    type: Number // 10表示答题促学 20表示知识竞赛
  },
  data() {
    return {};
  },
  computed: {
    inWechat() {
      return this.isWechat();
    }
  },
  methods: {
    go(item) {
      let self = this;
      let path = 'paper/' + item.id;
      if (item.notYet) {
        return '';
      }
      if (self.type === 10) {
        // 10表示答题促学 20表示知识竞赛
        // 未到期已做过：回看试卷
        if (item.done) {
          path = 'preview/' + item.id;
        }
      } else if (self.type === 20) {
        // 知识竞赛没有详细页的接口，看不了过做的试卷
        // // 10表示答题促学 20表示知识竞赛
        // if (item.done) {
        //   path = 'preview/' + item.id;
        // }
        // 过期的就转到排名
        if (item.expire || item.done) {
          path = 'order/' + item.id;
        }
      }
      return { path };
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
    .box {
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
      word-wrap break-word
    }
    .intro {
      font-size 11px
      height 32px // 3行的高度
      line-height 16px
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
      min-width 8em
      display inline-block
      padding 0 0.5em
    }
  }
}
</style>
