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
    userInfo: {
      user: {
        ID: '',
        UserName: '',
        DefaultUserTypeId: '',
        UserTypes: []
      },
      wechat: {
        id: '',
        subscribe: '',
        openid: '',
        unionid: '',
        nickname: '',
        sex: '',
        language: '',
        city: '',
        province: '',
        country: '',
        headimgurl: '',
        subscribe_time: '',
        remark: '',
        groupid: '',
        tagid_list: '',
        latitude: '',
        longitude: '',
        precision: ''
      }
    }
  },
  mutations: {
    // 设置当前激活的tab，json: 哪个 tabbar 的哪个 tab
    setTabActive(state, json) {
      state.tabActive[json.tab] = json.index;
    },
    // 设置当前激活的tab
    setTabbarActive(state, index) {
      state.tabbarActive = index;
    },
    setUserInfo(state, json) {
      state.userInfo = json;
    },
    setWechatUserInfo(state, json) {
      state.userInfo.wechat = json;
    },
    setSystemUserInfo(state, json) {
      state.userInfo.user = json;
    }
  }
});

export default store;
