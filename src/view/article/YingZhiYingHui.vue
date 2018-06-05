<template>
  <container :lazyload="lazyload" @loadData="loadData">
    <ul class="manualList">
      <li>
        <a href="javascript:;">
          <div class="thumb">
            <img src="/static/img/YingZhiYingHui/0.gif" alt="Banner">
          </div>
          <div class="title">应知应会</div>
        </a>
      </li>
      <li v-if="list.length" v-for="(item,n) in list" :key="n">
        <router-link :to="{path: 'detail/' + item.id}">
          <div class="thumb">
            <img :src="item.thumb" :alt="item.title">
          </div>
          <div class="title">{{item.title}}</div>
        </router-link>
      </li>
    </ul>
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
  </container>
</template>

<script>
import * as api from 'src/api/article';

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
      let self = this;
      if (self.lazyload.loading) {
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        self.lazyload.loading = false;
      } else {
        api.article
          .list({
            model: {},
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
            Theme: 60
          })
          .then(res => {
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
              if (!res.Data.PageIndex) {
                // 没有分页功能
                self.lazyload.nodata = true;
              }
            } else {
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
          });
      }
    }
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus">
.manualList {
  border-color #CCC
  padding 0 20px
  background-color #fff
  list-style none
  border-radius 5px
}
.manualList li {
  border-bottom 1px solid #EFF1F3
}
.manualList li:last-child {
  border none
}
.manualList li a {
  position relative
  display block
  color #000
  padding 10px 0
  min-height 54px
}
.manualList li a:after {
  content ''
  display block
  clear both
  height 0
}
.manualList li .thumb {
  height 54px
  overflow hidden
  float right
  margin-left 24px
  background-color #b7b7b7
  border-radius 3px
}
.manualList li .thumb,
.manualList li .thumb img {
  width 54px
}
.manualList li .title {
  line-height 140%
}
.manualList li:first-child {
  padding 10px 0
}
.manualList li:first-child .thumb,
.manualList li:first-child img {
  width 100%
  height 43vw
  overflow hidden
}
.manualList li:first-child a {
  padding-bottom 0
}
.manualList li:first-child img {
  height auto
}
.manualList li:first-child .title {
  display none
  position absolute
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.7)
  color #FFF
  padding 10px 24px
}
</style>
