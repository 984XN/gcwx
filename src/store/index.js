import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tabbarActive: 0, // 底部的 tabbar，即：学习平台、互动专区、个人中心
    tabActive: {
      // 底部 tab 的 顶部 tab
      article: 0,
      activity: 0,
      user: 0
    },
    userInfo: {}
  },
  mutations: {
    // 设置当前激活的tab，json: 哪个 tabbar 的哪个 tab
    setTabActive(state, json) {
      this.state.tabActive[json.tab] = json.index;
    },
    // 设置当前激活的tab
    setTabbarActive(state, index) {
      this.state.tabbarActive = index;
    }
  }
});

export default store;
