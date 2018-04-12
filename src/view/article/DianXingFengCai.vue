<template>
  <container>
    <ArticleList :list="list"></ArticleList>
  </container>
</template>

<script>
import Container from 'src/components/container';
import ArticleList from 'src/components/articlelist';

export default {
  components: {
    Container,
    ArticleList
  },
  data() {
    return {
      list: [
        {
          id: new Date().getTime(),
          thumb: '',
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        }
      ]
    };
  }
};
</script>
