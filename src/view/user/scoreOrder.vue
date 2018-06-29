<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="44" class="page-user-score">
    <no-data v-if="!list.length && !lazyload.loading" text="暂无积分记录"></no-data>
    <group title="积分排名" v-if="list.length">
      <cell :title="m.name" :value="m.score" v-for="(m,i) in list" :key="i">
        <div class="index" slot="icon">第{{i+1}}名</div>
      </cell>
    </group>
  </container>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      order: 0, // user's order
      list: [
        // {
        //   name: 'NAME1',
        //   score: 9898
        // }
      ]
    };
  },
  computed: {
    userOrder() {
      let text = '暂无';
      let self = this;
      if (self.order) {
        text = `第${self.order}名`;
      }
      return text;
    }
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
        console.log(
          'XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据'
        );
        api.user.member.score
          .order({
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 20 }
          })
          .then(res => {
            console.log('loadData res:', res);
            if (res.Data.list && res.Data.list.length > 0) {
              let list = res.Data.list;
              self.list = [...self.list, ...list];
              self.lazyload.page += 1;
              if (!res.Data.PageIndex) {
                // 没有分页功能
                self.lazyload.nodata = true;
              }
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

<style lang="stylus" scoped>
.index {
  color #333
  padding-right 5px
}
</style>
