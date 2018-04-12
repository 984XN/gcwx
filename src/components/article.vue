<template>
  <article class="article">
    <div class="article-head">
      <h1>Lorem ipsum，中文又称“乱数假文”</h1>
      <div class="atricle-head-attr">
        <span class="author">作者：某某人</span>
        <span class="date">发布：2018-04-12 14:29</span>
      </div>
    </div>
    <div class="article-body">
      <p>Lorem ipsum从西元15世纪开始就被广泛地使用在西方的印刷、设计领域中，在电脑排版盛行之后，这段被传统印刷产业使用几百年的无意义文字又再度流行。由于这段文字以“Lorem ipsum”起头，并且常被用于标题的测试中，所以一般称为Lorem ipsum，简称为Lipsum。</p>
      <p>常见的Lorem ipsum起头如下：</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>原先大家以为这段拉丁文只是没有意义的组合， [1] 目的是让阅读者不要被文章内容所影响，而只专注于观察字型或版型，并借此填满空间。但根据美国拉丁学者Richard McClintock的研究，Lorem ipsum原来起源于西赛罗的《善恶之尽》（De finibus bonorum et malorum）：</p>
      <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit…</p>
      <p>（中译：无人爱苦，亦无人寻之欲之，乃因其苦…）</p>
      <p>为了减少Lorem ipsum的可读性，并且让字母出现的频率与现代英语接近，所以有些版本中部分字母被K、W、Z等拉丁文中没有的字母替换，或是加入zzril、takimata等字。除了原始的Lorem ipsum版本外，目前还有几套新的Lorem ipsum。</p>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      name: 'value'
    };
  },
  methods: {
    fn(param) {
      console.log('fn:', param);
    }
  }
};
</script>

<style lang="stylus" scoped>
.article {
  // border-radius 5px
  // margin 10px
  background-color #fff
  .article-head {
    padding 20px 10px 10px
    border-bottom 1px dotted #EEE
    text-align center
    h1 {
      font-size 20px
      font-weight normal
      padding-bottom 10px
    }
    .atricle-head-attr {
      color #999
      font-size 12px
      span {
        padding 0 10px
      }
    }
  }
  .article-body {
    padding 20px
    p {
      margin 1em 0
      word-wrap break-word
      word-break break-all
      &:first-child {
        margin-top 0
      }
      &:last-child {
        margin-bottom 0
      }
    }
    img {
      max-width 100%
    }
  }
}
</style>
