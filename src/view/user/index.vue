<template>
  <div class="page page-user">
    <template v-if="$route.name === 'user'">
      <container top="0">
        <blur :blur-amount=40 :url="url" class="userInfo">
          <div class="avatar">
            <img :src="url">
          </div>
          <div class="name">{{name}}</div>
        </blur>
        <!-- <divider></divider> -->
        <card>
          <div slot="content" class="card-flex">
            <router-link :to="{path:'/user/profile', replace: true}" class="card-item vux-1px-r">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>未读通知</div>
              <span>1130</span>
            </router-link>
            <router-link :to="{path:'/user/profile', replace: true}" class="card-item vux-1px-r">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>个人积分</div>
              <span>15</span>
            </router-link>
            <router-link :to="{path:'/user/profile', replace: true}" class="card-item">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>党建动态</div>
              <span>0</span>
            </router-link>
          </div>
        </card>
        <group>
          <cell title="个人资料" link="/user/profile" :value="username">
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="微信绑定" @click.native="wechat" is-link :value="nickname">
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="修改密码" link="/user/password" value="当前密码已使用865天">
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
        </group>
        <group>
          <cell title="个人积分" @click.native="log" is-link value="0">
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="党费查询" @click.native="log" is-link>
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="中奖记录" @click.native="log" is-link>
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
        </group>
        <group>
          <cell title="通知公告" @click.native="log" is-link>
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="党务公开" @click.native="log" is-link>
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
          <cell title="党建动态" @click.native="log" is-link>
            <i slot="icon" class="listIcon iconfont icon-roundadd"></i>
          </cell>
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
import { Card, Blur, Confirm, TransferDomDirective as TransferDom } from 'vux';
import Menu from 'src/components/menu';

export default {
  directives: {
    TransferDom
  },
  components: {
    Card,
    Blur,
    Menu,
    Confirm
  },
  data() {
    return {
      wechatDialog: false,
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      username: this.$store.state.userInfo.user.UserName,
      nickname: this.$store.state.userInfo.wechat.nickName
    };
  },
  computed: {
    name() {
      let userSystem = sessionStorage.userSystem
        ? JSON.parse(sessionStorage.userSystem)
        : { UserName: '' };
      let userWechat = sessionStorage.userWechat
        ? JSON.parse(sessionStorage.userWechat)
        : { nickname: '' };
      let username = userSystem.UserName;
      let nickname = userWechat.nickname;
      // console.log(userSystem, userWechat, username, nickname);
      return username || nickname || '无名氏';
    }
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
  .name {
    text-align center
    color #FFF
    text-shadow 0 0 2px #000
    font-size 14px
    padding-top 5px
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
.card-item {
  i {
    font-size 36px
    color #EEE
  }
  span {
    color #f74c31
  }
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
.listIcon {
  font-size 24px
  color #CCC
  line-height 1
  float left
  margin-right 5px
}
</style>
