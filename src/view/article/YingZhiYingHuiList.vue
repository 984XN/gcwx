<template>
  <container class="page-article-yingzhiyinghui-list">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <ul v-if="list.length" class="manualList">
      <li v-for="(item,n) in list" :key="n">
        <template v-if="n === 0">
          <a href="javascript:;">
            <div class="thumb">
              <img :src="item.thumb" :alt="item.title">
            </div>
            <div class="title">{{item.title}}</div>
          </a>
        </template>
        <template v-if="n !== 0">
          <router-link :to="{path: 'detail', query: item}" append>
            <div class="thumb">
              <img :src="item.thumb" :alt="item.title">
            </div>
            <div class="title">{{item.title}}</div>
          </router-link>
        </template>
      </li>
    </ul>
  </container>
</template>

<script>
import ArticleList from 'src/components/articleList';

export default {
  components: {
    ArticleList
  },
  computed: {},
  data() {
    return {
      list: [
        {
          title: '党务手册',
          thumb: '/static/img/YingZhiYingHui/0.gif',
          file: '/static/img/YingZhiYingHui/0.gif'
        },
        {
          title: '一张图读懂党的纪律处分',
          thumb: '/static/img/YingZhiYingHui/1_thumb.jpg',
          file: '/static/img/YingZhiYingHui/1.jpg'
        },
        {
          title: '一张图读懂入党程序',
          thumb: '/static/img/YingZhiYingHui/2_thumb.jpg',
          file: '/static/img/YingZhiYingHui/2.jpg'
        },
        {
          title: '一张图读懂党费交多少、怎么交',
          thumb: '/static/img/YingZhiYingHui/3_thumb.jpg',
          file: '/static/img/YingZhiYingHui/3.jpg'
        },
        {
          title: '一张图读懂“两学一做”',
          thumb: '/static/img/YingZhiYingHui/4_thumb.jpg',
          file: '/static/img/YingZhiYingHui/4.jpg'
        },
        {
          title: '一张图读懂“三严三实”专题教育如何开展',
          thumb: '/static/img/YingZhiYingHui/5_thumb.jpg',
          file: '/static/img/YingZhiYingHui/5.jpg'
        },
        {
          title: '一张图读懂党组与部门党委、地方党委、机关党委的七个区别',
          thumb: '/static/img/YingZhiYingHui/6_thumb.jpg',
          file: '/static/img/YingZhiYingHui/6.jpg'
        },
        {
          title: '一张图读懂《中国共产党廉洁自律准则》',
          thumb: '/static/img/YingZhiYingHui/7_thumb.jpg',
          file: '/static/img/YingZhiYingHui/7.jpg'
        },
        {
          title: '一张图读懂《中国共产党问责条例》',
          thumb: '/static/img/YingZhiYingHui/8_thumb.jpg',
          file: '/static/img/YingZhiYingHui/8.jpg'
        },
        {
          title: '一张图读懂《中国共产党纪律处分条例》',
          thumb: '/static/img/YingZhiYingHui/9_thumb.jpg',
          file: '/static/img/YingZhiYingHui/9.jpg'
        }
      ]
    };
  },
  beforeDestroy() {
    // let self = this;
    // let elm = self.$el.querySelector('.container') || self.$el;
    // let scrollTop = elm.scrollTop;
    // console.log('beforeDestroy - self.$el:', self.$el);
    // console.log(
    //   'beforeDestroy - container:',
    //   self.$el.querySelector('.container')
    // );
    // console.log('beforeDestroy - elm:', elm);
    // console.log('beforeDestroy - scrollTop:', elm.getScrollTop());
    // console.log('document scrollTop:', document.querySelector('.container'));
  },
  deactivated() {
    let self = this;
    // console.log('scrollTop:', self.$el);
    self.$emit('setScrollTop', { route: self.$route, value: 99 });
  }
};
</script>

<style lang="stylus" scoped>
.page-article-yingzhiyinghui-list {
  padding 10px
  height auto
}
.manualList {
  border-color #CCC
  padding 0 20px
  background-color #fff
  list-style none
  border-radius 5px
}
.manualList li {
  border-bottom 1px solid #EFF1F3
}
.manualList li:last-child {
  border none
}
.manualList li a {
  position relative
  display block
  color #000
  padding 10px 0
  min-height 54px
}
.manualList li a:after {
  content ''
  display block
  clear both
  height 0
}
.manualList li .thumb {
  height 54px
  overflow hidden
  float right
  margin-left 24px
  background-color #b7b7b7
  border-radius 3px
}
.manualList li .thumb,
.manualList li .thumb img {
  width 54px
}
.manualList li .title {
  line-height 140%
}
.manualList li:first-child {
  padding 10px 0
}
.manualList li:first-child .thumb,
.manualList li:first-child img {
  width 100%
  height 43vw
  overflow hidden
}
.manualList li:first-child a {
  padding-bottom 0
}
.manualList li:first-child img {
  height auto
}
.manualList li:first-child .title {
  display none
  position absolute
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.7)
  color #FFF
  padding 10px 24px
}
</style>
