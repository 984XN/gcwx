<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-activity-liangdiantoupiao-item-detail">
    <Article :article="article"></Article>
    <group title="投票列表">
      <cell v-for="(v,i) in list" :key="i" :title="v.date" :value="v.title"></cell>
      <cell v-if="!list.length" title="暂无数据"></cell>
    </group>
  </container>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/activity';

export default {
  components: {
    Article
  },
  data() {
    return {
      id: 0,
      article: {
        baseInfo: {}
      },
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
        api.activity.LiangDianTouPiao.item
          .records({
            queryModel: {
              ItemID: self.id
            },
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          .then(res => {
            if (res.Data.list && res.Data.list.length > 0) {
              self.list = [...self.list, ...res.Data.list];
              self.lazyload.page += 1;
              if (!res.Data.PageIndex) {
                // 没有分页功能
                self.lazyload.nodata = true;
              }
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            console.log('loadData list res:', res);
            // console.log('list:', self.list);
            self.lazyload.loading = false;
          });
      }
    }
  },
  mounted() {
    let self = this;
    self.$vux.loading.show({ text: '加载中' });
    self.id = self.$route.params.id || 0;
    self.$nextTick(() => {
      // 正文
      api.activity.LiangDianTouPiao.item
        .detail({
          ID: self.id
        })
        .then(res => {
          self.$vux.loading.hide();
          self.article = res.Data.article;
          // console.log('res:', res);
        });
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>
