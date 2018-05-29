<template>
  <div class="fileType">{{type}}</div>
</template>

<script>
export default {
  props: {
    code: Number
  },
  computed: {
    type() {
      let type = '';
      switch (this.code) {
        case 10:
          type = '视频';
          break;
        case 20:
          type = '文档';
          break;
        default:
          type = '未知';
          break;
      }
      return type;
    }
  }
};
</script>

<style lang="stylus" scoped>
.fileType {
  position absolute
  left 0
  top 0
  border-radius 0 0 5px 0
  color #FFF
  background-color #258ac3
  font-size 10px
  padding 3px 5px
}
</style>
