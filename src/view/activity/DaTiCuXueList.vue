<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" class="page-activity-zhishijingsai-list">
    <ExaminationPaperList :list="list" :type="type"></ExaminationPaperList>
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
      list: [],
      listTpl: [
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          content:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
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
        // console.log('XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据');
        api.activity.examination
          .list({
            queryModel: {
              PapersClassify: self.type // int 10表示答题促学 20表示知识竞赛
            },
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
            api: 'all'
          })
          .then(res => {
            if (res.Data.list && res.Data.list.length > 0) {
              self.list = [...self.list, ...res.Data.list];
              self.lazyload.page += 1;
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            console.log('loadData res:', res);
            console.log('list:', self.list);
            self.lazyload.loading = false;
          });
      }
    }
  }
};
</script>
