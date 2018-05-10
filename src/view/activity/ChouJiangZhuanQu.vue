<template>
  <div class="page-activity-choujiangzhuanqu">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="tab"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="turntable"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="records"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="tab"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="turntable"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="records"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.page-activity-choujiangzhuanqu {
  height 100%
  position relative
}
</style>
