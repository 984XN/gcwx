<template>
  <div class="page page-user-index">
    <container top="0">
      <div class="userInfo">
        <div class="avatar">
          <img :src="userSystem.PhotoName || userWechat.HeadImgUrl" alt="头像">
        </div>
        <div class="name">{{name}}</div>
      </div>
      <!-- <divider></divider> -->
      <!-- <card>
          <div slot="content" class="card-flex">
            <router-link :to="{path:'profile', replace: true}" append class="card-item vux-1px-r">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>未读通知</div>
              <span>1130</span>
            </router-link>
            <router-link :to="{path:'profile', replace: true}" append class="card-item vux-1px-r">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>个人积分</div>
              <span>15</span>
            </router-link>
            <router-link :to="{path:'profile', replace: true}" append class="card-item">
              <div>
                <i class="iconfont icon-roundadd"></i>
              </div>
              <div>党建动态</div>
              <span>0</span>
            </router-link>
          </div>
        </card> -->
      <group>
        <cell title="个人资料" @click.native="getUserLink" is-link :value="userName">
          <i slot="icon" class="listIcon iconfont icon-profile_light"></i>
        </cell>
        <cell title="微信绑定" @click.native="getWechatLink" is-link :value="wechatName">
          <i slot="icon" class="listIcon iconfont icon-custom-wechat"></i>
        </cell>
        <cell title="修改密码" :link="{path:'password',append:true}" value="">
          <i slot="icon" class="listIcon iconfont icon-password"></i>
        </cell>
      </group>
      <group>
        <cell title="个人积分" is-link :is-loading="score === null" :value="score">
          <i slot="icon" class="listIcon iconfont icon-coin"></i>
        </cell>
        <cell title="党费查询" is-link>
          <i slot="icon" class="listIcon iconfont icon-money-square"></i>
        </cell>
        <cell title="中奖记录" is-link>
          <i slot="icon" class="listIcon iconfont icon-gift"></i>
        </cell>
        <cell title="我的正能量" :link="{path:'zhengnengliang',append:true}">
          <i slot="icon" class="listIcon iconfont icon-Business_-Honor"></i>
        </cell>
      </group>
      <group>
        <cell title="通知公告" is-link>
          <i slot="icon" class="listIcon iconfont icon-tongzhi"></i>
        </cell>
        <cell title="党务公开" is-link>
          <i slot="icon" class="listIcon iconfont icon-shangwu"></i>
        </cell>
        <cell title="党建动态" is-link>
          <i slot="icon" class="listIcon iconfont icon-article"></i>
        </cell>
      </group>
      <load-more :show-loading="false"></load-more>
    </container>
    <Menu></Menu>
  </div>
</template>

<script>
import { Card, Blur, Confirm, TransferDomDirective as TransferDom } from 'vux';
import Menu from 'src/components/menu';
import * as api from 'src/api/user';

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
      score: null,
      binded: false,
      userSystem: {},
      userWechat: {}
    };
  },
  computed: {
    name() {
      let username = this.userSystem.UserName || '';
      let nickname = this.userWechat.NickName || '';
      // console.log(userSystem, userWechat, username, nickname);
      return username || nickname || '无名氏';
    },
    userName() {
      return this.userSystem.UserName || '点击绑定';
    },
    wechatName() {
      return this.userWechat.OpenId ? this.userWechat.NickName : '点击授权';
    }
  },
  methods: {
    getUserLink() {
      if (this.userSystem.ID) {
        this.$router.push({ path: 'profile', append: true });
      } else {
        this.$router.push({ path: 'wechat/binding', append: true });
      }
    },
    getWechatLink() {
      let self = this;
      let mid = self.userSystem.ID || 0;
      let username = self.userSystem.UserName || '';
      let openid = self.userWechat.OpenId || 0;
      let nickname = self.userWechat.NickName || '';
      let binded = self.binded || false;
      if (binded || (openid && mid)) {
        self.$vux.confirm.show({
          title: '解除绑定',
          content:
            '解除微信“' + nickname + '”与党员“' + username + '”的绑定关系吗？',
          onConfirm() {
            self.wechatUnbindMember();
          }
        });
      } else {
        self.$vux.alert.show({
          title: '不能解除绑定',
          content: '如需解绑，请使用其它微信绑定这个党员帐号'
        });
        // this.$router.push({ path: '/login/wechat' });
      }
    },
    wechatUnbindMember() {
      let self = this;
      self.$vux.loading.show({
        text: '正在从微信上解除党员关系'
      });
      api.wechatUnbindMember().then(res => {
        self.$vux.loading.hide();
        console.log('wechatUnbindMember', res);
        // toto: 解除绑定的操作
        // sessionStorage.binded = false
        // sessionStorage.userSystem = JSON.stringify({});;
        if (res.StatusCode === 1200) {
          this.binded = sessionStorage.binded = false;
          this.userSystem = sessionStorage.userSystem = JSON.stringify({
            unbinding: true
          });
          self.$vux.toast.show({
            text: '成功解绑',
            time: 1000,
            onHide() {
              // self.$router.go(-1);
            }
          });
        } else {
          self.$vux.alert.show({
            title: '解除绑定失败',
            content: res.Message
          });
        }
      });
    }
  },
  mounted() {
    this.binded = this.session('binded');
    this.userSystem = this.session('userSystem');
    this.userWechat = this.session('userWechat');
    setTimeout(() => {
      this.score = 650;
    }, 2000);
  }
};
</script>

<style lang="stylus" scoped>
.userInfo {
  position relative
  margin-bottom 1.17647059em
  padding 45px 0 20px
  background-color #f17474
  .avatar {
    img {
      width 100px
      height 100px
      line-height 100px
      text-align center
      display block
      border-radius 50%
      margin 0 auto
      background-color #C00
      color #FFF
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
