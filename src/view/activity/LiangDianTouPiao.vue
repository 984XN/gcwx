<template>
  <div class="page-activity-liangdiantoupiao">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="list"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="items"></router-view>
      <router-view v-if="$route.meta.keepAlive">liangdiantoupiao-router-view-default</router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="list"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="items"></router-view>
    <router-view v-if="!$route.meta.keepAlive">liangdiantoupiao-router-view-default</router-view>
  </div>
</template>
