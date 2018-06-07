<template>
  <div class="page-user-dangneiguanai">
    <tab :animate="false">
      <tab-item @on-item-click="jumpTo('all')" selected>全部</tab-item>
      <tab-item @on-item-click="jumpTo('ing')">审核中</tab-item>
      <tab-item @on-item-click="jumpTo('pass')">通过</tab-item>
      <tab-item @on-item-click="jumpTo('reject')">拒绝</tab-item>
    </tab>
    <container :lazyload="lazyload[type]" @loadData="loadData" bottom="0">
      <no-data v-if="!list[type].length && !lazyload[type].loading">暂无数据</no-data>
      <div v-if="list[type].length" class="list">
        <div class="weui-panel">
          <!-- <div class="weui-panel__hd">文字列表附来源</div> -->
          <div class="weui-panel__bd">
            <div @click="go2url(item)" v-for="(item, index) in list" :key="index" class="weui-media-box weui-media-box_text">
              <h4 class="weui-media-box__title">{{item.title}}</h4>
              <p class="weui-media-box__desc" v-html="item.desc"></p>
              <ul class="weui-media-box__info">
                <li class="weui-media-box__info__meta">{{item.meta.date}}</li>
                <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" v-html="item.meta.other"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{path:'add',append:true}" class="btnAdd">
        <i class="iconfont icon-add"></i>
      </router-link>
    </container>
  </div>
</template>

<script>
import * as api from 'src/api/user';

export default {
  data() {
    return {
      type: 'all',
      lazyload: {
        all: {
          enable: true,
          nodata: false,
          loading: false,
          page: 1
        },
        ing: {
          enable: true,
          nodata: false,
          loading: false,
          page: 1
        },
        pass: {
          enable: true,
          nodata: false,
          loading: false,
          page: 1
        },
        reject: {
          enable: true,
          nodata: false,
          loading: false,
          page: 1
        }
      },
      list: {
        all: [],
        ing: [],
        pass: [],
        reject: []
      }
    };
  },
  methods: {
    jumpTo(type) {
      let self = this;
      let path = self.$route.path;
      self.$router.push({ path, query: { type } });
    },
    loadData() {
      console.log('DangNeiGuangAi.loadData...');
      let self = this;
      let type = self.type;
      if (self.lazyload[type].loading) {
        // console.log('已经在加载中，return');
        return false;
      }
      self.lazyload[type].loading = true;
      if (self.lazyload[type].nodata) {
        // console.log('DangNeiGuangAi.loadData...没有数据了');
        self.lazyload[type].loading = false;
      } else {
        self.lazyload[type].nodata = true;
        self.lazyload[type].loading = false;
        // console.log('DangNeiGuangAi.loadData...加载第 ' + self.lazyload[type].page + ' 页数据');
        api.user.DangNeiGuanAi.list({
          pageModel: { Page: self.lazyload[type].page, Start: 0, Limit: 10 }
        }).then(res => {
          if (res.Data.PageData && res.Data.PageData.length > 0) {
            res.Data.PageData = res.Data.PageData.map(val => {
              let status = [
                '<span style="color:#FF9800;">待审核</span>', // 0待审核
                '审核通过', // 1审核通过
                '<span style="color:#F44336;">审核拒绝</span>' // 2审核拒绝
              ];
              return {
                id: val.id,
                src: val.thumb,
                title: val.title || '[无标题]',
                desc: val.content,
                url: {
                  path: 'edit/' + val.id,
                  append: true
                },
                public: val.public,
                meta: {
                  date: val.date,
                  other: status[val.public] || '-'
                }
              };
            });
            self.list[type] = [...self.list[type], ...res.Data.PageData];
            console.log('loadData res:', res.Data.PageData);
            self.lazyload[type].page += 1;
            if (!res.Data.PageIndex) {
              // 没有分页功能
              self.lazyload[type].nodata = true;
            }
          } else {
            // console.log('木有数据了');
            self.lazyload[type].nodata = true;
          }
          self.lazyload[type].loading = false;
        });
      }
    },
    go2url(item) {
      let to = { path: 'detail/' + item.id, append: true };
      this.$router.push(to);
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route:', to, from);
      let self = this;
      self.type = to.query.type || 'all';
      self.loadData();
    }
  },
  mounted() {
    let self = this;
    self.type = self.$route.query.type || 'all';
    console.log('mounted $route:', self.$route);
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.page-user-dangneiguanai {
  height 100%
}
.list {
  padding 10px
  border-radius 3px
  overflow hidden
}
.btnAdd {
  position fixed
  right 20px
  bottom 20px
  width 50px
  height 50px
  line-height 50px
  border-radius 5px
  background-color #f17474ba
  text-align center
  z-index 1
  &:hover {
    background-color #f17474
  }
  i {
    color #FFF
    font-size 36px
  }
}
.weui-panel {
  background-color #FFFFFF
  margin-top 10px
  position relative
  overflow hidden
}
.weui-panel:first-child {
  margin-top 0
}
.weui-panel:before {
  content ' '
  position absolute
  left 0
  top 0
  right 0
  border-top 1px solid #E5E5E5
  color #E5E5E5
  transform-origin 0 0
  transform scaleY(0.5)
}
.weui-panel:after {
  content ' '
  position absolute
  left 0
  bottom 0
  right 0
  height 1px
  border-bottom 1px solid #E5E5E5
  color #E5E5E5
  transform-origin 0 100%
  transform scaleY(0.5)
}
.weui-panel__hd {
  padding 14px 15px 10px
  color #999999
  font-size 13px
  position relative
}
.weui-panel__hd:after {
  content ' '
  position absolute
  left 0
  bottom 0
  right 0
  height 1px
  border-bottom 1px solid #E5E5E5
  color #E5E5E5
  transform-origin 0 100%
  transform scaleY(0.5)
  left 15px
}
.weui-media-box {
  padding 15px
  position relative
}
.weui-media-box:before {
  content ' '
  position absolute
  left 0
  top 0
  right 0
  border-top 1px solid #E5E5E5
  color #E5E5E5
  transform-origin 0 0
  transform scaleY(0.5)
  left 15px
}
.weui-media-box:first-child:before {
  display none
}
a.weui-media-box {
  color #000000
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)
}
a.weui-media-box:active {
  background-color #ECECEC
}
.weui-media-box__title {
  font-weight 400
  font-size 17px
  width auto
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  word-wrap normal
  word-wrap break-word
  word-break break-all
}
.weui-media-box__desc {
  color #999999
  font-size 13px
  line-height 1.2
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 2
}
.weui-media-box__info {
  margin-top 15px
  padding-bottom 5px
  font-size 13px
  color #CECECE
  line-height 1em
  list-style none
  overflow hidden
}
.weui-media-box__info__meta {
  float left
  padding-right 1em
}
.weui-media-box__info__meta_extra {
  padding-left 1em
  border-left 1px solid #CECECE
}
.weui-media-box_text .weui-media-box__title {
  margin-bottom 8px
}
.weui-media-box_appmsg {
  display flex
  align-items center
}
.weui-media-box_appmsg .weui-media-box__hd {
  margin-right 0.8em
  width 60px
  height 60px
  line-height 60px
  text-align center
}
.weui-media-box_appmsg .weui-media-box__thumb {
  width 100%
  max-height 100%
  vertical-align top
}
.weui-media-box_appmsg .weui-media-box__bd {
  flex 1
  min-width 0
}
.weui-media-box_small-appmsg {
  padding 0
}
.weui-media-box_small-appmsg .weui-cells {
  margin-top 0
}
.weui-media-box_small-appmsg .weui-cells:before {
  display none
}
</style>
