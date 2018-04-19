<template>
  <Container bottom="0" class="page-activity-zhishijingsai-order">
    <h1 class="pageTitle">竞赛排名</h1>
    <dl class="examOrderList">
      <dt>
        <div class="text">共60人</div>
        <div class="myOrder">
          您的排名：
          <strong>第97名</strong>
        </div>
      </dt>
      <dd>
        <table class="data">
          <tbody>
            <tr v-for="i in 60" :key="i">
              <td>第{{i}}名</td>
              <td>张佳磊</td>
              <td>{{100-i}}分</td>
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
  box-shadow 0 3px 5px rgba(0,0,0,0.3)
  dt {
    font-size 12px
    padding 10px 15px
    .myOrder {
      strong {
        font-weight normal
        color rgb(252, 95, 90)
      }
    }
    .text {
      float right
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
