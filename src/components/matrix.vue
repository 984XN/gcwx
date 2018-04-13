<template>
  <div class="matrix">
    <ol class="imgs" :style="style.matrix">
      <li class="img-item" v-for="(item, index) in list" :key="index" :style="style.item">
        <img class="previewer-demo-img" :src="item.src" @click="show(index)">
      </li>
    </ol>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux';

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  props: {
    list: Array
  },
  computed: {
    style() {
      let count = this.list.length;
      let style = {
        matrix: {},
        item: {
          width: '85px',
          height: '85px'
        }
      };
      switch (count) {
        case 1:
          style.item.width = '150px';
          style.item.height = '150px';
          break;
        case 2:
        case 4:
          style.matrix.width = '200px';
          break;
        case 6:
          style.matrix.width = '270px';
          break;
      }
      return style;
    }
  },
  methods: {
    show(index) {
      this.$refs.previewer.show(index);
    }
  }
};
</script>

<style lang="stylus" scoped>
.imgs {
  margin-top -5px
  &:after {
    content ''
    display block
    clear both
  }
  .img-item {
    background-color #eee
    width 85px
    height 85px
    margin 5px 0 0 5px
    float left
    overflow hidden
    img {
      height 100%
      width 100%
      float left
    }
  }
}
</style>
