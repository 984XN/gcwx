// 用法：v-指令名

const focus = {
  // 当被绑定的元素插入到 DOM 中时focus
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
};

const scroll = {
  // 通过指令保存 scrollTop，使用时需要在各页面调用自己的 activated 事件
  inserted: function(el) {},
  bind: function(el, binding, vnode) {
    el.addEventListener('scroll', () => {
      // console.log('d - scroll - bind, scroll', el.scrollTop);
      let st = el.scrollTop;
      let path = window.location.hash.replace(/^#/, '');
      let scrollTopObj = {};
      if (sessionStorage.scrollTop) {
        scrollTopObj = JSON.parse(sessionStorage.scrollTop);
      }
      scrollTopObj[path] = st;
      sessionStorage.scrollTop = JSON.stringify(scrollTopObj);
    });
  }
};

export { focus, scroll };
