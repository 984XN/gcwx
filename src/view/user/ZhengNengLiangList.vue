<template>
  <container :lazyload="lazyload" @loadData="loadData" top="0" bottom="0">
    <no-data v-if="!list.length && !lazyload.loading">还没有上传过正能量</no-data>
    <div v-if="list.length" class="list">
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
    <router-link :to="{path:'/activity/zhengnengliang/add',query:{from:'user'}}" class="btnAdd">
      <i class="iconfont icon-add"></i>
    </router-link>
  </container>
</template>

<script>
import * as api from 'src/api/activity';

export default {
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      list: []
    };
  },
  methods: {
    loadData() {
      // console.log('XiLieJianHua.loadData...');
      let self = this;
      if (self.lazyload.loading) {
        // console.log('已经在加载中，return');
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        // console.log('XiLieJianHua.loadData...没有数据了');
        self.lazyload.loading = false;
      } else {
        // console.log('XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据');
        api.activity.ZhengNengLiang.list({
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
          api: 'self'
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
            this.list = [...this.list, ...res.Data.PageData];
            console.log('loadData res:', res.Data.PageData);
            self.lazyload.page += 1;
            if (!res.Data.PageIndex) {
              // 没有分页功能
              self.lazyload.nodata = true;
            }
          } else {
            // console.log('木有数据了');
            self.lazyload.nodata = true;
          }
          self.lazyload.loading = false;
        });
      }
    },
    go2url(item) {
      let to = '';
      // 通过只能看，其它只能改：0待审，1通过，2拒绝
      if (item.public === 1) {
        to = { path: '/activity/zhengnengliang/list?id=' + item.id };
      } else {
        to = { path: 'edit/' + item.id, append: true };
      }
      console.log('path:', to);
      this.$router.push(to);
    }
  },
  mounted() {},
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
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
  border-left 1px solid #e6e6e6
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
