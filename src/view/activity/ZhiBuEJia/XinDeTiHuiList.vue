<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <ArticleList v-if="list.length" :list="list"></ArticleList>
    <router-link to="add" class="btnAdd">
      <i class="iconfont icon-add"></i>
    </router-link>
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
        api.activity.ZhiBuEJia
          .list({
            Type: 1, // 1.心得体会2.留言评论3.思想汇报4.党务咨询
            // queryModel: { Type: 1 }, // 经测试这样传 Type 也可以
            OrganizationCode: '',
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          // .list({
          //   queryModel: { Type: 1 },
          //   OrganizationCode: '', // 这个字段直接传个空就可以了
          //   pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          // })
          .then(res => {
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
              if (!res.Data.PageIndex) {
                // 没有分页功能
                self.lazyload.nodata = true;
              }
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

<style lang="stylus">
.btnAdd {
  position fixed
  right 20px
  bottom 20px
  width 50px
  height 50px
  line-height 50px
  border-radius 5px
  background-color #f17474ba
  text-align center
  &:hover {
    background-color #f17474
  }
  i {
    color #FFF
    font-size 36px
  }
}
</style>
