<template>
  <div class="turntable">
    <div class="gifts" :style="styleCube" ref="gifts">
      <ol :style="styleCube">
        <li v-for="(gift,n) in gifts" :key="n" :style="style[n]" class="gift">
          <div class="box">
            <div class="img"><img :src="gift.img"></div>
            <div class="name">{{gift.name}}</div>
          </div>
        </li>
      </ol>
      <div class="control" :style="styleControl">
        <button class="run" @click="luckDraw">
          <div class="text">立即抽奖</div>
          <div class="tip">200积分/次</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.turntable {
  background-color #d63e50
  padding 20px
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
          box-shadow 0 0 0 3px #fddf13
          position relative
          z-index 1
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
}
</style>

<script>
export default {
  computed: {
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
      cube: {
        itemWidth: 75,
        itemHeight: 75,
        col: 4,
        row: 4
      },
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
    luckDraw: function() {
      let total = this.gifts.length;
      for (let i = 0; i < total; i++) {}
      console.log(this.$refs.gifts);
    }
  }
};
</script>
