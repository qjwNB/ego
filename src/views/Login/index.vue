<template>
  <div class="login-box">
    <h2>易购后台管理系统</h2>
    <div class="login">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <div class="input_box">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <div class="input_box">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="btn"
                  >注册</el-button
                >
                <el-button @click="resetForm('ruleForm')" class="btn"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setUser"]),
    ...mapActions("LoginModule", ["setUserActions"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.ruleForm;
          if (this.activeName === "first") {
            this.setUserActions({ username, password });
          } else {
            this.$api
              .getRegister({
                username,
                password,
              })
              .then((res) => {
                this.$message({
                  showClose: true,
                  message: "注册成功,赶紧登录吧！",
                  type: "success",
                });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick() {
      this.$refs.ruleForm.resetFields();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.login-box {
  background: url("../../assets/images/bj.jpg") no-repeat center;
  height: 100%;
  overflow: hidden;
  text-align: center;
  h2 {
    margin-top: 150px;
    color: #fff;
    font-size: 30px;
    text-shadow: black 0.1em 0.1em 0.2em;
  }
  .login {
    width: 500px;
    height: 300px;
    margin: 50px auto;
    border: 1px solid #fff;
    .el-tabs__item {
      font-weight: 800;
    }
    .el-tabs__item.is-active {
      background-color: #409eff;
      color: #fff;
    }
  }
  .input_box {
    padding: 25px;
  }
  .el-button {
    width: 100%;
  }
  .btn {
    width: 48%;
  }
}
</style>