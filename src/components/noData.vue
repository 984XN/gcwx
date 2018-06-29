<template>
  <div class="noData">
    <slot>{{text}}</slot>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
};
</script>
