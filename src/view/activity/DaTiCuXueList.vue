<template>
  <container bottom="0" class="page-activity-datucuxue-list">
    <ExaminationPaperList :list="list"></ExaminationPaperList>
  </container>
</template>

<script>
import Container from 'src/components/container';
import ExaminationPaperList from 'src/components/examinationPaperList';

export default {
  components: {
    Container,
    ExaminationPaperList
  },
  data() {
    return {
      list: [
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: false,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: require('src/assets/img/default.png'),
          title: '加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        },
        {
          id: new Date().getTime(),
          thumb: '',
          title: '藁城区党建移动端招标书',
          intro:
            '色电影是指红色题材的电影。“红色电影”中的“红色”是指流贯在作品血脉中的革命精神和英雄主义的思想风貌，中国产党成立90周年之际，红色电影”专',
          done: true,
          date: '2016-02-05'
        }
      ]
    };
  }
};
</script>
