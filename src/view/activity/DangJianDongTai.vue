<template>
  <div class="page-activity-dangjiandongtai">
    <router-view name="tab"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="list"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="detail"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="list"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="detail"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.page-activity-dangjiandongtai {
  height 100%
  overflow auto
}
</style>
