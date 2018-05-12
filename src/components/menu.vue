<template>
  <tabbar v-model="tabbarIndex" @on-index-change="onIndeChang" class="menu-main">
    <tabbar-item @on-item-click="jumpTo(tab)" v-for="(tab,n) in tabs" :key="n" :disabled="!hasPower(tab.allowRole)">
      <img slot="icon" :src="tab.icon">
      <img slot="icon-active" :src="tab.iconActive">
      <span slot="label">
        {{tab.name}}
        <i class="iconfont icon-lock" v-if="!hasPower(tab.allowRole)"></i>
      </span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      tabbarIndex: 0,
      currentTab: 'article',
      tabs: [
        {
          name: '学习平台',
          route: '/article',
          icon: require('src/assets/img/tab1.png'),
          iconActive: require('src/assets/img/tab1_active.png'),
          allowRole: 'all'
        },
        {
          name: '互动专区',
          route: '/activity',
          icon: require('src/assets/img/tab2.png'),
          iconActive: require('src/assets/img/tab2_active.png'),
          allowRole: 'member'
        },
        {
          name: '个人中心',
          route: '/user',
          icon: require('src/assets/img/tab3.png'),
          iconActive: require('src/assets/img/tab3_active.png'),
          allowRole: 'all'
        }
      ]
    };
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    onIndeChang(val, oldVal) {
      let self = this;
      if (!self.hasPower(self.tabs[val].allowRole)) {
        // vux 的 tabbar 不能立即更新这个 tabbarIndex 值（已验证），所以加个 timeout
        setTimeout(() => {
          self.tabbarIndex = oldVal;
        }, 200);
      }
    },
    jumpTo(tab) {
      let self = this;
      if (self.hasPower(tab.allowRole)) {
        self.$router.push({ path: tab.route });
      } else {
        self.$vux.confirm.show({
          title: '仅党员可用',
          content: '你没有使用这个功能的权限，请先绑定党员帐号',
          confirmText: '绑定党员',
          cancelText: '关闭提示',
          onConfirm() {
            self.$router.replace({
              path: '/user/wechat/binding'
            });
          }
        });
      }
      return false;
    },
    setMenuIndex() {
      let self = this;
      // 激活路由对应的 tabItem 项
      let tabRoute = self.$route.matched[0].path;
      let index = 0;
      for (let i = 0; i < self.tabs.length; i++) {
        if (tabRoute === self.tabs[i].route) {
          index = i;
          break;
        }
      }
      self.tabbarIndex = index;
      self.$store.commit('setTabbarActive', index);
    }
  },
  mounted() {
    // console.log('Menu mounted.');
    let self = this;
    this.$nextTick(() => {
      self.setMenuIndex();
    });
  },
  activated() {
    // console.log('Menu activated.');
    let self = this;
    self.setMenuIndex();
  }
};
</script>
