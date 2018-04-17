<template>
  <div class="turntable">
    <div class="jeton">
      <router-link class="expenditure" to="deatil" replace>中奖详情</router-link>
      <div class="value">剩余积分：{{jeton}}</div>
    </div>
    <div class="decoration">
      <div class="bg"></div>
      <div class="dot">
        <div v-for="num in 100" :key="num"></div>
      </div>
      <div class="mask"></div>
    </div>
    <div class="gifts" :style="styleCube" ref="gifts">
      <ol :style="styleCube">
        <li v-for="(gift,n) in gifts" :key="n" :style="style[n]" class="gift" :class="'gift-'+n">
          <div class="box">
            <div class="img"><img :src="gift.img"></div>
            <div class="name">{{gift.name}}</div>
          </div>
        </li>
      </ol>
      <div class="control" :style="styleControl">
        <button class="run" @click="luckDraw">
          <div class="text">立即抽奖</div>
          <div class="tip">{{price}}积分/次</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AlertModule } from 'vux';

export default {
  props: {
    gift: Number, // 指定中哪个奖（required）
    gifts: Array, // 转盘物品清单（奖品会重复）
    score: Number, // 积分总数
    price: Number // 每转一次扣这个数
  },
  methods: {
    luckDraw: function() {
      let self = this;
      let total = self.gifts.length;
      let turntableObj = self.$refs.gifts;
      let turntableInitData = JSON.parse(JSON.stringify(self.turntable));
      // console.log(self.$refs.gifts);
      if (self.turntable.runing) {
        console.log('转盘运行中');
        return;
      }
      if (self.jeton < self.price) {
        AlertModule.show({
          title: '积分不够',
          content:
            '每次需要扣除' + this.price + '积分，剩余积分为' + this.jeton,
          onShow() {
            console.log("Module: I'm showing");
          },
          onHide() {
            console.log("Module: I'm hiding now");
          }
        });
        console.log('积分不够');
        return;
      }
      self.turntable.runing = true;
      function roll() {
        let timesIndex = self.turntable.timesIndex;
        let speedFrom = 30;
        let speedTo = 500;
        let speedStep = 0;
        if (timesIndex > self.turntable.times - 1) {
          speedStep = Math.floor(
            (speedTo - speedFrom) / (total + self.giftIndex)
          );
          self.turntable.speed += speedStep;
        } else {
          self.turntable.speed = speedFrom;
        }
        // console.log('speed:', speed, 'timesIndex:', timesIndex, speedStep);
        if (
          timesIndex > self.turntable.times &&
          self.turntable.index >= self.giftIndex
        ) {
          // console.log(
          //   `转够 ${self.turntable.timesIndex} 圈了，清除 ${
          //     self.turntable.timer
          //   }`
          // );
          clearTimeout(self.turntable.timer);
          self.turntable = turntableInitData;
          // console.log('self.turntable:', self.turntable);
          // 扣除积分
          self.jeton -= self.price;
          console.log('抽奖完成，剩余积分：', self.jeton);
          // 保存抽奖记录
          // todo
          return false;
        } else {
          // 第一次时是从-1开始转
          self.turntable.index++;
          let i = self.turntable.index;
          // 去除 其它 .box 的 active
          turntableObj.querySelectorAll('.gift .box').forEach(element => {
            element.className = 'box';
          });
          // 设置 active
          turntableObj.querySelector('.gift-' + i + ' .box').className =
            'box active';
          // 检测 activeIndex 是否超出一圈的最大 index
          if (i >= total - 1) {
            self.turntable.index = -1;
            self.turntable.timesIndex++;
            // console.log('timesIndex:', self.turntable.timesIndex);
          }
        }
        self.turntable.timer = setTimeout(roll, self.turntable.speed);
        // console.log(self.turntable.timer);
        return false;
      }
      roll();
    }
  },
  computed: {
    giftIndex: function() {
      return this.gift;
    },
    styleCube: function() {
      return {
        width: this.cube.itemWidth * this.cube.col + 'px',
        height: this.cube.itemHeight * this.cube.row + 'px'
      };
    },
    styleControl: function() {
      let style = {
        left: this.cube.itemWidth + 'px',
        top: this.cube.itemHeight + 'px',
        width: this.cube.itemWidth * (this.cube.col - 2) + 'px',
        height: this.cube.itemHeight * (this.cube.row - 2) + 'px'
      };
      return style;
    },
    style: function() {
      let style = [];
      let itemWidth = this.cube.itemWidth;
      let itemHeight = this.cube.itemHeight;
      let row = this.cube.row;
      let col = this.cube.col;
      let index = 0;
      for (let i = 1; i < col; i++) {
        style[index] = {
          left: (i - 1) * itemWidth,
          top: 0
        };
        // console.log([1, i], style[index]);
        index++;
      }
      for (let j = 1; j < row; j++) {
        style[index] = {
          left: (col - 1) * itemWidth,
          top: (j - 1) * itemHeight
        };
        // console.log([j, col], style[index]);
        index++;
      }
      for (let k = col; k > 1; k--) {
        style[index] = {
          left: (k - 1) * itemWidth,
          top: (col - 1) * itemHeight
        };
        // console.log([row, k], style[index]);
        index++;
      }
      for (let l = row; l > 1; l--) {
        style[index] = {
          left: 0,
          top: (l - 1) * itemHeight
        };
        // console.log([l, 1], style[index]);
        index++;
      }
      // this.gifts = this.gifts.slice(0, index);
      style = style.map(function(cur, i, style) {
        cur.width = itemWidth;
        cur.height = itemHeight;
        for (const key in cur) {
          if (cur.hasOwnProperty(key)) {
            cur[key] += 'px';
          }
        }
        return cur;
      });
      // console.log(style);
      return style;
    }
  },
  data() {
    return {
      jeton: this.score,
      // 转盘控制属性
      turntable: {
        index: -1, // 转动时的当前项
        speed: 0,
        timer: 0, // setTimeout
        stop: -1, // 中奖位置
        timesIndex: 0, // 当前转的次数
        times: 3, // 转够这个次数再开始往奖品那里转
        runing: false
      },
      // 转盘外观设置
      cube: {
        itemWidth: 75, // mounted() 会根据设备宽度重新设置这个值
        itemHeight: 75,
        col: 4,
        row: 4
      }
      // 奖品清单
      // gifts: [
      //   {
      //     id: 10,
      //     name: '麝香毛巾',
      //     img: '/static/img/gift/011.png'
      //   },
      //   {
      //     id: 10,
      //     name: '洗洁精500ml',
      //     img: '/static/img/gift/012.png'
      //   },
      //   {
      //     id: 10,
      //     name: '吸尘器',
      //     img: '/static/img/gift/013.png'
      //   },
      //   {
      //     id: 10,
      //     name: '麝香毛巾',
      //     img: '/static/img/gift/011.png'
      //   },
      //   {
      //     id: 10,
      //     name: '洗衣液500ml',
      //     img: '/static/img/gift/014.png'
      //   },
      //   {
      //     id: 10,
      //     name: '100积分',
      //     img: '/static/img/gift/020.png'
      //   },
      //   {
      //     id: 10,
      //     name: '100积分',
      //     img: '/static/img/gift/020.png'
      //   },
      //   {
      //     id: 10,
      //     name: '牙膏250ml',
      //     img: '/static/img/gift/017.png'
      //   },
      //   {
      //     id: 10,
      //     name: '自动洗衣机',
      //     img: '/static/img/gift/018.png'
      //   },
      //   {
      //     id: 10,
      //     name: '50积分',
      //     img: '/static/img/gift/019.png'
      //   },
      //   {
      //     id: 10,
      //     name: '电饭煲',
      //     img: '/static/img/gift/015.png'
      //   },
      //   {
      //     id: 10,
      //     name: '麝香毛巾',
      //     img: '/static/img/gift/011.png'
      //   }
      // ]
    };
  },
  mounted() {
    this.$nextTick(function() {
      let cubeWidth = Number.parseInt(
        document.defaultView.getComputedStyle(
          document.querySelector('.turntable')
        )['width']
      );
      let itemWidth = Math.floor(cubeWidth / this.cube.col);
      this.cube.itemWidth = itemWidth;
      console.log('itemWidth:', itemWidth, ' by mounted');
    });
  }
};
</script>

