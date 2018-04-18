<template>
  <div class="page-activity-liangdiantoupiao-list">
    <ol class="voteList">
      <router-link to="vote/21" tag="li" class="vote">
        <div class="author">发布单位：中共石家庄市藁城区委员会</div>
        <div class="title">晒赛主题党日“优秀案例评选”活动</div>
        <div class="attr">
          <span class="link">前往投票</span>
          <div class="date">2017-09-18 至 2017-10-18</div>
          <div class="view">
            <i class="iconfont icon-eye"></i>
            2541
          </div>
        </div>
      </router-link>
      <router-link to="vote/22" tag="li" class="vote">
        <div class="author">发布单位：中共石家庄市藁城区委员会</div>
        <div class="title">晒赛主题党日“优秀案例评选”活动</div>
        <div class="attr">
          <span class="link">前往投票</span>
          <div class="date">2017-09-18 至 2017-10-18</div>
          <div class="view">
            <i class="iconfont icon-eye"></i>
            2541
          </div>
        </div>
        <div class="status">已结束</div>
      </router-link>
      <router-link to="vote/23" tag="li" class="vote">
        <div class="author">发布单位：中共石家庄市藁城区委员会</div>
        <div class="title">晒赛主题党日“优秀案例评选”活动</div>
        <div class="attr">
          <span class="link">前往投票</span>
          <div class="date">2017-09-18 至 2017-10-18</div>
          <div class="view">
            <i class="iconfont icon-eye"></i>
            2541
          </div>
        </div>
        <div class="status">已结束</div>
      </router-link>
      <router-link to="vote/24" tag="li" class="vote">
        <div class="author">发布单位：中共石家庄市藁城区委员会</div>
        <div class="title">晒赛主题党日“优秀案例评选”活动</div>
        <div class="attr">
          <span class="link">前往投票</span>
          <div class="date">2017-09-18 至 2017-10-18</div>
          <div class="view">
            <i class="iconfont icon-eye"></i>
            2541
          </div>
        </div>
        <div class="status">已结束</div>
      </router-link>
    </ol>
  </div>
</template>

<style lang="stylus">
.voteList {
  margin 10px
  .vote {
    margin-bottom 5px
    background-color #fff
    padding 10px 15px
    border-radius 5px
    position relative
    a {
      display block
      color #000
    }
    .author {
      font-size 12px
      color #666
    }
    .title {
      padding 20px 0
      text-align center
    }
    .attr {
      font-size 12px
      line-height 1
      color #999
      &:after {
        content ''
        display block
        clear both
      }
      .link {
        float right
        color #f17474
        &:after {
          content ' '
          display inline-block
          height 8px
          width 8px
          border-width 1px 1px 0 0
          border-color #C8C8CD
          border-style solid
          -webkit-transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
          transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
          position relative
          top 50%
          left 3px
          margin-top -4px
          right 2px
        }
      }
      .date,
      .view {
        float left
      }
      .date {
        margin-right 25px
      }
      .view {
        i {
          font-size inherit
        }
      }
    }
    .status {
      border 2px solid #F00
      width 5em
      text-align center
      color #F00
      border-radius 3px
      position absolute
      left 50%
      top 50%
      margin-top -15px
      margin-left -42px
      font-weight bold
      box-shadow 0 0 0 2px #ffffff inset
      text-shadow 0 0 2px #FFF
      transform rotate(-15deg)
    }
  }
}
</style>
