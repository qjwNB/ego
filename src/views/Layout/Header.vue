<template>
  <div>
    <div class="header_left" @click="changeMenu">
      <i
        class="iconfont"
        :class="flag ? 'icon-right-indent' : 'icon-left-indent'"
      ></i>
    </div>
    <div class="header_right">
      <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ $t("home.ChooseLanguage") }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ch">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="userinfo">{{ userInfo.user }}</div>
      <div class="exit" @click="exitHandle">
        <i class="iconfont icon-tuichu"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false,
    };
  },
  computed: {
    ...mapState("LoginModule", ["userInfo"]),
  },
  methods: {
    ...mapMutations("LoginModule", ["setUser"]),
    //修改导航
    changeMenu() {
      this.flag = !this.flag;
      this.$emit("changeNav", this.flag);
    },
    //退出
    exitHandle() {
      this.setUser({
        user: "",
        token: "",
      });
      localStorage.removeItem("userToken");
      this.$router.push("/login");
    },
    //切换语言
    handleCommand(command) {
      this.$i18n.locale=command
    },
  },
};
</script>

<style lang="less" scoped>
.header_left {
  float: left;
  .iconfont {
    font-size: 26px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.header_right {
  float: right;
  .userinfo,
  .exit,
  .dropdown {
    color: #fff;
    float: left;
    margin: 0 10px;
    .iconfont {
      font-size: 26px;
      font-weight: 700;
      margin-right: 15px;
      color: indianred;
      cursor: pointer;
    }
  }
}
</style>