<style lang="stylus" scoped>
@keyframes light1 {
  0% {
    background-color #c00
  }
  33% {
    background-color #8bc34a
  }
  66% {
    background-color #fddf13
  }
}
@keyframes light2 {
  0% {
    background-color #fddf13
  }
  33% {
    background-color #c00
  }
  66% {
    background-color #8bc34a
  }
}
@keyframes light3 {
  0% {
    background-color #8bc34a
  }
  33% {
    background-color #fddf13
  }
  66% {
    background-color #c00
  }
}
.turntable {
  background-color #d63e50
  padding 50px 40px 40px
  margin 20px
  border-radius 10px
  position relative
  .gifts {
    margin 0 auto
    position relative
    ol {
      list-style none
      position relative
    }
    .gift {
      position absolute
      width 60px
      height 60px
      box-sizing border-box
      .box {
        position absolute
        left 1px
        top 1px
        right 1px
        bottom 1px
        padding 1px
        border-radius 5px
        background-color #FFF
        overflow hidden
        text-align center
        display flex
        flex-direction column
        white-space nowrap
        border-bottom 2px solid #f9bab8
        &.active {
          z-index 1
          box-shadow 0 0 0 3px #fddf13
          // box-shadow 0 0 0 3px #d63e50
          // background-color #fddf13
        }
        .img {
          display flex
          justify-content center
          overflow hidden
          img {
            height 50px
          }
        }
        .name {
          color #802520
          font-size 12px
          line-height 20px
        }
      }
    }
    .control {
      padding 10px
      position absolute
      box-sizing border-box
      .run {
        box-shadow 0 0 10px rgba(0, 0, 0, 0.3)
        display block
        outline none
        border-radius 5px
        background-color #fddf13
        background-image linear-gradient(-45deg, #fed515 25%, transparent 25%, transparent 50%, #fed515 50%, #fed515 75%, transparent 75%, transparent)
        background-size 20px 20px
        border none
        color #fc3b14
        width 100%
        height 100%
        &:active {
          box-shadow none
          color #b7290c
        }
        .text {
          font-size 28px
          line-height 1
          width 2em
          margin 0 auto
        }
        .tip {
          font-size 12px
          padding-top 5px
        }
      }
    }
  }
  .decoration {
    position absolute
    left 15px
    top 25px
    right 15px
    bottom 15px
    .dot {
      position absolute
      left -5px
      top -5px
      right -5px
      bottom -5px
      div {
        width 10%
        height 10%
        float left
        position relative
        &:before {
          content ''
          display block
          width 6px
          height 6px
          border-radius 50%
          background-color #C00
          position absolute
          left 50%
          top 50%
          margin-left -3px
          margin-top -3px
          animation light1 1s infinite ease-in-out
        }
        &:nth-child(3n+1) {
          &:before {
            background-color #fddf13
            animation light2 1s infinite ease-in-out
          }
        }
        &:nth-child(3n+2) {
          &:before {
            background-color #8BC34A
            animation light3 1s infinite ease-in-out
          }
        }
        &:nth-child(1):before {
          margin-left -1px
          margin-top -1px
        }
        &:nth-child(10):before {
          margin-left -5px
          margin-top -1px
        }
        &:nth-child(91):before {
          margin-left -1px
          margin-top -5px
        }
        &:nth-child(100):before {
          margin-left -5px
          margin-top -5px
        }
      }
    }
    .bg {
      position absolute
      left 1%
      top 1%
      right 1%
      bottom 1%
      background-color #fd5c57
      border-radius 5px
    }
    .mask {
      position absolute
      left 6%
      top 6%
      right 6%
      bottom 6%
      border-radius 5px
      background-color #eb3d34
    }
  }
  .jeton {
    position absolute
    top 10px
    left 25px
    right 25px
    z-index 1
    font-size 12px
    .value {
      color #fddf13
    }
    .expenditure {
      color #fddf13
      float right
    }
  }
}
</style>
