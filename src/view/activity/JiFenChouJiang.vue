<template>
  <div class="page-activity-jifenchoujiang">
    <div class="banner">
      <img src="./img/jifenchoujiang/banner.png">
    </div>
    <div class="nameList">
      <marquee>
        <marquee-item v-for="i in 5" :key="i">
          <span class="date">15:15:34</span>
          恭喜刘t阳抽中“吸尘器”一台
        </marquee-item>
      </marquee>
    </div>
    <Turntable></Turntable>
  </div>
</template>

<script>
import { Marquee, MarqueeItem } from 'vux';
import Turntable from 'src/components/turntable'

export default {
  components: {
    Marquee,
    MarqueeItem,
    Turntable
  },
  data() {
    return {
      asyncCount: 0
    };
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-jifenchoujiang {
  height 100%
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
    background url('img/jifenchoujiang/notice.png')
    background-size contain
  }
  .date {
    float right
  }
}
</style>
