<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <SlideNav class="slideNav" :isCollapse="flag" />
    <!-- 头部 -->
    <Header @changeNav="changeNav" class="header" />
    <!-- 内容主体 -->
    <Content class="content"/>
  </div>
</template>

<script>
import SlideNav from "./SlideNav";
import Header from "./Header";
import Content from "./Content";
export default {
  data() {
    return {
      flag: false,
    };
  },
  components: {
    SlideNav,
    Header,
    Content,
  },
  methods: {
    changeNav(val) {
      this.flag = val;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .slideNav {
    height: 100%;
    background-color: #304156;
    float: left;
  }
  .header {
    height: 56px;
    line-height: 56px;
    padding-left: 10px;
    background: #1e78bf;
    color: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }
  .content{
    overflow: hidden;
  }
}
</style>