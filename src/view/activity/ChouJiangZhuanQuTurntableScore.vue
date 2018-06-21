<template>
  <container bottom="0" class="page-activity-choujiangzhuanqu-turntable">
    <div class="banner">
      <img src="/static/img/choujiangzhuanqu/banner_score.jpg">
    </div>
    <div class="nameList">
      <marquee v-if="winningList.length">
        <marquee-item v-for="(v,i) in winningList" :key="i">
          <span class="date">{{v.date|substr(0,10,false)}}</span>
          {{v.name|substr(0,3)}}抽中了{{v.gift|substr(0,5)}}
        </marquee-item>
      </marquee>
      <template v-else>暂无中奖记录</template>
    </div>
    <div class="pageTitle">
      <div class="text">幸运大转盘</div>
    </div>
    <Turntable :jeton.sync="jeton" :price="price" :unit="unit" :gifts="gifts" :gift="giftId" :ready.sync="ready" @getGift="getGift"></Turntable>
    <dl class="rule">
      <dt>活动规则</dt>
      <dd>
        <ol>
          <li>1. 若中奖奖品为实物商品，客服核实信息之后将于10个工作日内安排发货。</li>
          <li>2. 若奖品为积分，系统在72小时内发到账户，可在“我的积分”中查看。</li>
          <li>3. 最终解释权归“藁城区智慧党建”所有。</li>
        </ol>
      </dd>
    </dl>
    <dl class="rule">
      <dt>奖品清单</dt>
      <dd>
        <ol>
          <li v-for="(v,i) in gifts" :key="i">{{i+1}}. {{v.name}}</li>
        </ol>
      </dd>
    </dl>
  </container>
</template>

<script>
import { Marquee, MarqueeItem } from 'vux';
import Turntable from 'src/components/turntable';
import * as api from 'src/api/activity';

export default {
  components: {
    Marquee,
    MarqueeItem,
    Turntable
  },
  data() {
    return {
      rid: 0,
      jeton: 0,
      price: 1,
      unit: '次',
      giftId: -1,
      gifts: [],
      ready: false,
      winningList: []
    };
  },
  methods: {
    // update(giftId = 0) {
    //   this.giftId = giftId;
    //   console.log('methods.update:giftId to:', giftId);
    // }
    getGift() {
      let self = this;
      if (self.jeton < self.price) {
        self.$vux.alert.show({
          title: this.unit + '数不够',
          content:
            '每次需要扣除' +
            this.price +
            this.unit +
            '，剩余' +
            this.unit +
            '数为' +
            this.jeton
        });
        // console.log(this.unit + '不够');
        self.ready = 'cancel';
        return false;
      }
      self.$vux.loading.show({
        text: '准备中'
      });
      api.activity.ChouJiangZhuanQu.gift({
        Type: 1, // 1.积分抽奖, 2.答题促学抽奖
        RID: self.rid // 2.答题促学抽奖时答题记录的ID，积分抽奖时不需要传
      })
        .then(res => {
          // console.log('getGift:', res);
          if (res.StatusCode === 1200) {
            self.ready = true;
            self.giftId = res.Data || -1;
            console.log('getGift:', res);
            if (self.giftId === -1) {
              self.$vux.alert.show({
                title: '数据错误',
                content: res.Message
              });
            }
          } else {
            self.$vux.alert.show({
              title: '数据错误',
              content: res.Message
            });
          }
        })
        .catch(e => {
          this.ready = 'cancel';
          this.$vux.confirm.show({
            title: '提示',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              this.$router.go(-1);
            }
          });
        });
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.rid = self.$route.query.rid || 0;
      // 获取奖品清单
      api.activity.ChouJiangZhuanQu.gifts({
        Type: 1 // 1.积分商品, 2.答题促学商品
      }).then(res => {
        self.jeton = res.Data.residueDegree || 0;
        self.gifts = res.Data.goods.map(val => {
          return {
            id: val.ID,
            name: val.GoodsName,
            img: val.GoodsImgPath
          };
        });
        // 这个 unshift 移入 api/activity.js 中了
        // self.gifts.unshift({
        //   // 放在开头可以防止奖品过多截取时缺少空奖
        //   id: 1,
        //   name: '谢谢参与',
        //   img: '/static/img/gift/default.jpg'
        // });
        self.gifts.sort((a, b) => {
          return b.id - a.id;
        });
        // self.getGift();
      });
      // 获取中奖名单
      api.activity.ChouJiangZhuanQu.list({
        queryModel: {
          WinningType: 1 // number 1.积分抽奖的, 2.答题抽奖的
        },
        pageModel: { Page: 1, Start: 0, Limit: 50 },
        api: 'all'
      }).then(res => {
        self.winningList = res.Data.list;
        // console.log('中奖名单:', res.Data.list);
      });
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-choujiangzhuanqu-turntable {
  background-color #fbc40f
}
.banner {
  background-color #f94240
  &:after {
    content ''
    display block
    clear both
  }
  img {
    width 100%
    float left
  }
}
.nameList {
  padding 10px 18%
  background-color #d22b3f
  color #fbc40f
  position relative
  font-size 14px
  &:after {
    content ''
    display block
    position absolute
    top -10px
    left 8%
    width 50px
    height 33px
    background url('/static/img/choujiangzhuanqu/notice.png')
    background-size contain
  }
  .date {
    float right
  }
}
.pageTitle {
  margin 10px 40px 18px
  color #d22b3f
  font-size 16px
  line-height 20px
  height 10px
  border-bottom 1px solid #d22b3f
  .text {
    background-color #fbc40f
    margin 0 auto
    width 8em
    text-align center
    position relative
    &:before,
    &:after {
      padding 0 0.5em
    }
    &:before {
      content '●'
    }
    &:after {
      content '●'
    }
  }
}
.rule {
  border 1px dashed #b18700
  padding 15px
  border-radius 5px
  margin 20px
  dt {
    font-size 12px
    color #fbc40f
    background-color #d22b3f
    padding 0.5em 1em
    float left
    line-height 1
  }
  dd {
    padding-top 10px
    clear both
    font-size 9px
    ol {
      list-style none
      color #000
      word-wrap break-word
      word-break break-all
    }
  }
}
</style>
