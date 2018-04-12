<template>
  <div :class="'page-article-' + name">
    <MenuSub></MenuSub>
    <container>
      <ArticleList :list="list"></ArticleList>
    </container>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from 'src/components/menu';
import MenuSub from 'src/components/menuSub';
import Container from 'src/components/container';
import ArticleList from 'src/components/ArticleList';

export default {
  props: {
    name: String,
    list: Array
  },
  components: {
    Menu,
    MenuSub,
    Container,
    ArticleList
  }
};
</script>
