<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="44" class="page-user-score-order">
    <no-data v-if="!list.length && !lazyload.loading" text="暂无积分记录"></no-data>
    <group :title="'我的名次：'+order" v-if="list.length">
      <cell :title="m.name" :value="m.score" v-for="(m,i) in list" :key="i">
        <div class="index" :class="'i'+i" slot="icon">第 {{i+1}} 名</div>
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
      order: '-', // user's order
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
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      api.user.member.score.place().then(res => {
        self.order = res.Data.CurrentOrgRanking[0].rownum;
      });
    });
  }
};
</script>

<style lang="stylus" scoped>
.index {
  color #000
  padding-right 5px
  background-color #DDD
  padding 3px 5px
  border-radius 3px
  font-size 12px
  line-height 16px
  margin-right 5px
  vertical-align middle
  &.i0 {
    background-color #C00
    color #FFF
  }
  &.i1 {
    background-color #FF5722
    color #FFF
  }
  &.i2 {
    background-color #2196F3
    color #FFF
  }
}

</style>
