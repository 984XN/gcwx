<template>
  <container :lazyload="lazyload" @loadData="loadData">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <ArticleList v-if="list.length" :list="list"></ArticleList>
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
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      list: []
    };
  },
  methods: {
    loadData() {
      let self = this;
      if (self.lazyload.loading) {
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        self.lazyload.loading = false;
      } else {
        api
          .getArticleList({
            model: {},
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
            Theme: 40
          })
          .then(res => {
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
            } else {
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
          });
      }
    }
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>
