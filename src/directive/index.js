const focus = {
  // 当被绑定的元素插入到 DOM 中时focus，用法 v-focus
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
};

export { focus };
