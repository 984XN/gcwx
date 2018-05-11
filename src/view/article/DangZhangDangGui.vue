<template>
  <container :lazyload="lazyload" @loadData="loadData">
    <swiper :list="banners" auto loop dots-class="swiper-control-dot" dots-position="center" class="swiper"></swiper>
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <ArticleList v-if="list.length" :list="list"></ArticleList>
  </container>
</template>

<script>
import { Swiper } from 'vux';
import ArticleList from 'src/components/articleList';
import * as api from 'src/api/article';

export default {
  components: {
    Swiper,
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
      banners: [
        {
          url: 'javascript:',
          img: '/static/img/banner/02.png'
        }
      ],
      list: [],
      listTpl: [
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          content:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        }
      ]
    };
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
        // console.log( 'XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据' );
        api
          .getArticleList({
            model: {},
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
            Theme: 10
          })
          .then(res => {
            // console.log('loadData res:', res);
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
          });
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      // console.log(this.lazyload);
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus">
</style>
