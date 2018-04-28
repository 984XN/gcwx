<template>
  <div class="container" ref="container" :style="style" @touchstart.self="touchstart" @touchmove.self="touchmove" @touchend.self="touchend" @scroll.self="scroll">
    <div class="container-body">
      <slot></slot>
      <load-more :show-loading="true" v-show="lazyload.enable && lazyload.loading" tip="正在获取数据"></load-more>
      <load-more :show-loading="false" v-show="lazyload.enable && lazyload.nodata" tip="底线"></load-more>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  position absolute
  left 0
  top 44px
  right 0
  bottom 50px
  overflow auto
  overflow-scrolling touch
  -webkit-overflow-scrolling touch
}
</style>

<script>
export default {
  props: {
    top: null,
    bottom: null,
    lazyload: {
      default: () => {
        return {
          enable: false,
          nodata: false,
          loading: false,
          page: 0
        };
      }
    }
  },
  data() {
    return {
      status: {
        loadHandel: null,
        container: {
          height: () => {
            return this.$refs.container.clientHeight;
          },
          scrollTop: 0
        },
        list: {
          height: () => {
            return this.$refs.container.querySelector('.container-body')
              .offsetHeight;
          }
        },
        data: { page: 0 },
        scroll: { bottom: false },
        touch: {
          touching: false,
          coordinate: {
            start: { x: null, y: null },
            end: { x: null, y: null }
          }
        }
      }
    };
  },
  computed: {
    style: function() {
      let style = {
        top: '44px',
        bottom: '50px'
      };
      if (this.top !== undefined) {
        style.top = this.top + 'px';
      }
      if (this.bottom !== undefined) {
        style.bottom = this.bottom + 'px';
      }
      return style;
    }
  },
  methods: {
    scroll(e) {
      let self = this;
      let container = self.$refs.container;
      if (self.lazyload.enable !== true) return false;
      self.status.container.scrollTop = container.scrollTop;
      // self.status.list.height = container.querySelector(
      //   '.container-body'
      // ).offsetHeight;
      // console.log(
      //   self.status.container.scrollTop + self.status.container.height(),
      //   self.status.list.height() - 100,
      //   !self.nodata
      // );
      // 距离 100 像素触底时加载数据
      if (
        self.status.container.scrollTop + self.status.container.height() >
          self.status.list.height() - 100 &&
        self.lazyload.nodata !== true
      ) {
        // console.log('loadData by scroll');
        self.$emit('loadData');
      }
    },
    touchstart(e) {
      // console.log('touchstart', e);
      var self = this;
      let x = e.touches[0].pageX || 0;
      let y = e.touches[0].pageY || 0;
      self.status.touch.coordinate.start = { x, y };
    },
    touchmove(e) {
      // 获取松开时的坐标，touchend 时没有坐标了，不能写到 touchend 里
      var self = this;
      let x = e.touches[0].pageX || 0;
      let y = e.touches[0].pageY || 0;
      self.status.touch.touching = true;
      self.status.touch.coordinate.end = { x, y };
    },
    touchend(e) {
      var self = this;
      let direction = self.getTouchDirection();
      console.log('direction:', direction, 'scrollBottom:', self.scrollBottom);
    },
    touchcancel(e) {
      console.log('touchcancel', e);
      var self = this;
      self.status.touch.coordinate = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 }
      };
    },
    getTouchDirection() {
      var self = this;
      var startPoint = self.status.touch.coordinate.start;
      var endPoint = self.status.touch.coordinate.end;
      var deviation = 80; // 最短移动距离、误差
      var rate = 4; // 移动距离与垂直移动距离的倍差
      var h = startPoint.x - endPoint.x;
      var v = startPoint.y - endPoint.y;
      var hMove = false;
      var vMove = false;
      var direction = {
        left: false,
        top: false,
        right: false,
        bottom: false
      };
      // 水平滑动还是垂直滑动，没有斜向
      var absH = Math.abs(h);
      var absV = Math.abs(v);
      if (absH >= absV * rate) {
        // 水平移动距离大于 rate 倍的垂直移动距离时视为水平滑动
        hMove = true;
      }
      if (absV >= absH * rate) {
        // 垂直移动距离大于 rate 倍的水平移动距离时视为垂直滑动
        vMove = true;
      }
      // 水平滑动时翻页
      if (hMove && absH >= deviation) {
        if (h > 0) {
          direction.left = absH;
        } else if (h < 0) {
          direction.right = absH;
        }
      }
      // 垂直滑动时
      if (vMove && absV >= deviation) {
        if (v > 0) {
          direction.top = absV;
        } else if (v < 0) {
          direction.bottom = absV;
        }
      }
      return direction;
    }
  },
  mounted() {
    this.$nextTick(function() {
      let self = this;
      // let elm = this.$el;
      // let container = this.$refs.container;
      // self.status.container.height = container.clientHeight;
      // 加载数据
      self.$emit('loadData');
      // if (self.status.list.height < self.status.container.height) {
      //   console.log('mounted.把数据加载够一屏ing...');
      // }
      // self.status.loadHandel = setInterval(() => {
      //   self.status.list.height = container.querySelector(
      //     '.container-body'
      //   ).offsetHeight;
      //   if (
      //     self.status.list.height < self.status.container.height &&
      //     self.loading !== true
      //   ) {
      //     if (self.nodata !== true) {
      //       self.status.data.page += 1;
      //       console.log('mounted.把数据加载够一屏ing...');
      //       self.$emit('loadData');
      //     } else {
      //       console.log('mounted.把数据加载够一屏_没有数据了...');
      //       clearInterval(self.status.loadHandel);
      //     }
      //   }
      // }, 1000);
    });
  }
};
</script>
