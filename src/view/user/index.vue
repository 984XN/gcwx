<template>
  <div class="page page-user">
    <template v-if="$route.name === 'user'">
      <container top="0">
        <blur :blur-amount=40 :url="url" class="userInfo">
          <div class="avatar">
            <img :src="url">
          </div>
        </blur>
        <!-- <divider></divider> -->
        <card>
          <div slot="content" class="card-flex">
            <router-link to="/user/profile" class="card-item vux-1px-r">
              <span>1130</span>
              <div>未读通知</div>
            </router-link>
            <router-link to="/user/profile" class="card-item vux-1px-r">
              <span>15</span>
              <div>个人积分</div>
            </router-link>
            <router-link to="/user/profile" class="card-item">
              <span>0</span>
              <div>党建动态</div>
            </router-link>
          </div>
        </card>
        <group>
          <cell title="个人资料" link="/user/profile" value="白求恩"></cell>
          <cell title="微信绑定" @click.native="wechat" is-link value="某某人"></cell>
        </group>
        <group>
          <cell title="个人积分" @click.native="log" is-link value="0"></cell>
          <cell title="党费查询" @click.native="log" is-link></cell>
        </group>
        <group>
          <cell title="通知公告" @click.native="log" is-link></cell>
          <cell title="党务公开" @click.native="log" is-link></cell>
          <cell title="党建动态" @click.native="log" is-link></cell>
        </group>
        <div v-transfer-dom>
          <confirm v-model="wechatDialog" :title="'解除绑定'" @on-confirm="wechatDialogConfirm" @on-cancel="onCancel" @on-show="onShow" @on-hide="onHide">
            <div>解除与“某某人”的绑定关系吗？</div>
          </confirm>
        </div>
      </container>
      <Menu></Menu>
    </template>
    <template v-if="$route.meta.fullpage === true || $route.name !== 'user'">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import Container from 'src/components/container';

import {
  Card,
  Blur,
  Group,
  Cell,
  Confirm,
  TransferDomDirective as TransferDom
} from 'vux';
import Menu from 'src/components/menu';

export default {
  directives: {
    TransferDom
  },
  components: {
    Container,
    Card,
    Blur,
    Group,
    Cell,
    Menu,
    Confirm
  },
  data() {
    return {
      wechatDialog: false,
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
    };
  },
  methods: {
    wechat() {
      this.wechatDialog = true;
    },
    wechatDialogConfirm() {
      this.wechatDialog = false;
    },
    onCancel() {
      console.log('on cancel');
    },
    onHide() {
      console.log('on hide');
    },
    onShow() {
      console.log('on show');
    },
    log() {}
  }
};
</script>

<style lang="stylus" scoped>
.userInfo {
  position relative
  margin-bottom 1.17647059em
  .avatar {
    img {
      width 100px
      height 100px
      display block
      border-radius 50%
      margin 45px auto 0
    }
  }
}
.card-flex {
  display flex
}
.card-padding {
  padding 15px
}
.card-flex > .card-item {
  color #666
  flex 1
  text-align center
  font-size 12px
  padding 20px 0
}
.card-flex span {
  color #f74c31
}
.vux-1px-r {
  position relative
}
.vux-1px-r:after {
  content ''
  border-right 1px solid #c7c7c7
  position absolute
  right 0
  width 1px
  top 20px
  bottom 20px
  color #C7C7C7
  -webkit-transform-origin 100% 0
  transform-origin 100% 0
  -webkit-transform scaleX(0.5)
  transform scaleX(0.5)
}
</style>
