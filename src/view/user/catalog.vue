<template>
  <div class="page page-user-index">
    <container top="0">
      <div class="userInfo">
        <div class="content">
          <div class="avatar">
            <img :src="avatar" alt="头像">
          </div>
          <div class="name">{{name}}</div>
          <div class="company">{{userInfo.OrganizationName}}</div>
        </div>
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
        <cell title="个人积分" :link="{path:'score',append:true}" :is-loading="score === null" :value="score">
          <i slot="icon" class="listIcon iconfont icon-coin"></i>
        </cell>
        <cell title="党费查询" is-link @click.native="show.dues = !show.dues" :is-loading="dues.total === null" :value="dues.total">
          <i slot="icon" class="listIcon iconfont icon-money-square"></i>
        </cell>
        <cell title="中奖记录" :link="{path:'gifts',append:true}">
          <i slot="icon" class="listIcon iconfont icon-gift"></i>
        </cell>
        <cell title="我的正能量" :link="{path:'zhengnengliang',append:true}">
          <i slot="icon" class="listIcon iconfont icon-Business_-Honor"></i>
        </cell>
      </group>
      <group>
        <cell title="通知公告" :link="{path:'list/tongzhigonggao',append:true}">
          <i slot="icon" class="listIcon iconfont icon-tongzhi"></i>
        </cell>
        <cell title="党务公开" :link="{path:'list/dangwugongkai',append:true}">
          <i slot="icon" class="listIcon iconfont icon-shangwu"></i>
        </cell>
        <cell title="党建动态" :link="{path:'list/dangjiandongtai',append:true}">
          <i slot="icon" class="listIcon iconfont icon-article"></i>
        </cell>
      </group>
      <load-more :show-loading="false"></load-more>
    </container>
    <Menu></Menu>
    <div v-transfer-dom>
      <popup v-model="show.dues">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead style="background-color:#F7F7F7;">
            <tr>
              <th>{{dues.year}}</th>
              <th>党费</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,i) in dues.list" :key="i">
              <td>{{v.title}}</td>
              <td>{{v.content}}</td>
            </tr>
            <tr v-if="dues.list.length === 0">
              <td colspan="3">暂无数据</td>
            </tr>
          </tbody>
        </x-table>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  XTable,
  Card,
  Blur,
  Popup,
  TransferDomDirective as TransferDom
} from 'vux';
import Menu from 'src/components/menu';
import * as api from 'src/api/user';

export default {
  directives: {
    TransferDom
  },
  components: {
    XTable,
    Card,
    Blur,
    Menu,
    Popup
  },
  data() {
    return {
      score: null,
      binded: false,
      userSystem: {},
      userWechat: {},
      show: {
        dues: false
      },
      dues: {
        year: '',
        total: null,
        list: []
      },
      userInfo: {
        OrganizationName: '-'
      }
    };
  },
  computed: {
    avatar() {
      return this.userSystem.PhotoName || this.userWechat.HeadImgUrl;
    },
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
      api.user.wechat.unbindMember().then(res => {
        self.$vux.loading.hide();
        // console.log('unbindMember', res);
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
    },
    unopened(txt = '此功能') {
      this.$vux.toast.show({
        type: 'cancel',
        width: '9em',
        text: txt + '暂未开放'
      });
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.binded = self.session('binded');
      self.userSystem = self.session('userSystem');
      self.userWechat = self.session('userWechat');
      // 获取用户头像
      api.user.member.profile().then(res => {
        self.$vux.loading.hide();
        self.userInfo = res.Data.userInfo || {};
        if (self.userInfo.PhotoName) {
          self.userSystem.PhotoName = self.userInfo.PhotoName;
        }
        // console.log('api.user.member.profile:', self.userSystem);
        // console.log('api.user.member.profile:', res);
      });
      // 获取用户总积分数
      api.user.member.score.total().then(res => {
        // console.log('member.score:', res);
        self.score =
          res.Data.sumScore &&
          res.Data.sumScore[0] &&
          res.Data.sumScore[0].AddScore
            ? res.Data.sumScore[0].AddScore
            : 0;
      });
      // 获取用户党费记录
      api.user.member.dues().then(res => {
        self.dues.year = res.Data.year || '';
        self.dues.list = res.Data.list || [];
        self.dues.total = res.Data.totalDues || 0;
        self.dues.total = '本年度已缴纳' + res.Data.totalDues + '元';
        // console.log('member.dues:', res);
      });
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.userInfo {
  position relative
  margin-bottom 1.17647059em
  padding 45px 0 20px
  background-color #f17474
  overflow hidden
  &:before {
    top 110px
    background-color #FFF
    width 130%
    margin-left -65%
    content ''
    display block
    position absolute
    height 150%
    left 50%
    border-radius 50%
  }
  .content {
    position relative
    .avatar {
      width 100px
      height 100px
      border-radius 50%
      overflow hidden
      margin 0 auto
      border solid 3px rgba(0, 0, 0, 0.3)
      img {
        width 100%
        line-height 100px
        text-align center
        display block
        margin 0 auto
        color #FFF
      }
    }
    .name {
      text-align center
      font-size 16px
      min-height 20px
      line-height 20px
      padding-top 5px
    }
    .company {
      padding 10px 30px 0
      text-align center
      font-size 12px
      min-height 12px
      color #999
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
