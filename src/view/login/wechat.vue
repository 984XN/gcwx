<template>
  <div class="login-wechat">
    <div class="tipBox">
      <i class="iconfont icon-wechat"></i>
      <div class="text">登录中</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.login-wechat {
  height 100%
  background-color #fff
  display flex
  justify-content center
  align-items center
  .tipBox {
    padding 10px
    text-align center
    width 50vw
    position relative
    margin-top -40vh
    i {
      font-size 120px
      line-height 1
      color rgb(81, 195, 50)
    }
    .text {
      font-size 18px
      color #999
    }
  }
}
</style>
