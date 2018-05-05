<template>
  <container :lazyload="lazyload" @loadData="loadData" top="0" bottom="0">
    <ArticleList :list="list"></ArticleList>
  </container>
</template>

<script>
import ArticleList from 'src/components/articleList';
import * as api from 'src/api/activity';

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
        // console.log('XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据');
        api.activity.ZhengNengLiang.list({
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
          api: 'self'
        }).then(res => {
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
  mounted() {}
};
</script>
