<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-user-score">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <panel v-if="list.length" header="积分列表" :list="list" type="4"></panel>
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
          .score.list({
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 20 }
          })
          .then(res => {
            console.log('loadData res:', res);
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
