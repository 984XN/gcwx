<template>
  <container :top="containerStyle.top" :bottom="containerStyle.bottom" class="page-xuexipingtai-yingzhiyinghui">
    <ul class="manualList" v-if="$route.name !=='yingzhiyinghui-detail'">
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
    <router-view v-if="$route.name ==='yingzhiyinghui-detail'"></router-view>
  </container>
</template>

<script>
import Container from 'src/components/container';
import ArticleList from 'src/components/articleList';

export default {
  components: {
    Container,
    ArticleList
  },
  computed: {
    containerStyle: function() {
      let style = {};
      if (this.$route.name === 'yingzhiyinghui-detail') {
        style.top = 0;
        style.bottom = 0;
      } else {
        style.top = 44;
        style.bottom = 50;
      }
      return style;
    }
  },
  data() {
    return {
      list: [
        {
          title: '党务手册',
          thumb: '/static/img/YingZhiYingHui/0.gif'
        },
        {
          title: '一张图读懂党的纪律处分',
          thumb: '/static/img/YingZhiYingHui/1.jpg'
        },
        {
          title: '一张图读懂入党程序',
          thumb: '/static/img/YingZhiYingHui/2.jpg'
        },
        {
          title: '一张图读懂党费交多少、怎么交',
          thumb: '/static/img/YingZhiYingHui/3.jpg'
        },
        {
          title: '一张图读懂“两学一做”',
          thumb: '/static/img/YingZhiYingHui/4.jpg'
        },
        {
          title: '一张图读懂“三严三实”专题教育如何开展',
          thumb: '/static/img/YingZhiYingHui/5.jpg'
        },
        {
          title: '一张图读懂党组与部门党委、地方党委、机关党委的七个区别',
          thumb: '/static/img/YingZhiYingHui/6.jpg'
        },
        {
          title: '一张图读懂《中国共产党廉洁自律准则》',
          thumb: '/static/img/YingZhiYingHui/7.jpg'
        },
        {
          title: '一张图读懂《中国共产党问责条例》',
          thumb: '/static/img/YingZhiYingHui/8.jpg'
        },
        {
          title: '一张图读懂《中国共产党纪律处分条例》',
          thumb: '/static/img/YingZhiYingHui/9.jpg'
        }
      ]
    };
  }
};
</script>

<style lang="stylus">
.page-xuexipingtai-yingzhiyinghui .container {
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
