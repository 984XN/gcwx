<template>
  <container top="0" bottom="0">
    <Article :article="article" @online="online"></Article>
  </container>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/activity';
// import { setTimeout, clearTimeout } from 'timers';

export default {
  components: {
    Article
  },
  data() {
    return {
      status: {
        viewed: false // 是否已经标记成了已读
      },
      setViewedThreshold: 30, // 这个秒数后访问量+1
      viewSecond: 0, // 已阅读秒数
      readyTime: null, // 页面加载完成时的时间戳
      videoAddScoreUnit: 10, // 每这个秒数加一次分
      article: { baseInfo: {}, files: [] }
    };
  },
  methods: {
    setViewed() {
      // let self = this;
      // api.article.setViewed({ ID: self.article.baseInfo.id }).then(res => {
      //   // console.log('setViewed by online:', res);
      // });
    },
    // 文档停留30秒才算阅读过
    // 视频停留 5分钟内、10分钟内、10分钟以上分别得 0.5、1个积分
    online(second) {
      // let self = this;
      // // let type = self.article.baseInfo.type;
      // self.viewSecond = second;
      // // console.log('online:', second, 'sec. type:' + type);
      // // 30秒即可标记为已读
      // if (!self.status.viewed && self.viewSecond > self.setViewedThreshold) {
      //   self.status.viewed = true; // api 200 ok 时再标记会导致请求过程中多次执行标记操作
      //   api.article.setViewed({ ID: self.article.baseInfo.id }).then(res => {
      //     // console.log('setViewed by online:', res);
      //   });
      // }
    }
  },
  mounted() {
    // 页面加载完成时的时间戳
    let self = this;
    self.readyTime = self.time();
    self.$nextTick(function() {
      // console.log('self.$route', self.$route);
      let id = self.$route.params.id || 0;
      if (!id) {
        self.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: self.$route.fullPath }
        });
      }
      self.$vux.loading.show({
        text: '正在获取数据'
      });
      api.activity.DangJianDongTai.detail({
        ID: id
      })
        .then(res => {
          self.$vux.loading.hide();
          // console.log('detail:', res);
          self.article = res.Data.article;
        })
        .catch(e => {
          let self = this;
          self.$vux.loading.hide();
          self.$vux.confirm.show({
            title: '提示',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              self.$router.go(-1);
            }
          });
        });
    });
  }
};
</script>
