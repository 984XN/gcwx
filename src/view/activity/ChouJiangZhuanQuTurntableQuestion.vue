<template>
  <container bottom="0" class="page-activity-choujiangzhuanqu-turntable">
    <div class="banner">
      <img src="./img/choujiangzhuanqu/banner_question.png">
    </div>
    <div class="nameList">
      <marquee>
        <marquee-item v-for="i in 5" :key="i">
          <span class="date">15:15:34</span>
          恭喜刘t阳抽中“吸尘器”一台
        </marquee-item>
      </marquee>
    </div>
    <div class="pageTitle">
      <div class="text">幸运大转盘</div>
    </div>
    <Turntable :score="1" :price="1" unit="次数" :gifts="gifts" :gift="giftIndex" @update:giftIndex="update"></Turntable>
    <dl class="rule">
      <dt>活动规则</dt>
      <dd>
        <ol>
          <li>1. 若中奖奖品为实物商品，客服核实信息之后将于10个工作日内安排发货。</li>
          <li>2. 若奖品为积分，系统在72小时内发到账户，可在“我的积分”中查看。</li>
          <li>3. 最终解释权归”藁城区智慧党建“所有。</li>
        </ol>
      </dd>
    </dl>
  </container>
</template>

<script>
import { Marquee, MarqueeItem } from 'vux';
import Turntable from 'src/components/turntable';

export default {
  components: {
    Marquee,
    MarqueeItem,
    Turntable
  },
  data() {
    return {
      giftIndex: 11,
      gifts: [
        {
          id: 10,
          name: '麝香毛巾',
          img: '/static/img/gift/011.png'
        },
        {
          id: 10,
          name: '洗洁精500ml',
          img: '/static/img/gift/012.png'
        },
        {
          id: 10,
          name: '吸尘器',
          img: '/static/img/gift/013.png'
        },
        {
          id: 10,
          name: '麝香毛巾',
          img: '/static/img/gift/011.png'
        },
        {
          id: 10,
          name: '洗衣液500ml',
          img: '/static/img/gift/014.png'
        },
        {
          id: 10,
          name: '100积分',
          img: '/static/img/gift/020.png'
        },
        {
          id: 10,
          name: '100积分',
          img: '/static/img/gift/020.png'
        },
        {
          id: 10,
          name: '牙膏250ml',
          img: '/static/img/gift/017.png'
        },
        {
          id: 10,
          name: '自动洗衣机',
          img: '/static/img/gift/018.png'
        },
        {
          id: 10,
          name: '50积分',
          img: '/static/img/gift/019.png'
        },
        {
          id: 10,
          name: '电饭煲',
          img: '/static/img/gift/015.png'
        },
        {
          id: 10,
          name: '麝香毛巾',
          img: '/static/img/gift/011.png'
        }
      ]
    };
  },
  methods: {
    update(giftIndex = 0) {
      this.giftIndex = giftIndex;
      console.log('methods.update:giftIndex to:', giftIndex);
    }
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
    background url('img/choujiangzhuanqu/notice.png')
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
    }
  }
}
</style>
