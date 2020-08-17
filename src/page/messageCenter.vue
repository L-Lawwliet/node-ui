<template>
  <div>
    <div class="crumb">消息中心</div>
    <el-row :gutter="40">
      <el-col :span="14">
        <div class="backfff">
          <div class="container-head flex-B pan-10">
            <span>系统消息</span>
            <el-button type="primary" size="medium" @click="addClick()">发布公告</el-button>
          </div>
          <div class="container-all">
            <div class="container-div" v-for="item of platformNoticeList" :key="item.id">
              <div class="con-title"><span>通知</span>{{item.starTime}}</div>
              <p>{{item.noticeContent}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="backfff">
          <div class="container-head ">
            <span>圈内动态</span>
          </div>
          <div style="padding-bottom: 30px;">
            <div class="container-footer" v-for="item of shopCondition" :key="item.companyName">
              <div class="footer-num mb20">{{item.companyName}}<span class="bianji">餐饮</span></div>
              <el-row :gutter="40" class="footer-text">
                <el-col :span="12">
                  <div class="flex-B mb20">
                    <div>发放积分</div>
                    <div>{{item.sendPointVal}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex-B">
                    <div>核销优惠券</div>
                    <div>{{item.useCouponCount}}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="40" class="footer-text">
                <el-col :span="12">
                  <div class="flex-B">
                    <div>发放优惠券</div>
                    <div>{{item.sendCouponCount}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="flex-B">
                    <div>核销商品券</div>
                    <div>{{item.useGoodsCouponCount}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
           
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="发布圈内公告" :visible.sync="issueVb" width="600px" :close-on-click-modal="false" :show-close="false">
      <div class="flex-row">
        <span style="width: 80px;">公告内容</span>
        <el-input type="textarea" :rows="6" placeholder="输入公告内容" v-model="noticeContent"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="issueVb = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>

    </el-dialog>
  </div>

</template>
<script>
export default {
  name: "messageCenter",
  data() {
    return {
      issueVb: false,
      noticeContent: "",
      platformNoticeList: [
        {
          id: "1",
          noticeContent:
            "系统将与2019年7月8日晚上22:00进行版本升级,请提前做好准备工作,升级,请提前做好准备工作.谢谢!",
          starTime: "2019/03/05 16:20"
        },
        {
          id: "1",
          noticeContent:
            "系统将与2019年7月8日晚上22:00进行版本升级,请提前做好准备工作,升级,请提前做好准备工作.谢谢!",
          starTime: "2019/03/05 16:20"
        }
      ],
      shopCondition: [
        {
          companyName: "一点点",
          sendPointVal: "11",
          sendCouponCount: "33",
          useCouponCount: "99",
          useGoodsCouponCount: "77"
        },
          {
          companyName: "周六福",
          sendPointVal: "11",
          sendCouponCount: "33",
          useCouponCount: "99",
          useGoodsCouponCount: "77"
        }
      ]
    };
  },
  methods: {
    addClick() {
      this.issueVb = true;
      this.noticeContent = "";
    },
    confirm() {}
  }
};
</script>

<style scoped lang="less">
.container-all {
  padding: 0px 30px;
  font-size: 14px;
  color: #999;
}
.container-div {
  padding: 30px 0px;
  border-bottom: 1px solid #eeeeee;
}
.con-title {
  color: #bbbbbb;
}
.con-title > span {
  color: #333;
  font-size: 16px;
  margin-right: 14px;
  font-weight: 400;
}
.pan-10 {
  padding: 10px 30px;
}
.container-footer {
  padding: 30px 30px 0px 30px;
}
.footer-num {
  font-weight: bold;
  font-size: 18px;
}
.bianji {
  color: #999999;
  font-size: 12px;
  margin-left: 10px;
  font-weight: initial;
}
.footer-text {
  width: 350px;
  font-size: 14px;
  color: #282828;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}
</style>
