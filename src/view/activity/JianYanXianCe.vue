<template>
  <div class="page-activity-jianyanxiance">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="tab"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="form"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="records"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="detail"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="tab"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="form"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="records"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="detail"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.page-activity-jianyanxiance {
  height 100%
  overflow auto
}
</style>
