<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-user-score">
    <panel :header="'积分列表 (共'+score+'积分)'" :list="list" type="4"></panel>
  </container>
</template>

<script>
import { Panel } from 'vux';
import * as api from 'src/api/user';

export default {
  components: {
    Panel
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      score: '-',
      total: '-',
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
        // console.log( 'XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据' );
        api.user.member
          .score({
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 20 }
          })
          .then(res => {
            console.log('loadData res:', res);
            self.score =
              res.Data.sumScore && res.Data.sumScore[0]
                ? res.Data.sumScore[0].AddScore
                : 0;
            if (res.Data.list && res.Data.list.length > 0) {
              let list = res.Data.list.map(v => {
                return {
                  title: '获得 ' + v.score + ' 积分',
                  desc: v.content,
                  meta: {
                    date: v.date
                  }
                };
              });
              self.list = [...self.list, ...list];
              self.total = res.Data.RowCount;
              self.lazyload.page += 1;
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
          });
      }
    }
  }
};
</script>
