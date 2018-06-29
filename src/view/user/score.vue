<template>
  <div class="page page-user-score">
    <keep-alive>
      <router-view name="menu" v-if="$route.meta.keepAlive"></router-view>
      <router-view name="page" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view name="menu" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="page" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.page-user-score {
  height 100%
}
</style>
