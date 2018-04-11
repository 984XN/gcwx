import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tabItemActive: {
      article: 0,
      activity: 0,
      user: 0
    },
    userInfo: {}
  },
  mutations: {
    // 设置当前激活的tab
    setTabActive(state, json) {
      this.state.tabItemActive[json.tab] = json.index;
      // console.log(new Date().getTime(), 'store.setTabActive', json);
    }
  }
});

export default store;
