<template>
  <div class="page page-404">
    <h1>你要查看的页面不存在</h1>
    <p class="subTitle">404 NotFound</p>
    <ul class="links">
      <li>
        <a @click="$router.go(-1)" href="javascript:;">返回上一页</a>
      </li>
      <li>
        <router-link to="/">学习平台</router-link>
      </li>
      <li>
        <router-link to="/activity">互动专区</router-link>
      </li>
      <li>
        <router-link to="/user">个人中心</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
.page-404 {
  height 100%
  background-color #fff
  text-align center
  border-top 5px solid #f17474
}
h1 {
  font-weight normal
  padding 50px 0 30px
  font-size 20px
  color #f17474
}
.subTitle {
  color #999
}
.links {
  list-style none
  margin 30px 50px
  border 1px solid #eee
  font-size 14px
  border-radius 5px
  li {
    border-radius 3px
    border-bottom 1px solid #eee
    &:last-child {
      border-bottom none
    }
    a {
      display block
      color #666
      padding 10px
      &:active {
        color #f17474
      }
    }
  }
}
</style>
