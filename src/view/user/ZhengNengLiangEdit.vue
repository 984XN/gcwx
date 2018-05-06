<template>
  <div>编辑正能量{{id}}</div>
</template>

<script>
export default {
  data() {
    return {
      id: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.id = this.$route.params.id || 0;
    });
  }
};
</script>
