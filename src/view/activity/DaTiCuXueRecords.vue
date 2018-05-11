<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" class="page-activity-zhishijingsai-list">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <ExaminationPaperList v-if="list.length" :list="list" :type="type"></ExaminationPaperList>
  </container>
</template>

<script>
import ExaminationPaperList from 'src/components/examinationPaperList';
import * as api from 'src/api/activity';

export default {
  components: {
    ExaminationPaperList
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      type: 10, // int 10表示答题促学 20表示知识竞赛
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
        api.activity.examination
          .list({
            queryModel: {
              PapersClassify: self.type // int 10表示答题促学 20表示知识竞赛
            },
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
            api: 'my'
          })
          .then(res => {
            console.log('loadData res:', res);
            if (res.Data.list && res.Data.list.length > 0) {
              this.list = [...this.list, ...res.Data.list];
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
  activated() {
    this.scrollTo(this);
  }
};
</script>
