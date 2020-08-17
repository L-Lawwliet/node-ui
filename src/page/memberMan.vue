<template>
  <div>
    <div class="crumb">会员管理</div>
    <div class="backfff  mb20">
      <div class="container-head">
        <span>会员列表</span>
      </div>
      <div class="container member" style="max-height: 570px;">
        <div class="search flexWarp ">
          <div class="item mr24">
            <span class="name">筛选</span>
            <el-select v-model="select" style="width:110px;">
              <el-option label="昵称" value="nickName"></el-option>
              <el-option label="手机号" value="mobileNo"></el-option>
            </el-select>
          </div>
          <div class="item mr24">
            <el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
          </div>
          <div class="item mr24 time">
            <el-date-picker v-model="createTime" type="date" placeholder="加入时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="item mr24 time">
            <el-date-picker v-model="lastLoginTime" type="date" placeholder="最近一次登录时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="item mr24 time">
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img width="63" height="63" :src="scope.row.headPicUrl" alt="头像">
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称"> </el-table-column>
          <el-table-column prop="mobileNo" label="手机号"> </el-table-column>
          <el-table-column label="性别" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.sex=='0'">未知</span>
              <span v-if="scope.row.sex=='1'">男</span>
              <span v-if="scope.row.sex=='2'">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="birthday" label="生日"> </el-table-column>
          <el-table-column prop="pointVal" label="可用积分"> </el-table-column>
          <el-table-column prop="createTime" label="加入时间"> </el-table-column>
          <el-table-column prop="lastLoginTime" label="最近一次登录时间"> </el-table-column>
        </el-table>
        <div class="block-page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" :pager-count="11" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container.member .el-table td {
  padding: 8px 0 !important;
}
</style>

<script>
export default {
  data() {
    return {
      limit: 2,
      total: 3,
      keyword: "",
      select: "",
      createTime: "",
      lastLoginTime: "",
      tableData: [
        {
          headPicUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          nickName: "莹儿",
          mobileNo: "15878956589",
          createTime: "2018-10-01 12:20",
          lastLoginTime: "2018-12-01 12:20",
          sex: "0",
          birthday: "2010-01-01",
          pointVal: "2330"
        },
        {
          headPicUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          nickName: "莹儿",
          mobileNo: "15878956589",
          createTime: "2018-10-01 12:20",
          lastLoginTime: "2018-12-01 12:20",
          sex: "1",
          birthday: "2010-01-01",
          pointVal: "2330"
        },
        {
          headPicUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          nickName: "莹儿",
          mobileNo: "15878956589",
          createTime: "2018-10-01 12:20",
          lastLoginTime: "2018-12-01 12:20",
          sex: "2",
          birthday: "2010-01-01",
          pointVal: "2330"
        }
      ]
    };
  },
  methods: {
    //搜索
    search() {},
    //分页
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    }
  },
  mounted() {}
};
</script>
