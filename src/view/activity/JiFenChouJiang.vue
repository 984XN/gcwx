<template>
  <div class="page-activity-jifenchoujiang">
    <router-view name="turntable"></router-view>
    <router-view name="records"></router-view>
    <router-view name="tab"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.page-activity-jifenchoujiang {
  height 100%
  position relative
}
.vux-tab-wrap {
  position fixed
  left 0
  right 0
  bottom 0
}
</style>
