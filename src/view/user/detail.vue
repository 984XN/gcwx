<template>
  <Article :article="article" @online="online"></Article>
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
      article: { baseInfo: {}, files: [] }
    };
  },
  methods: {
    online(second) {}
  },
  mounted() {
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
      api.activity.ZhengNengLiang.detail({
        ID: id
      })
        .then(res => {
          this.$vux.loading.hide();
          this.article = res.Data.Article;
          // console.log('detail:', res);
        })
        .catch(() => {
          this.$vux.loading.hide();
          this.$router.go(-1);
        });
    });
  }
};
</script>
