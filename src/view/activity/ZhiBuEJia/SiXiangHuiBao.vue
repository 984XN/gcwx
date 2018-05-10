<template>
  <div class="page-activity-zhibuejia-xindetihui">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" name="tab"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="page"></router-view>
      <router-view v-if="$route.meta.keepAlive" name="detail"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" name="tab"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="page"></router-view>
    <router-view v-if="!$route.meta.keepAlive" name="detail"></router-view>
  </div>
</template>
