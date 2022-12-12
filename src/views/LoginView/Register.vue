<template>
  <div class="bigback">
    <el-form
      :rules="rules"
      ref="RegisterForm"
      :model="RegisterForm"
      class="RegisterContainer"
    >
      <h3 class="RegisterTitle">注册账号</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          auto-complete="false"
          v-model="RegisterForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          type="text"
          auto-complete="false"
          v-model="RegisterForm.phone"
          placeholder="请输入手机号"
          prefix-icon="el-icon-phone"
        ></el-input>
      </el-form-item>

      <el-form-item prop="newpwd">
        <el-input
          type="password"
          auto-complete="false"
          v-model="RegisterForm.newpassword"
          placeholder="请输入新密码"
          show-password="true"
          prefix-icon="el-icon-lock"
        >
          <i class="el-icon-view el-icon--right"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmnewpwd">
        <el-input
          type="password"
          auto-complete="false"
          v-model="RegisterForm.confirmpassword"
          placeholder="确认密码"
          show-password="true"
          prefix-icon="el-icon-lock"
        >
          <i class="el-icon-view el-icon--right"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          type="text"
          auto-complete="false"
          v-model="RegisterForm.code"
          placeholder="请输入验证码"
          prefix-icon="el-icon-s-check"
        >
          <i class="el-icon-view el-icon--right"></i>
        </el-input>
      </el-form-item>

      <el-button
        class="register_btn"
        type="primary"
        style="width: 100%"
        @click="submitRegister"
        >确认</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // captchaUrl:'/captcha?time='+new Data(),
      RegisterForm: {
        // username:'12345678901',
        // password:'123',
        // code:''
      },
      checked: true,
      rules: {
        /*这些名称不是与loginForm中的名称对应的，而是与prop对应 */
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        newpwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmnewpwd: [
          { required: true, message: "确认密码", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitRegister() {
      this.$refs.RegisterForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          this.$message.error("请输入所有字段！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.bigback {
  width: auto;
  height: 820px;
  /*为背景设置透明度*/
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../assets/xueyuan.webp") no-repeat 2px 2px/ 1580px 880px;
}
.RegisterContainer {
  position: relative;
  top: 180px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 350px;
  height: 480px;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  position: relative;
}
.RegisterTitle {
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

.register_btn {
  margin-top: 10px;
}
</style>