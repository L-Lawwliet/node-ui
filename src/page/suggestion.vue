<template>
  <div>
    <div class="crumb">客服反馈</div>
    <el-row :gutter="40">
      <el-col :span="14">
        <div class="backfff">
          <div class="container-head">
            <span>系统消息</span>
          </div>
          <div class="container-all">
            <div class="con-title">尊敬的用户:</div>
            <p>为了更好的完善系统,提高系统可用性,希望各位能积极反馈问题与需求,平台会积极响应并尽量满足各用户的需求,谢谢您的配合!</p>
            <el-input type="textarea" :rows="7" placeholder="希望各位能积极反馈问题与需求,平台会积极响应并尽量满足各用户的需求,谢谢您的宝贵建议" v-model="announcement"></el-input>
            <el-button type="primary" size="medium" class="sugbut">提交反馈</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="backfff">
          <div class="container-head">
            <span>联系客服</span>
          </div>
          <div class="container-all">
            <p class="container-text" style="margin: 0;">客服电话: 400-1234-1234</p>
            <p class="container-text">客服微信: wxid91279213</p>
            <p class="container-text">公司名称:深圳市零烦恼软件科技有限公司</p>
            <p class="container-text">公司地址:深圳市罗湖区水贝工业区4栋5楼</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "suggestion",
  data() {
    return {
      issueVb: false,
      announcement: ""
    };
  },
  methods: {
    addClick() {
      this.issueVb = true;
      this.announcement = "";
    }
  }
};
</script>
<style scoped lang="less">
.container-all {
  padding: 030px;
  font-size: 14px;
  color: #999;
  height: 400px;
  font-family:MicrosoftYaHei;
}
.con-title {
  color: #333333;
  font-size: 16px;
}
.sugbut {
  margin-top: 40px;
}
.container-text {
  color: #282828;
}
</style>


