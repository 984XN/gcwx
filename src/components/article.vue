<template>
  <article class="article">
    <div class="article-head">
      <h1>{{article.title}}</h1>
      <div class="atricle-head-attr">
        <span v-if="article.author" class="author">作者：{{article.author}}</span>
        <span v-if="article.date" class="date">发布：{{article.date}}</span>
      </div>
    </div>
    <div class="article-body" v-html="article.content"></div>
  </article>
</template>

<script>
export default {
  props: {
    article: Object
  },
  data() {
    return {
      name: 'value'
    };
  },
  methods: {
    fn(param) {
      console.log('fn:', param);
    }
  }
};
</script>
