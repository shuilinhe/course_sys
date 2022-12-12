<template>
  <div class="bigback">
    <el-form
      :rules="rules"
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">排课系统登录</h3>
      <el-form-item prop="username">
        <el-input
          class="input"
          type="text"
          auto-complete="false"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" class="pwd">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        >
          <i class="el-icon-view el-icon--right"></i>
        </el-input>
      </el-form-item>

      <el-button
        class="login_btn"
        type="primary"
        style="width: 100%"
        @click="submitLogin"
        >登录</el-button
      >
      <el-link
        :underline="false"
        class="login_phone"
        href="http://localhost:8080/#/loginphone"
        >短信快捷登录</el-link
      >
      <el-link
        :underline="false"
        class="forgot_pwd"
        href="http://localhost:8080/#/forgot-pwd"
        >忘记密码</el-link
      >
      <el-link
        type="primary"
        :underline="false"
        class="register"
        href="http://localhost:8080/#/register"
        >注册</el-link
      >
    </el-form>
  </div>
</template>
<script src="../utils/api.js"></script>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      checked: true,
      rules: {
        /*这些名称不是与loginForm中的名称对应的，而是与prop对应 */
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  created() {
    this.submitLogin();
  },

  methods: {
    submitLogin() {
      this.loading = false;
      if (
        this.loginForm.username == "admin" &&
        this.loginForm.password == "123"
      ) {
        this.$router.replace("/home");
      }
    },
  },
};
</script>

<style scoped>
.bigback {
  width: 100%;
  height: 862px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../assets/xueyuan.webp") no-repeat 2px 2px/ 1710px 880px;
}

.loginContainer {
  position: relative;
  top: 180px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 350px;
  height: 350px;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  position: relative;
}
.loginTitle {
  margin: 10px auto 40px auto;
  text-align: center;
}

.login_phone {
  color: black;
  font-size: 12px;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.forgot_pwd {
  color: black;
  font-size: 12px;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.register {
  color: #409eff;
  font-size: 12px;
  position: absolute;
  top: 340px;
  right: 50px;
}

.pwd {
  margin-top: 10px;
}
.login_btn {
  margin-top: 10px;
}
.input {
  border: none;
  outline: none;
}
</style> 