<template>
  <container top="0" bottom="0">
    <Article :article="article" @online="online"></Article>
  </container>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/activity';

export default {
  components: {
    Article
  },
  data() {
    return {
      status: {
        viewed: false // 是否已经标记成了已读
      },
      setViewedThreshold: 1, // 这个秒数后访问量+1
      viewSecond: 0, // 已阅读秒数
      readyTime: null, // 页面加载完成时的时间戳
      article: { baseInfo: {}, files: [] }
    };
  },
  methods: {
    setViewed() {
      let self = this;
      api.activity.ZhiBuEJia.setViewed({ ID: self.article.baseInfo.id }).then(
        res => {
          // console.log('setViewed by online:', res);
        }
      );
    },
    // 文档停留 setViewedThreshold 秒才算阅读过
    online(second) {
      let self = this;
      // let type = self.article.baseInfo.type;
      self.viewSecond = second;
      // console.log('online:', second, 'sec. type:' + type);
      // setViewedThreshold 秒即可标记为已读
      if (!self.status.viewed && self.viewSecond > self.setViewedThreshold) {
        self.status.viewed = true; // api 200 ok 时再标记会导致请求过程中多次执行标记操作
        api.activity.ZhiBuEJia.setViewed({ ID: self.article.baseInfo.id }).then(
          res => {
            // console.log('setViewed by online:', res);
          }
        );
      }
    }
  },
  mounted() {
    // 页面加载完成时的时间戳
    this.readyTime = this.time();
    this.$nextTick(function() {
      // console.log('this.$route', this.$route);
      let id = this.$route.params.id || 0;
      if (!id) {
        this.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: this.$route.fullPath }
        });
      }
      this.$vux.loading.show({
        text: '正在获取数据'
      });
      api.activity.ZhiBuEJia.detail({
        ID: id
      })
        .then(res => {
          this.$vux.loading.hide();
          this.article = res.Data.article;
          // console.log('detail:', res);
        })
        .catch(e => {
          this.$vux.loading.hide();
          this.$vux.confirm.show({
            title: '提示',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              this.$router.go(-1);
            }
          });
        });
    });
  }
};
</script>
