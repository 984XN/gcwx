<template>
  <container :lazyload="lazyload" @loadData="loadData">
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
      let self = this;
      if (self.lazyload.loading) {
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        self.lazyload.loading = false;
      } else {
        api.activity
          .getList({
            Type: 1,
            // queryModel: { Type: 1 }, // 经测试这样传 Type 也可以
            OrganizationCode: '',
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          // .getList({
          //   queryModel: { Type: 1 },
          //   OrganizationCode: '', // 这个字段直接传个空就可以了
          //   pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          // })
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
  }
};
</script>
