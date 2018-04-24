<template>
  <container>
    <swiper :list="banners" auto loop dots-class="swiper-control-dot" dots-position="center" class="swiper"></swiper>
    <ArticleList :list="list"></ArticleList>
    <load-more :show-loading="true" v-show="loadMore.loading" tip="正在获取数据"></load-more>
    <load-more :show-loading="false" v-show="loadMore.isAll" tip="没有了" background-color="#fbf9fe"></load-more>
    <load-more :show-loading="false" v-show="loadMore.noData" tip="暂无数据" background-color="#fbf9fe"></load-more>
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
      page: { Page: 1, Limit: 10 },
      loadMore: {
        loading: false,
        isAll: false,
        noData: false
      },
      banners: [
        {
          url: 'javascript:',
          img: '/static/img/banner/02.png'
        },
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
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        }
      ]
    };
  },
  mounted() {
    this.loadMore.loading = true;
    api
      .getArticleList({
        model: {},
        pageModel: this.page,
        Theme: 10
      })
      .then(res => {
        this.loadMore.loading = false;
        if (res.Data.PageData) {
          this.page.Page += 1;
          this.list = res.Data.PageData;
        } else {
          if (this.page.Page > 1) {
            this.loadMore.isAll = true;
          } else {
            this.loadMore.noData = true;
          }
        }
      });
  }
};
</script>

<style lang="stylus">
</style>
