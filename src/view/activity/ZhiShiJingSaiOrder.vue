<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-activity-zhishijingsai-order">
    <!-- <h1 class="pageTitle">竞赛排名</h1> -->
    <dl class="examOrderList">
      <dt>
        <div class="total" v-if="total > 0">共{{total}}人</div>
        <div class="myOrder">
          我的排名：
          <strong v-if="order > 0">第{{order}}名</strong>
          <strong v-else>暂无排名</strong>
        </div>
      </dt>
      <dd>
        <no-data v-if="!list.length && !lazyload.loading">还没有排名记录</no-data>
        <table v-if="list.length" class="data">
          <thead>
            <th>名次</th>
            <th>姓名</th>
            <th>得分</th>
            <th>用时</th>
            <th>答题时间</th>
          </thead>
          <tbody>
            <tr v-for="(v,i) in list" :key="i" :class="[v.mid === mid ? 'active' : '', 'i_'+v.order]">
              <td>第{{v.order}}名</td>
              <td>{{v.name}}</td>
              <td>{{v.score}}分</td>
              <td>
                <template v-if="v.times">
                  {{v.times|second2clock}}
                </template>
                <template v-else>-</template>
              </td>
              <td>{{v.date|substr(11,8,0)}}</td>
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
      mid: '-',
      total: '0',
      order: '0', // 我的排名
      orderSign: -1,
      orderIndex: 0,
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
        api.activity.examination
          .order({
            ID: self.$route.params.id || 0,
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 30 }
          })
          .then(res => {
            console.log('loadData res:', res);
            if (res.Data.list && res.Data.list.length > 0) {
              res.Data.list = res.Data.list.map(v => {
                if (v.sign !== self.orderSign) {
                  self.orderIndex++;
                  self.orderSign = v.sign;
                }
                v.order = self.orderIndex;
                return { ...v };
              });
              self.list = [...self.list, ...res.Data.list];
              self.total = res.Data.RowCount || 0;
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
        // .catch(e => {
        //   self.$vux.loading.hide();
        //   self.$vux.confirm.show({
        //     title: '获取不到排名',
        //     content: e.message || e.Message || '接口数据错误',
        //     confirmText: '返回上一页',
        //     cancelText: '关闭提示',
        //     onConfirm() {
        //       self.$router.go(-1);
        //     }
        //   });
        //   console.log(e);
        // });
        api.activity.examination
          .myOrder({
            ID: self.$route.params.id || 0
          })
          .then(res => {
            self.order = res.Data.order || 0;
          });
      }
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.mid = self.session('userSystem').ID || '';
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-zhishijingsai-order {
  padding 10px
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
  min-height 200px
  background-color #fff
  border-radius 5px
  box-shadow 0 3px 5px rgba(0, 0, 0, 0.3)
  list-style none
  padding 10px 0 20px
  dt {
    font-size 12px
    padding 10px 15px
    .myOrder {
      strong {
        font-weight normal
        color rgb(252, 95, 90)
      }
    }
    .total {
      float right
    }
    .number {
      float right
      color rgb(252, 95, 90)
    }
    .text {
      display block
      background url('/static/img/choujiangzhuanqu/notice.png')
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
    padding 0
    font-size 14px
    table.data {
      width 100%
      text-align center
      border-collapse collapse
      line-height 2
      tr {
        &.i_1 {
          color #CC0000
        }
        &.i_2 {
          color #FF9800
        }
        &.i_3 {
          color #2196F3
        }
        &.active {
          background-color #ffeae9
        }
      }
    }
  }
}
</style>
