<template>
  <container class="page-article-yingzhiyinghui-detail" top="0" bottom="0">
    <Article :article="article"></Article>
  </container>
</template>

<script>
import Article from 'src/components/article';

export default {
  components: {
    Article
  },
  data() {
    return {
      name: 'value'
    };
  },
  computed: {
    article: function() {
      let title = this.$route.query.title;
      let content = '<img src="' + this.$route.query.file + '"/>';
      let article = {
        baseInfo: {
          title: title,
          content: content
        }
      };
      window.document.title = title;
      return article;
    }
  }
};
</script>
