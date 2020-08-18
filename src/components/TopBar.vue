<template>
  <div id="topbar-wrap">
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <a class="head-title" @click="linkTo('index')">天才少年的Animation</a>
      </el-col>
      <el-col :span="14">
        <el-row type="flex" class="row-right" justify="end">
          <a class="animated fadeIn"></a>
          <a @click="editPwd" style="cursor: pointer;">修改密码</a>
          <a class="logout" @click.prevent="logout">退出</a>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../api/api.js";
export default {
  name: "topbar",
  data() {
    return {
    };
  },
  methods: {
    editPwd() {
      this.$prompt("请输入新密码", "提示").then(({ value }) => {
        this.$axios
          .post(this.$axios.interface.eidtPwd, { newPass: value })
          .then(res => {
            if (res.data.msg === "ok") {
              this.$message({
                type: "success",
                message: "修改成功",
                onClose: this.$router.push("/signin")
              });
            } else {
              this.$message.warning(res.data.msg);
            }
          });
      });
    },
    logout() {
      this.$router.push('/signin');
      // api.logout({ tonken: localStorage.tonken }).then(res => {
      //   if (res.data.msg === "ok") {
      //     localStorage.clear();
      //     this.$router.push("/signin");
      //   } else {
      //     this.$message.warning(res.data.msg);
      //   }
      // });
    },
    linkTo(path) {
      console.log(111);
      this.$router.push("/index");
    }
  }
};
</script>
<style scoped lang="less">
#topbar-wrap {
  overflow: hidden;
  border-bottom: 1px solid #e7eaec;
  background: #ffffff;
  color: #1890ff;
  padding: 0 30px;
  z-index: 4;
  box-sizing: border-box;
  transition: all 0.3s;
  .logo {
    color: #fff;
    font-weight: bold;
    line-height: 60px;
    margin: 0;
    letter-spacing: 1px;
  }
  .freeBtn {
    margin-top: 12px;
    text-align: right;
  }
  .name {
    font-weight: 600;
  }
  .el-icon-setting {
    transition: 1s;
    &:hover {
      transform: rotate(180deg);
      cursor: pointer;
    }
  }
  .fa {
    font-size: 24px;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
    }
  }
  a {
    line-height: 60px;
  }
  a.logout {
    text-decoration: none;
    &:hover {
      color: #20a0ff;
    }
  }
  i {
    font-size: 20px;
    line-height: 60px;
  }
  .logout {
    cursor: pointer;
    &:hover {
      color: #20a0ff;
    }
  }
}
.fa.nav-rotate {
  transform: rotate(90deg);
}
.row-right > a {
  font-size: 14px;
  margin-left: 30px;
}
.row-right > div {
  text-align: center;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}

.head-title {
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  cursor: pointer;
}
.animated {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(40, 52, 70, 1);
}
</style>
