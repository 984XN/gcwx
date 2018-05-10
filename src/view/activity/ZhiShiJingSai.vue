<template>
  <div class="page-activity-zhishijingsai">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="stylus">
.page-activity-zhishijingsai {
  height 100%
  overflow auto
}
</style>
