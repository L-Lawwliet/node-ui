<template>
  <div>
    <div class="crumb account-height" style="display:block">
      <div>当前可用积分</div>
      <div class="account-header">
        <span>24,000</span>
      </div>
    </div>
    <div class="backfff">
      <div class="container-head">
        <span>积分支出记录</span>
      </div>
      <div class="container">
        <el-row>
          <el-form :model="searchForm" ref="searchForm" label-width="48px" class="demo-ruleForm" :inline='true'>
            <el-form-item label="筛选">
              <el-date-picker @change="search" v-model="searchForm.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '00:00:00']" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="tableData" border style="width: 100%;margin-top:8px" show-summary sum-text="总计">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="支出积分"></el-table-column>
          <el-table-column prop="assMobile" label="剩余可用积分"></el-table-column>
          <el-table-column prop="assStatus" label="会员昵称"></el-table-column>
          <el-table-column prop="assStatus" label="手机号"></el-table-column>
          <el-table-column prop="assMobile" label="消费金额(元)"></el-table-column>
          <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="backfff bottom-table">
      <div class="container-head">
        <span>积分转入记录</span>
      </div>
      <div class="container">
        <el-table :data="tableData" border style="width: 100%" show-summary sum-text="总计">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="assName" label="转入积分"></el-table-column>
          <el-table-column prop="assMobile" label="剩余可用积分"></el-table-column>
          <el-table-column prop="createTime" label="转入时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        time: []
      },
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
  created() {},
  methods: {
    search() {
      //搜索
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
</style>

