<template>
  <container>
    <ArticleList :list="list"></ArticleList>
  </container>
</template>

<script>
import ArticleList from 'src/components/articleList';
import * as api from 'src/api/article';

export default {
  components: {
    ArticleList
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    api
      .getArticleList({
        model: {},
        pageModel: { Page: 1, Start: 0, Limit: 10 },
        Theme: 40
      })
      .then(res => {
        if (res.Data.PageData) {
          this.list = res.Data.PageData;
        }
      });
  }
};
</script>
