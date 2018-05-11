<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-activity-zhishijingsai-order">
    <!-- <h1 class="pageTitle">我的奖品</h1> -->
    <no-data v-if="!list.length && !lazyload.loading">还没有中奖记录</no-data>
    <dl v-if="list.length" class="examOrderList">
      <!-- <dt>
        <div class="number">共{{total}}</div>
        <div class="text">中奖名单</div>
      </dt> -->
      <dd>
        <table class="data">
          <tbody>
            <tr v-for="(v,i) in list" :key="i">
              <td>抽中{{v.gift|substr(0,10)}}</td>
              <td>{{v.date|substr(0,16,false)}}</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </dl>
  </container>
</template>

<script>
import * as api from 'src/api/activity';

export default {
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
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
        api.activity.ChouJiangZhuanQu.list({
          queryModel: {
            WinningType: 1 // number 1.积分抽奖的, 2.答题抽奖的
          },
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 20 },
          api: 'self'
        }).then(res => {
          console.log('loadData res:', res);
          if (res.Data.list && res.Data.list.length > 0) {
            self.list = [...this.list, ...res.Data.list];
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
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-zhishijingsai-order {
  padding 0 10px 10px
  background linear-gradient(rgb(252, 95, 90) 70%, transparent)
  .pageTitle {
    font-size 30px
    text-align center
    color #FFF
    padding 20px 0
    text-shadow 3px 3px 3px rgba(0, 0, 0, 0.5)
  }
}
.examOrderList {
  background-color #fff
  border-radius 5px
  box-shadow 0 3px 5px rgba(0, 0, 0, 0.3)
  margin-top 10px
  list-style none
  dt {
    font-size 12px
    padding 10px 15px
    .number {
      float right
      color rgb(252, 95, 90)
    }
    .text {
      display block
      // background url('./img/choujiangzhuanqu/notice.png')
      width 100px
      height 66px
      position relative
      margin-top -31px
      text-indent -999px
      overflow hidden
      float left
    }
  }
  dd {
    font-size 12px
    padding 5px
    table.data {
      width 100%
      border-collapse collapse
      tr {
        // &:nth-child(1) td:nth-child(1) {
        // color #CC0000
        // }
        // &:nth-child(2) td:nth-child(1) {
        // color #FF9800
        // }
        // &:nth-child(3) td:nth-child(1) {
        // color #2196F3
        // }
        &:nth-child(even) {
          background-color #f3f3f3
        }
        td {
          padding 10px
          &:last-child {
            text-align right
          }
          &:nth-child(1) {
            color #666
          }
          &:nth-child(2) {
            color #CCC
          }
        }
      }
    }
  }
}
</style>
