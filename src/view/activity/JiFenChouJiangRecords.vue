<template>
  <Container bottom="0" top="0" class="page-activity-zhishijingsai-order">
    <h1 class="pageTitle">中奖名单</h1>
    <dl class="examOrderList">
      <dt>
        <div class="number">共60人参与</div>
        <div class="text">中奖名单</div>
      </dt>
      <dd>
        <table class="data">
          <tbody>
            <tr v-for="i in 60" :key="i">
              <td>张佳磊</td>
              <td>抽中{{100-i}}分</td>
              <td>中共藁城区华科路党工委</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </dl>
  </Container>
</template>

<script>
import Container from 'src/components/container';

export default {
  components: {
    Container
  },
  data() {
    return {
      list: []
    };
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-zhishijingsai-order {
  padding 10px
  background linear-gradient(rgb(252, 95, 90) 70%, transparent)
  .pageTitle {
    font-size 30px
    text-align center
    color #FFF
    padding 20px 0
    text-shadow 3px 3px 3px rgba(0, 0, 0, 0.5)
  }
}
.examOrderList {
  background-color #fff
  border-radius 5px
  box-shadow 0 3px 5px rgba(0, 0, 0, 0.3)
  dt {
    font-size 12px
    padding 10px 15px
    .number {
      float right
      color rgb(252, 95, 90)
    }
    .text {
      display block
      background url('./img/jifenchoujiang/notice.png')
      width 100px
      height 66px
      position relative
      margin-top -31px
      text-indent -999px
      overflow hidden
      float left
    }
  }
  dd {
    padding 0px 15px
    font-size 12px
    table.data {
      width 100%
      tr {
        &:nth-child(1) td:nth-child(1) {
          color #CC0000
        }
        &:nth-child(2) td:nth-child(1) {
          color #FF9800
        }
        &:nth-child(3) td:nth-child(1) {
          color #2196F3
        }
        td {
          padding 5px 0
          &:last-child {
            text-align right
          }
        }
      }
    }
  }
}
</style>
