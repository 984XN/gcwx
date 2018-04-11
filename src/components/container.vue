<template>
  <div class="container" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  position absolute
  left 0
  top 44px
  right 0
  bottom 50px
  overflow scroll
}
</style>

<script>
export default {
  props: {
    top: null,
    bottom: null
  },
  computed: {
    style: function() {
      let style = {
        top: '44px',
        bottom: '50px'
      };
      if (this.top) style.top = this.top + 'px';
      if (this.bottom) style.bottom = this.bottom + 'px';
      return style;
    }
  }
};
</script>
