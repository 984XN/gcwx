// 用法：v-指令名

const focus = {
  // 当被绑定的元素插入到 DOM 中时focus
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
};

const scroll = {
  // 通过指令保存 scrollTop，调用存储的值时需要在各页面调用自己的 activated 或 mounted 事件
  // > 这个指令本来是用于回到这个页面时滚动到离开时的位置，做法是在 <container /> 上添加 v-scroll
  // > 可是，为什么不直接写在 <container /> 里呢？所以就写到 container 里了，于是这里就废弃了，
  // > 没有删除这部分代码的原因是，有可能除了 container 外的其它组件也可能会用到，截止 20180511 没有组件用到这个指令
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
