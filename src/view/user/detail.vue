<template>
  <Article :article="article" @online="online"></Article>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/user';

export default {
  components: {
    Article
  },
  data() {
    return {
      article: { baseInfo: {}, files: [] },
      categories: {
        tongzhigonggao: {
          key: 'TongZhiGongGao',
          value: '通知公告'
        },
        dangwugongkai: {
          key: 'DangWuGongKai',
          value: '党务公开'
        },
        dangjiandongtai: {
          key: 'DangJianDongTai',
          value: '党建动态'
        }
      }
    };
  },
  methods: {
    online(second) {}
  },
  mounted() {
    let self = this;
    let id = self.$route.params.id || 0;
    let type = self.$route.query.type || 'tongzhigonggao';
    self.$nextTick(function() {
      // console.log('self.$route', self.$route);
      if (!id) {
        self.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: self.$route.fullPath }
        });
      }
      let url =
        self.categories && self.categories[type]
          ? self.categories[type].key
          : '';
      if (!url) {
        self.$vux.alert.show({
          title: '接口错误',
          content: ' 找不到接口：' + type,
          buttonText: '返回上一页',
          onHide() {
            self.$router.go(-1);
          }
        });
      }
      if (url) {
        self.$vux.loading.show({
          text: '正在获取数据'
        });
        api.user.article
          .detail({
            ID: id,
            api: url
          })
          .then(res => {
            self.$vux.loading.hide();
            console.log('detail:', res);
            if (res.Data.article && res.Data.article.baseInfo) {
              self.article = res.Data.article;
            }
          })
          .catch(() => {
            self.$vux.loading.hide();
            self.$router.go(-1);
          });
      }
    });
  }
};
</script>
