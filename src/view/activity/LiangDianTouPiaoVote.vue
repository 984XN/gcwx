<template>
  <div class="page-activity-liangdiantoupiao-vote">
    <div class="banner">
      <div class="title">3.12植树节</div>
      <div class="subTitle">绿化环境，美化人生</div>
      <form class="search">
        <input type="text" placeholder="请输入编号或关键字">
        <button>
          <i class="iconfont icon-search"></i>
        </button>
      </form>
      <div class="tip">友情提示：每位用户只有一次投票机会</div>
    </div>
    <ol class="voteList">
      <router-link to="../detail/56" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/57" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/59" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="!true" mini type="warn">投票</x-button>
          <x-button v-if="true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/71" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/74" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/75" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
      <router-link to="../detail/76" tag="li" class="vote">
        <div class="baseInfo">
          <img src="" alt="" class="thumb">
          <div class="title">春回大地植树忙 省体育局开展了植树活动</div>
        </div>
        <div class="attr">
          <div class="votes">票数：4125</div>
          <div class="index">编号：018</div>
        </div>
        <div class="control">
          <x-button v-if="true" mini type="warn">投票</x-button>
          <x-button v-if="!true" mini disabled>已投</x-button>
          <div class="order">排名：1</div>
        </div>
      </router-link>
    </ol>
  </div>
</template>

<script>
import { XButton } from 'vux';

export default {
  components: {
    XButton
  },
  mounted() {
    console.log('$route.params:', this.$route.params);
  }
};
</script>

<style lang="stylus" scoped>
.banner {
  background-color #C00
  background linear-gradient(#C00 70%, transparent)
  color #FFF
  padding 30px 0 100px
  text-align center
  line-height 1.2
  .title {
    font-size 48px
  }
  .subTitle {
    margin 10px
    font-size 12px
  }
  .search {
    width 60%
    margin 20px auto
    background-color #fff
    padding-right 50px
    position relative
    border-radius 25px
    overflow hidden
    input {
      display block
      width 100%
      height 40px
      line-height 40px
      box-sizing border-box
      border none
      background none
      outline none
      padding-left 18px
      font-size 14px
    }
    button {
      position absolute
      right 0
      top 0
      box-sizing border-box
      width 50px
      height 40px
      background none
      border none
    }
  }
  .tip {
    font-size 12px
    padding-bottom 10px
    color #ffffffbd
  }
}
.voteList {
  margin -100px 10px 10px
  border-radius 5px
  padding 5px
  background-color #fff
  list-style none
  &:after {
    content ''
    display block
    clear both
  }
  .vote {
    padding 5px
    box-sizing border-box
    width 50%
    float left
    .baseInfo {
      position relative
      &:after {
        content ''
        display block
        clear both
      }
      .thumb {
        display block
        width 100%
        min-height 120px
        float left
        background-color #C00
        border-radius 5px
      }
      .title {
        position absolute
        left 0
        right 0
        bottom 0
        padding 5px
        background-color rgba(0, 0, 0, 0.3)
        color #FFF
        font-size 12px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
      }
    }
    .attr {
      font-size 12px
      color #999
      padding 5px 0
      .votes {
        float right
      }
    }
    .control {
      line-height 2.3
      font-size 12px
      .order {
        color #E64340
        font-size 14px
      }
      button {
        float right
      }
    }
  }
}
</style>
