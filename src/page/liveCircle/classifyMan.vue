<template>
  <div>
    <div class="crumb">分类管理</div>
    <div class="backfff  mb20">
      <div class="container-head flex-B" style="padding: 9px 30px;">
        <span>分类列表 </span>
        <el-button type="primary" size="medium" @click="addAll">添加分类</el-button>
      </div>
      <div class="container">
        <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
          <table style="width: 100%;" class="el-table__header" v-if="tableData.length" cellspacing="0" cellpadding="0">
            <thead class="has-gutter">
              <tr>
                <td style="width: 60px">编号</td>
                <td style="width: 120px">分类名称</td>
                <td style="width: 250px">商品数量</td>
                <td style="width: 150px">创建时间</td>
                <td style="width: 200px">操作</td>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in tableData">
                <tr :key="item.id" class="el-table__row">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.className }}</td>
                  <td><span class="mr20">{{ item.goodsNum }}</span>
                    <el-button plain size="mini" type="primary" class="ml10" @click="add(item)">添加子分类</el-button>
                  </td>
                  <td>{{ item.goodsNum }}</td>
                  <td>
                    <el-button size="mini" @click="editAllbut(item)">修改</el-button>
                    <el-button plain size="mini" type="warning" @click="handleEdit(scope.row)">隐藏</el-button>
                    <el-button size="mini" type="info" @click="deleteClass(item)">删除</el-button>
                  </td>
                </tr>
                <template v-if="item.children && item.children.length">
                  <tr v-for="(second,index) in item.children " :key="index.id">
                    <td></td>
                    <td>{{ second.className }}</td>
                    <td>{{ second.goodsNum }}</td>
                    <td>{{ second.goodsNum }}</td>
                    <td>
                      <el-button size="mini" @click="editbut(second)">修改</el-button>
                      <el-button plain size="mini" type="warning" @click="handleEdit(second)">隐藏</el-button>
                      <el-button size="mini" type="info" @click="deleteClass(second)">删除</el-button>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
          
        </div>
        <div class="block-page">
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="total">
            </el-pagination>
          </div>
      </div>
    </div>

    <el-dialog :title="this.zititle" :visible.sync="issueVb" width="500px" :close-on-click-modal="false" :show-close="false">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="text-align: right;">上级分类名称</div>
        </el-col>
        <el-col :span="18">
          {{parentClassName}}
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-purple text-r">子分类名称</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入子分类名称" v-model="className"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="text-r">上传图片</div>
        </el-col>
        <el-col :span="18">
          <el-upload action="" list-type="picture-card" :limit="1" :file-list="imgfileList" :http-request="uploadImg" :on-remove="onehandleRemove">
            <i class="el-icon-plus"></i> </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="issueVb = false">取 消</el-button>
        <el-button type="primary" @click="issueVb = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="this.alltitle" :visible.sync="addAllVb" width="500px" :close-on-click-modal="false" :show-close="false">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-purple text-r">上级分类名称</div>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="输入上级分类名称" v-model="className"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAllVb = false">取 消</el-button>
        <el-button type="primary" @click="addAllVb = false">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      issueVb: false,
      fileimg: {},
      imgfileList: [],
      dialogVisible1: false,
      addAllVb: false,
      dialogImageUrl: "",
      className: "",
      announcement: "",
      parentClassName: "",
      alltitle: "",
      zititle: "",
      total: 0,
      page: 1,
      tableData: [
        {
          id: "1",
          className: "aa",
          goodsNum: 11,
          color: "cc",
          children: [
            {
              className: "bbb",
              goodsNum: 11,
              color: "cc"
            },
            {
              className: "cccc",
              goodsNum: 11,
              color: "cc"
            }
          ]
        },
        {
          id: "2",
          className: "aa",
          goodsNum: 11,
          color: "cc",
          children: []
        },
        {
          id: "3",
          className: "aa",
          goodsNum: 11,
          color: "cc",
          children: [
            {
              className: "bbb",
              goodsNum: 11,
              color: "cc"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 添加子分类
    add(e) {
      this.zititle = "添加子分类";
      this.parentClassName = e.className;
      this.issueVb = true;
    },
    // 添加一级分类
    addAll() {
      this.addAllVb = true;
      this.alltitle = "添加分类";
    },
    // 编辑一级分类
    editAllbut(e) {
      this.addAllVb = true;
      this.alltitle = "修改分类";
    },
    // 编辑子分类
    editbut(e) {
      this.zititle = "修改子分类";
      this.parentClassName = e.className;
      this.issueVb = true;
    },
    // 改变页数
    handleCurrentChange(val) {
      this.page = val;
    },
    // 删除分类
    deleteClass(e) {
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
    }
  }
};
</script>
<style scoped lang="less">
thead {
  font-weight: bold;
}
.el-table__row:hover {
  background-color: #ebeef5;
}
td {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.grid-purple {
  line-height: 40px;
}
.el-row {
  margin-bottom: 30px;
}
</style>