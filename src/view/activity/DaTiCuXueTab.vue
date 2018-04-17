<template>
  <tab v-model="tabIndex" active-color="#f17474">
    <tab-item selected @on-item-click="switchTab('list')">答题练习</tab-item>
    <tab-item @on-item-click="switchTab('records')">学习记录</tab-item>
  </tab>
</template>

<script>
import { Tab, TabItem } from 'vux';

export default {
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    switchTab(to) {
      let path = '/activity/daticuxue/' + to;
      console.log(path);
      this.$router.push({ path: path });
    },
    setTabItemActive(target) {
      if (target.path === '/activity/daticuxue/list') {
        this.tabIndex = 0;
      } else if (target.path === '/activity/daticuxue/records') {
        this.tabIndex = 1;
      } else {
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.setTabItemActive(this.$route);
    });
  },
  watch: {
    $route(to) {
      // console.log('\narticle/index.vue watch $route.to', to);
      this.setTabItemActive(to);
    }
  }
};
</script>
