<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" :rules="rules" v-show="!showForget" status-icon label-width="0px" class="login-container">
        <div class="title">生活圈商家管理后台</div>
        <el-form-item prop="account">
          <el-input v-model="form.account" class="form-input">
            <span slot="prefix">账号</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" class="form-input" @keyup.enter.native="Login('form')">
            <span slot="prefix">密码</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" @click="Login('form')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="text" @click="showForget=true" style="color:#999;">忘记密码</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" v-show="showForget" status-icon label-width="0px" class="login-container">
        <div class="title forget">忘记密码</div>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" class="form-input">
            <span slot="prefix">手机号</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="verification">
          <el-input v-model="form.verification" class="form-input">
            <span slot="prefix">验证码</span>
            <el-button type="text" slot="suffix">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input v-model="form.newPassword" type="password" class="form-input" @keyup.enter.native="Login('form')">
            <span slot="prefix">新密码</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" class="form-input" @keyup.enter.native="Login('form')">
            <span slot="prefix">确认密码</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" @click="Login('form')">确定</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="text" @click="showForget=false" style="color:#999;">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import api from "../api/api.js";
export default {
  name: "signin",
  data() {
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "1111",
        password: "123456"
      },
      isMemery: false,
      rules: {
        account: [
          { required: true, message: "*请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "*请输入密码", trigger: "blur" }]
      },
      forgetForm: {
        phone: "",
        verification: "",
        newPassword: "",
        confirmPassword: ""
      },
      forgetRules: {
        phone: [
          {
            required: true,
            message: "*请输入正确的商家登录号码",
            trigger: "blur"
          }
        ],
        verification: [
          { required: true, message: "*请输入正确的验证码", trigger: "blur" }
        ],
        confirmPassword: [{ validator: confirmPassword, trigger: "blur" }]
      },
      showForget: false
    };
  },
  methods: {
    Login(formName) {
      // this.$router.push("home");
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            grant_type: "password",
            username: this.form.account,
            password: this.form.password,
            sope: "all",
            client_id: "CLIENT_CIRCLE_MANGER",
            client_secret: "123456"
          };
          api.login(params).then(res => {
            if (res.data.access_token) {
              localStorage.setItem("access_token", res.data.access_token);
              this.$router.push("index");
            } else {
              this.$message.warning('登录失败');
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.el-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/bg.png");
  background-position: -20% 10%;
  background-size: contain;
  #particles-js {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: auto auto;
  width: 370px;
  padding: 70px 40px 15px 40px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px rgba(0, 89, 178, 0.3);
  .title {
    font-family: "MicrosoftYaHei";
    font-size: 28px;
    margin: 0px auto 80px auto;
    text-align: center;
    color: #0d86ff;
    &.forget {
      color: #666666;
    }
  }
  .el-form-item {
    margin-bottom: 48px;
  }
}
</style>
