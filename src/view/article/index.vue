<template>
  <div class="page page-article">
    <router-view name="tab"></router-view>
    <!-- <router-view name="page"></router-view>
    <router-view name="detail"></router-view> -->
    <keep-alive>
      <router-view name="page" v-if="$route.meta.keepAlive"></router-view>
      <router-view name="detail" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view name="page" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="detail" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="menu"></router-view>
  </div>
</template>
