<template>
  <div class="faceAlert" v-show="showValue">
    <div class="mask"></div>
    <dl class="dialog" :class="type">
      <dt class="dialogHeader">
        <div v-html="title"></div>
      </dt>
      <dd class="dialogBody">
        <div v-html="content"></div>
      </dd>
      <dd class="dialogControl">
        <div v-if="cancelText">
          <button class="weui-btn weui-btn_default" @click="_onCancel">{{cancelText || '取消'}}</button>
        </div>
        <div v-if="confirmText">
          <button class="weui-btn weui-btn_warn" @click="_onConfirm">{{confirmText || '确定'}}</button>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'faceAlert',
  props: {
    type: {
      type: String,
      default: 'success' // success || fail
    },
    title: String,
    content: String,
    confirmText: String,
    cancelText: String
  },
  created() {
    this.showValue = this.show;
    if (this.value) {
      this.showValue = this.value;
    }
  },
  data() {
    return {
      showValue: false
    };
  },
  methods: {
    _onConfirm() {
      if (!this.showValue) {
        return;
      }
      this.showValue = false;
      this.$emit('on-confirm');
    },
    _onCancel() {
      if (!this.showValue) {
        return;
      }
      this.showValue = false;
      this.$emit('on-cancel');
    }
  }
};
</script>

<style lang="stylus">
.faceAlert {
  position fixed
  z-index 11
  left 0
  right 0
  top 0
  bottom 0
  .mask {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, 0.7)
  }
  .dialog {
    width 80%
    position absolute
    left 50%
    top 50%
    margin-left -40%
    margin-top -150px
    &.fail .dialogHeader {
      background-color #999
      text-shadow 1px 1px 0 #000
      &:before {
        background-image url('../assets/img/unpass.png')
      }
    }
    .dialogHeader {
      height 60px
      background-color #f17474
      color #FFF
      border-radius 8px 8px 0 0
      position relative
      padding 10px
      text-align center
      &:before {
        content ''
        display block
        width 120px
        height 128px
        position absolute
        left 10px
        bottom 10px
        background url('../assets/img/pass.png') center center no-repeat
        background-size cover
      }
      &:after {
        content ''
        display block
        border-top 10px dotted #FFF
        position absolute
        left 0
        right 0
        bottom -5px
      }
    }
    .dialogBody {
      position relative
      padding 20px
      background-color #FFF
      text-align center
      &:before {
        content ''
        display block
        border-top 10px dotted #FFF
        position absolute
        left 10px
        right 10px
        top -5px
      }
    }
    .dialogControl {
      border-radius 0 0 8px 8px
      background-color #fff
      text-align center
      display flex
      padding 5px
      div {
        padding 5px
        flex 1
        text-align center
      }
    }
  }
}
</style>
