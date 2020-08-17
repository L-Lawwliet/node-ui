<template>
  <div>
    <div class="crumb">活动管理</div>
    <div class="backfff mb20">
      <div class="container-head flex-B" style="padding: 9px 30px;">
        <span>套餐活动列表</span>
        <el-button type="primary" size="medium" @click="addActivity">添加活动</el-button>
      </div>
      <div class="container member" style="max-height: 570px;">
        <div class="search flexWarp ">
          <div class="item mr24">
            <span class="name">筛选</span>
          </div>
          <div class="item mr24">
            <el-select v-model="actStatus" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item mr24">
            <el-input v-model="actName" prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
          </div>
          <div class="item mr24 time">
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <el-table-column prop="actName" label="活动名称"> </el-table-column>
          <el-table-column prop="goodsName" label="关联商品">
          </el-table-column>
          <el-table-column prop="companyName" label="关联门店">
            <template slot-scope="scope">
              <a class="a-style">{{scope.row.companyName}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="oldPrice" label="原始价格">
            <template slot-scope="scope">
              <span>{{scope.row.oldPrice/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nowPrice" label="活动价格 ">
            <template slot-scope="scope">
              <span>{{scope.row.nowPrice/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="剩余库存"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag size="mini" type="danger" plain v-if="scope.row.actStatus=='0'">未上架</el-tag>
              <el-tag size="mini" type="success" plain v-if="scope.row.actStatus=='1'">已上架</el-tag>
              <el-tag size="mini" type="info" plain v-if="scope.row.actStatus=='2'">已结束</el-tag>
              <el-tag size="mini" type="info" plain v-if="scope.row.actStatus=='-1'">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"> </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="160"> </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" @click="editActivity(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-if="scope.row.compStatus=='0'">上架</el-button>
              <el-button size="mini" type="success" @click="handleDelete(scope.row)" v-if="scope.row.compStatus=='1'">下架</el-button>
              <el-button size="mini" type="info" @click="deleteActivity(scope.row)">删除</el-button>
              <el-button plain size="mini" type="primary" @click="handleread(scope.row)">设置热门</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block-page">
          <el-pagination @current-change="handleCurrentChange" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="addshow?'添加活动':'编辑活动'" :visible.sync="issueVb" width="930px" :close-on-click-modal="false" :show-close="false" class="commodity">
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">商品价格</div>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="输入商品价格" v-model="announcement"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">商品库存</div>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="输入商品库存" v-model="announcement"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div>上传图片</div>
        </el-col>
        <el-col :span="20">
          <el-upload action="" list-type="picture-card" :limit="1" :file-list="imgfileList" :http-request="uploadImg" :on-remove="onehandleRemove">
            <i class="el-icon-plus"></i> </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div>建议尺寸：800*800</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div>发放优惠券</div>
        </el-col>
        <el-col :span="17">
          <el-table :data="couponData" style="width: 100%" border>
            <el-table-column type="index" label="编号" width="70"></el-table-column>
            <el-table-column prop="linkName" label="优惠券">
              <template slot-scope="scope">
                <el-tag size="mini" plain>{{scope.row.linkName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="linkMobile" label="所属门店">
            </el-table-column>
            <el-table-column prop="companyName" label="原价"></el-table-column>
            <el-table-column prop="companyName" label="活动价格 "></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleread(scope.row)">修改</el-button>
                <el-button size="mini" type="info" @click="deleteCoupon(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" class="ml10" @click="addDiscountCoupon">添加优惠券</el-button>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="issueVb = false">取 消</el-button>
        <el-button @click="issueVb = false" type="primary">确定</el-button>
      </span>

      <el-dialog width="600px" title="选择优惠券" :visible.sync="innerVisible" append-to-body>
        <el-table :data="couponallData" style="width: 100%" border @ ref="multipleTable">

          <el-table-column type="index" label="编号" width="70"></el-table-column>
          <el-table-column prop="linkName" label="优惠券">
            <template slot-scope="scope">
              <el-tag size="mini" plain>{{scope.row.linkName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="linkMobile" label="所属门店">
          </el-table-column>
          <el-table-column prop="companyName" label="原价"></el-table-column>
          <el-table-column prop="companyName" label="活动价格 "></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addinner">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      actName: "",
      actStatus: "",
      announcement: "",
      issueVb: false,
      fileimg: {},
      imgfileList: [],
      dialogImageUrl: "",
      dialogVisible1: false,
      innerVisible: false,
      couponData: [],
      multipleSelection: [],
      total: 0,
      page: 1,
      addshow: true,
      couponallData: [
        {
          actName: "张1",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          createTime: "2019-03-21 9:34:74"
        },
        {
          actName: "张2",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          createTime: "2019-03-21 9:34:74"
        },
        {
          actName: "张3",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          createTime: "2019-03-21 9:34:74"
        }
      ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "未上架"
        },
        {
          value: "1",
          label: "已上架"
        },
        {
          value: "2",
          label: "已售罄"
        }
      ],
      tableData: [
        {
          linkName: "张三",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          compStatus: "-1",
          createTime: "2019-03-21 9:34:74"
        },
        {
          linkName: "张三",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          compStatus: "0",
          createTime: "2019-03-21 9:34:74"
        },
        {
          linkName: "张三",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          compStatus: "2",
          createTime: "2019-03-21 9:34:74"
        },
        {
          linkName: "张三",
          companyName: "米兰婚纱",
          linkMobile: "15747898564",
          compStatus: "0",
          createTime: "2019-03-21 9:34:74"
        }
      ]
    };
  },
  methods: {
    search() {},
    // 添加活動弹窗
    addActivity() {
      this.issueVb = true;
      this.addshow = true;
    },
    // 编辑活動弹窗
    editActivity(e) {
      this.issueVb = true;
      this.addshow = false;
    },
    // 删除活动
    deleteActivity(e) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加优惠券弹窗
    addDiscountCoupon() {
      this.multipleSelection = [];
      this.innerVisible = true;
    },
    // 改变页数
    handleCurrentChange(val) {
      this.page = val;
    },
    uploadImg(file) {
      var _this = this;
      this.fileimg = file.file.name;
      var params =
        "fileName=" +
        file.file.uid +
        this.fileimg +
        "&businessParam=" +
        this.businessParam +
        "&type=" +
        4;
      //   axios.post("oss/getToken.do", params).then(function(data) {
      //     var tokenKet = new FormData();
      //     tokenKet.append("file", file.file); //当前用户上传的文件
      //     tokenKet.append("key", data.data.keyExtend);
      //     tokenKet.append("token", data.data.token);
      //     axios
      //       .post("https://up-z2.qbox.me", tokenKet, {
      //         headers: {
      //           "Content-Type": "multipart/form-data"
      //         }
      //       })
      //       .then(function(res) {
      //         _this.imgfileList1 = [
      //           { url: "https://img.zberp.net/" + res.data.key }
      //         ]; // 活动图
      //       });
      //   });
    },
    // 活动图片删除事件
    onehandleRemove(file) {
      this.imgfileList = [];
    },
    // 删除优惠券
    deleteCoupon(e) {
      this.couponData.splice(e, 1);
    },
    // 选择复选框
    handleSelectionChange(e) {
      this.multipleSelection = e;
    },
    // 确定添加优惠券
    addinner() {
      this.multipleSelection.forEach(x => {
        this.couponData.push(x);
      });
      this.innerVisible = false;
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>
<style scoped lang="less">
.a-style {
  color: #409eff;
  text-decoration: underline;
}
.el-row {
  margin-bottom: 30px;
}
.grid-purple {
  line-height: 40px;
}
</style>