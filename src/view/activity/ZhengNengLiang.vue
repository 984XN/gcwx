<template>
  <div class="page-activity-zhibuejia-zhengnengliang">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="list"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="form"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="list"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="form"></router-view>
  </div>
</template>
