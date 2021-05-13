<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">{{ $t("home.management") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("home.Commodity") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("home.parameters") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("home.Advertising") }}</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{ $t("home.personal") }}</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>{{ $t("home.MyDesk") }}</span>
        </template>
        <el-menu-item index="2-1">{{ $t("home.Option1") }}</el-menu-item>
        <el-menu-item index="2-2">{{ $t("home.Option2") }}</el-menu-item>
        <el-menu-item index="2-3">{{ $t("home.Option3") }}</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">{{ $t("home.Option4") }}</template>
          <el-menu-item index="2-4-1">{{ $t("home.Option1") }}</el-menu-item>
          <el-menu-item index="2-4-2">{{ $t("home.Option2") }}</el-menu-item>
          <el-menu-item index="2-4-3">{{ $t("home.Option3") }}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  border-right: 0;
}
.is-active{
    background: #1f2d3d !important;
}
</style>