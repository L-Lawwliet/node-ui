<template>
  <div>
    <div class="crumb account-height" style="display:block">
      <div>当前总积分</div>
      <div class="account-header">
        <span>450,000</span>
        <el-button class="button-margin" type="primary" size="medium" @click.native="recharge()">充值</el-button>
        <el-button size="medium" @click="transfer">转账</el-button>
      </div>
    </div>
    <div class="backfff">
      <div class="container-head">
        <span>积分转账记录</span>
      </div>
      <div class="container">
        <el-row>
          <el-form :model="searchForm" ref="searchForm" label-width="48px" class="demo-ruleForm" :inline='true'>
            <el-form-item label="筛选">
              <el-date-picker @change="search" v-model="searchForm.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '00:00:00']" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="tableData" border style="width: 100%;margin-top:8px" show-summary sum-text="总计">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="转账积分"></el-table-column>
          <el-table-column prop="assMobile" label="剩余可用积分"></el-table-column>
          <el-table-column prop="assMobile" label="接收门店"></el-table-column>
          <el-table-column prop="assStatus" label="手机号"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="backfff bottom-table">
      <div class="container-head">
        <span>积分充值记录</span>
      </div>
      <div class="container">
        <el-table :data="tableData" border style="width: 100%" show-summary sum-text="总计">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="充值金额(元)"></el-table-column>
          <el-table-column prop="assMobile" label="充值积分"></el-table-column>
          <el-table-column prop="assMobile" label="剩余可用积分"></el-table-column>
          <el-table-column prop="assStatus" label="充值方式"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="充值" :visible.sync="issueVb" width="800px" :close-on-click-modal="false" :show-close="false">
      <el-steps :active="stepsactive" finish-status="success" simple class="mb20">
        <el-step title="确认充值"></el-step>
        <el-step title="支付充值"></el-step>
        <el-step title="充值成功"></el-step>
      </el-steps>
      <div v-show="stepsactive===0">
        <el-row class="mb20" :gutter="20">
          <el-col :span="6">
            <div class="grid-purple">充值数量</div>
          </el-col>
          <el-col :span="18">
            <div class="flex-row">
              <div class="bianqian" v-for="(item, index) of prepaNumber" :key="item" @click="choicePrepaNumber(item, index)" v-bind:class="{'weui-bar':PrepaNumberIndex==index}">{{item}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-purple">其他数量</div>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="不低于100" v-model="pointsVal2" @focus="pointsValfocus"></el-input>
          </el-col>
        </el-row>
      </div>
      <div v-show="stepsactive===1">
        <el-row :gutter="20" class="mb20">
          <el-col :span="12">
            <div class="text-r">充值数量</div>
          </el-col>
          <el-col :span="12">
            {{pointsVal}}
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb20">
          <el-col :span="12">
            <div class="text-r">支付金额</div>
          </el-col>
          <el-col :span="12">
            <span class="red">{{pointsVal}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb20">
          <el-col :span="12">
            <div class="text-r">扫码支付</div>
          </el-col>
          <el-col :span="12" style="padding:0px">
            <canvas id="erweiVal"></canvas>
            <div style="margin-left: 16px;">请使用微信扫码支付</div>
          </el-col>
        </el-row>
      </div>
      <div v-show="stepsactive===2">
        <div class="succeedPoints">您已充值成功</div>
        <div class="succeedval">
          <div class="mb20">充值数量：{{pointsVal}}</div>
          <div>支付金额：<span class="red">{{pointsVal}}</span></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextstep" v-if="stepsactive===0">下一步</el-button>
        <el-button type="primary" @click="stepsactive = 0" v-if="stepsactive===1">上一步</el-button>
        <el-button type="primary" @click="nextstepS" v-if="stepsactive===1">下一步</el-button>
        <el-button @click="issueVb = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="积分转账" :visible.sync="transferVb" width="600px" :close-on-click-modal="false" :show-close="false">
      <el-row :gutter="20" class="mb20">
        <el-col :span="6">
          <div class="grid-purple text-r">转账门店</div>
        </el-col>
        <el-col :span="18">
          <el-select v-model="receiveAccId" clearable placeholder="请选择" style="width:200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-purple text-r">转账数量</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="不低于100积分" v-model="pointsValTransfer"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferVb = false">取 消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      issueVb: false,
      stepsactive: 0,
      PrepaNumberIndex: 0,
      transferVb: false,
      pointsVal1: "800",
      pointsVal2: "",
      pointsVal: "",
      pointsValTransfer: "",
      receiveAccId:'',
      searchForm: {
        time: []
      },
      prepaNumber: [800, 1000, 2000, 6000],
      tableData: [
        {
          assName: "12",
          assMobile: "15747898564",
          createTime: "2019-03-21 9:34:74",
          assStatus: "微信"
        },
        {
          assName: "13",
          assMobile: "15747898564",
          createTime: "2019-03-21 9:34:74",
          assStatus: "支付宝"
        }
      ],
      options:[],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    search() {
      //搜索
    },
    recharge() {
      //充值
      this.stepsactive = 0;
      this.issueVb = true;
      this.PrepaNumberIndex = 0;
    },
    transfer() {
      //转账
      this.transferVb = true;
      this.pointsValTransfer = "";
    },
    choicePrepaNumber(e, i) {
      this.PrepaNumberIndex = i;
      this.pointsVal1 = e;
      this.pointsVal2 = "";
    },
    pointsValfocus() {
      this.PrepaNumberIndex = -1;
    },
    // 下一步
    nextstep() {
      this.stepsactive = 1;
      this.pointsVal =
        this.PrepaNumberIndex == -1 ? this.pointsVal2 : this.pointsVal1;
      var msg = document.getElementById("erweiVal");
      QRCode.toCanvas(msg, "https://www.jianshu.com/p/f6e92d255974", function(
        error
      ) {
        console.log(error);
      });
    },
    // 再下一步
    nextstepS() {
      this.stepsactive = 2;
    }
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
.el-step.is-simple .el-step__icon {
  display: none;
}
.el-step__title.is-success {
  color: #409eff;
}
.el-steps--simple {
  padding: 13px 20%;
}
.bianqian {
  padding: 5px 10px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  margin-right: 10px;
}
.grid-purple {
  line-height: 30px;
  text-align: right;
}
.weui-bar {
  background: #b3d8ff;
  color: #1890ff;
  border: 1px solid rgba(179, 216, 255, 1);
}
.succeedPoints {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.succeedval {
  width: 340px;
  height: 60px;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px;
}
.red {
  color: #f56c6c;
}
</style>

