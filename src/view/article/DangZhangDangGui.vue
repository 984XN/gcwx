<template>
  <container>
    <swiper :list="banners" auto loop dots-class="swiper-control-dot" dots-position="center" class="swiper"></swiper>
    <ArticleList :list="list"></ArticleList>
  </container>
</template>

<script>
import { Swiper } from 'vux';
import Container from 'src/components/container';
import ArticleList from 'src/components/articlelist';

export default {
  components: {
    Swiper,
    Container,
    ArticleList
  },
  data() {
    return {
      banners: [
        {
          url: 'javascript:',
          img: '/static/img/banner/02.png'
        },
        {
          url: 'javascript:',
          img: '/static/img/banner/02.png'
        }
      ],
      list: [
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          view: '235',
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
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

<style lang="stylus">
.swiper {
  -webkit-box-reflect below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.7)));
}
</style>
