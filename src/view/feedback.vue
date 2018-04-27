<template>
  <div class="feedback">
    <div class="pageTitle">请将这个页面截屏发给我们</div>
    <dl>
      <dt class="feedback-head">帮助信息</dt>
      <dd class="feedback-body">
        <table>
          <tr v-for="(value, key, index) in data" :key="index">
            <th class="name">{{ key }}</th>
            <td class="value">{{ value | substr(0, 4096) }}</td>
          </tr>
        </table>
      </dd>
      <dd class="feedback-footer">
        <div class="tel">联系我们：
          <a href="tel:0379-60185975">0379-60115975</a>
        </div>
      </dd>
    </dl>
    <div class="tip">提示：<br />解决刚刚的问题需要以上全部的信息，请务必完整发给我们！如果一屏截不完，可以分多次截屏。</div>
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
    this.$vux.loading.hide();
    this.$vux.alert.hide();
    this.$vux.confirm.hide();
    // this.$vux.toast.hide();
    if (JSON.stringify(this.$route.params) === '{}') {
      this.$router.go(-1);
    }
    let params = this.$route.params;
    let data = {
      status: params.response.request.status,
      statusText: params.response.request.statusText,
      url: params.config.url,
      responseURL: params.request.responseURL,
      method: params.config.method,
      data: params.config.data,
      timeout: params.config.timeout,
      response: params.response.request.response,
      readyState: params.response.request.readyState,
      withCredentials: params.response.request.withCredentials
    };
    this.data = data;
    // console.log('$route.params:', this.$route.params, data);
  }
};
</script>

<style lang="stylus" scoped>
.feedback {
  height 100%
  box-sizing border-box
  border-top 1px solid #EEE
  background linear-gradient(#ffffffb0, transparent)
}
.pageTitle {
  text-align center
  padding 20px 0
  font-size 18px
}
dl {
  background-color #fff
  border 1px solid #DDD
  border-radius 5px
  margin 0 10px 10px
  font-size 12px
  dt {
    padding 10px 15px
    border-bottom 1px solid #EEE
    color #999
    &:after {
      content '：'
    }
  }
  dd {
    padding 15px
    &.feedback-footer {
      text-align center
      border-top 1px solid #EEE
      a {
        color #000
        border-bottom 1px dotted #CCC
      }
    }
  }
  table {
    width 100%
    line-height 1.4
    th {
      text-align right
      font-weight normal
      color #999
    }
    td {
      padding 5px 0 5px 5px
      word-break break-all
    }
  }
}
.tip {
  font-size 12px
  text-align center
  padding 5px 15px
  color #C00
}
</style>
