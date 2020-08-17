<template>
  <div>
    <div class="crumb account-height" style="display:block">
      <div>当前账号余额</div>
      <div class="account-header">
        <span>4,000</span>
        <el-button class="button-margin" type="primary" size="medium" @click="withdrawal">提现</el-button>
        <el-button size="medium" @click="bind">绑定银行卡</el-button>
      </div>
    </div>
    <div class="backfff">
      <div class="container-head">
        <span>进账记录</span>
      </div>
      <div class="container">
        <el-row>
          <el-form :model="searchForm" ref="searchForm" label-width="48px" class="demo-ruleForm" :inline='true'>
            <el-form-item label="筛选">
              <el-select v-model="searchForm.searchType" placeholder="请选择搜索类型">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="searchForm.searchType == 1">
              <el-select v-model="searchForm.type" placeholder="请选择类型" @change="search">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="searchForm.searchType == 2" label-width="76px">
              <el-input v-model="searchForm.name" placeholder="请输入商品名称" @keyup.native="search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="tableData" border style="width: 100%;margin-top:8px">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="进账金额(元)"></el-table-column>
          <el-table-column prop="assName1" label="账户余额(元)"></el-table-column>
          <el-table-column prop="assMobile" label="类型"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="assStatus" label="商品金额(元)"></el-table-column>
          <el-table-column prop="assStatus" label="返积分"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="backfff bottom-table">
      <div class="container-head">
        <span>提现记录</span>
      </div>
      <div class="container">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="提现金额(元)"></el-table-column>
          <el-table-column prop="assName1" label="账户余额(元)"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 0" type="danger" size="small">审核中</el-tag>
              <el-tag v-else type="success" size="small">已到账</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="现金提现" :visible.sync="depositVb" width="600px" :close-on-click-modal="false" :show-close="false">
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r">提现金额</div>
        </el-col>
        <el-col :span="18">
          <span class="red">4000</span>元
        </el-col>
      </el-row>
      <div v-if="depositShow">
        <el-row :gutter="20" class="mb20">
          <el-col :span="6">
            <div class="text-r">提现银行卡</div>
          </el-col>
          <el-col :span="18">
            40004450628565569 <span class="renewal" @click="updatebind">更换银行卡</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="color:#C3C3C3;margin-bottom: 10px;">
          <el-col :span="6">
            <div class="text-r">手机号</div>
          </el-col>
          <el-col :span="18">
            134336336998
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb20">
          <el-col :span="6">
            <div class="grid-purple text-r">短信验证码</div>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="输入验证码" v-model="verificationCode"></el-input>
            <el-button type="primary" size="medium" @click="getCode" v-if="canSend">获取验证码</el-button>
            <span v-if="!canSend">{{countDown}}秒后可重发</span>
          </el-col>
        </el-row>
      </div>
      <div v-if="!depositShow">
        <el-row :gutter="20" class="mb20">
          <el-col :span="6">
            <div class="text-r">提现银行卡</div>
          </el-col>
          <el-col :span="18">
            您未绑定银行卡,<span class="renewal" @click="bind()">请先绑定银行卡 >></span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDeposit" :disabled="depositShow">确定提现</el-button>
        <el-button @click="depositVb = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="updateCar?'绑定银行卡':'更换银行卡'" :visible.sync="bankCardVb" width="600px" :close-on-click-modal="false" :show-close="false">
      <div class="tishi" v-if="!updateCar">仅可绑定一张银行卡，确认更换银行卡后，系统将自动解绑原绑定的银行卡。</div>
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r grid-purple">选择银行</div>
        </el-col>
        <el-col :span="18">
          <el-select v-model="bankCard.bankNo" placeholder="请选择类型" @change="search">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r grid-purple">银行卡号</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入银行卡号" v-model="bankCard.cardNo"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r grid-purple">持卡人</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入持卡人姓名" v-model="bankCard.name "></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r grid-purple">手机号</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入银行预留手机号" v-model="bankCard.mobile "></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="text-r grid-purple">短信验证码</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入验证码" v-model="verificationCode "></el-input>
          <el-button type="primary" size="medium" @click="getCode" v-if="canSend">获取验证码</el-button>
          <span v-if="!canSend">{{countDown}}秒后可重发</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmbankCard">{{updateCar?'立即绑定':'更换银行卡'}}</el-button>
        <el-button @click="bankCardVb = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      depositVb: false,
      bankCardVb: false,
      depositShow: true,
      verificationCode: "",
      updateCar: false,
      canSend: true,
      countDown: 59,
      timer: null,
      bankCard: {
        name: "",
        bankName: "",
        bankNo: "",
        cardNo: "",
        mobile: ""
      },
      typeOptions: [
        {
          label: "类型",
          value: 1
        },
        {
          label: "商品名称",
          value: 2
        }
      ],
      options: [
        {
          label: "秒杀",
          value: 1
        },
        {
          label: "组合",
          value: 2
        }
      ],
      searchForm: {
        searchType: 1,
        type: null,
        name: ""
      },
      token: "",
      tableData: [
        {
          assName: "12",
          assName1: "15",
          assMobile: "团购",
          name: "麻辣香锅",
          createTime: "2019-03-21 9:34:74",
          assStatus: "99",
          status: 0
        },
        {
          assName: "13",
          assName1: "154",
          assMobile: "秒杀",
          name: "麻辣香锅2",
          createTime: "2019-03-21 9:34:74",
          assStatus: "79",
          status: 1
        }
      ]
    };
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    search() {
      //搜索
    },
    withdrawal() {
      this.depositVb = true;
      this.canSend = true;
      //提现
    },
    bind() {
      //绑定弹窗
      this.updateCar = true;
      this.bankCardVb = true;
      this.depositVb = false;
      this.canSend = true;
    },
    updatebind() {
      // 更新绑定弹窗
      this.updateCar = false;
      this.bankCardVb = true;
      this.depositVb = false;
      this.canSend = true;
    },
    getCode() {
      // 获取验证码按钮
      this.canSend = false;
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown === -1) {
          clearInterval(this.timer);
          this.countDown = 59;
          this.canSend = true;
        }
      }, 1000);
    },
    // 确定提现
    confirmDeposit() {
      clearInterval(this.timer);
    },
    // 确定绑定银行卡
    confirmbankCard() {}
  },
  mounted() {}
};
</script>
<style scoped>
.backfff >>> .el-form-item__label {
  padding-right: 20px;
}
.backfff >>> .el-input__inner {
  width: 304px !important;
}
.backfff >>> .el-form-item {
  margin-right: 24px;
}
.bottom-table {
  margin-top: 20px;
}
.renewal {
  margin-left: 20px;
  color: #409eff;
}
.grid-purple {
  line-height: 40px;
}
.red {
  color: #f56c6c;
}
.tishi {
  background: #fdf6ec;
  color: #e6a23c;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
</style>

