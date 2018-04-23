<template>
  <div class="feedback">
    <dl>
      <dt class="feedback-head">请将这个页面截屏发给我们</dt>
      <dd class="feedback-body">
        <table>
          <tr v-for="(value, key, index) in data" :key="index">
            <th class="name">{{ key }}</th>
            <td class="value">{{ value }}</td>
          </tr>
        </table>
      </dd>
      <dd class="feedback-footer">
        <div class="tel">联系我们：
          <a href="tel:0379-60185975">0379-60185975</a>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    if (JSON.stringify(this.$route.params) === '{}') {
      this.$router.go(-1);
    }
    let params = this.$route.params;
    let data = {
      url: params.config.url,
      method: params.config.method,
      data: params.config.data,
      timeout: params.config.timeout,
      status: params.response.request.status,
      statusText: params.response.request.statusText,
      response: params.response.request.response,
      readyState: params.response.request.readyState,
      withCredentials: params.response.request.withCredentials
    };
    this.data = data;
    console.log('$route.params:', this.$route.params, data);
  }
};
</script>

<style lang="stylus" scoped>
.feedback {
  height 100%
  box-sizing border-box
  border-top 1px solid #EEE
}
dl {
  background-color #fff
  border 1px solid #DDD
  border-radius 5px
  margin 10px
  dt {
    padding 20px 15px
    border-bottom 1px solid #EEE
    text-align center
  }
  dd {
    padding 15px
    &.feedback-footer {
      text-align center
      color #C00
      border-top 1px solid #EEE
      a {
        color #C00
        border-bottom 1px dotted #C00
      }
    }
  }
  table {
    width 100%
    font-size 12px
    th {
      text-align right
      padding 3px 5px
      font-weight normal
      color #999
    }
  }
}
</style>
