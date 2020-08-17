<template>
  <div>
    <div class="crumb">商品管理</div>
    <div class="backfff  mb20">
      <div class="container-head flex-B" style="padding: 9px 30px;">
        <span>商品列表</span>
        <span>
          <el-button size="medium" @click="add">批量操作</el-button>
          <el-button type="primary" size="medium" @click="add">添加商品</el-button>
        </span>
      </div>
      <div class="container member" style="max-height: 570px;">
        <div class="search flexWarp ">
          <div class="item mr24">
            <el-input v-model="goodsName" prefix-icon="el-icon-search" placeholder="请输入商品名称"></el-input>
          </div>
          <div class="item mr24">
            分类
          </div>  
          <div class="item mr24">
            <el-select v-model="goodsSubClassId" placeholder="请选择分类">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item mr24">
            状态
          </div>
          <div class="item mr24">
            <el-select v-model="goodsStatus" placeholder="请选择状态">
              <el-option v-for="item in statusValue" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item mr24 time">
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"> </el-table-column>
          <el-table-column prop="mainPic" label="商品图片">
            <template slot-scope="scope">
              <img width="63" height="63" :src="scope.row.mainPic" alt="头像">
            </template>
          </el-table-column>
          <el-table-column prop="skuType" label="型号">
            <template slot-scope="scope">
              <a class="a-style" @click="skuTypeBut(scope.row)">共{{scope.row.companyName.length}}个型号</a>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格">
            <template slot-scope="scope">
              <span>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stockNum" label="库存 "> </el-table-column>
          <el-table-column prop="saleNum" label="销量"> </el-table-column>
          <el-table-column prop="className" label="分类"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag size="mini" type="danger" plain v-if="scope.row.goodsStatus=='0'">未上架</el-tag>
              <el-tag size="mini" type="success" plain v-if="scope.row.goodsStatus=='1'">已上架</el-tag>
              <el-tag size="mini" type="info" plain v-if="scope.row.goodsStatus=='2'">已售罄</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="editCommodity(scope.row)" plain>编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-if="scope.row.compStatus=='-1'" plain>下架</el-button>
              <el-button size="mini" type="success" @click="handleDelete(scope.row)" v-if="scope.row.compStatus=='0'" plain>上架</el-button>
              <el-button size="mini" style="color:#F56C6C;" type="text" @click="deleteCommodity(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block-page">
          <el-pagination @current-change="handleCurrentChange" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="addshow?'添加商品':'修改商品'" :visible.sync="issueVb" width="900px" :close-on-click-modal="false" :show-close="false" class="commodity">
      <el-row>
        <el-col :span="2">
          <div class="grid-purple"><span class="red">*</span>商品标题</div>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="输入商品标题" v-model="commodity.goodsName"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div><span class="red">*</span>商品图片</div>
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
          <div class="grid-purple"><span class="red">*</span>商品分类</div>
        </el-col>
        <el-col :span="20">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">商品价格</div>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="输入商品价格" v-model="commodity.goodsName"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">商品库存</div>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="输入商品库存" v-model="commodity.goodsName"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">商品型号</div>
        </el-col>
        <el-col :span="20">
          <div class="typebg">
            <template v-for="(one,index) in model">
              <div :key="index">
                <div class="typebg-head flex-B">
                  <span>
                    <el-select v-model="one.modelKey" clearable placeholder="请选择" class="mr20" @change="modelKeyChange(one,index)">
                      <el-option v-for="items in modelValueall" :key="items.value" :label="items.label" :value="items.value">
                      </el-option>
                    </el-select>
                    <el-checkbox v-model="checked">添加图片</el-checkbox>
                  </span>
                  <span class="red" v-if="index>0" @click="deleteType(index)">刪除</span>
                </div>
                <div class="typebg-content flex-row">
                  <template v-for="item in one.modelValue">
                    <div class="bianqian" :key="item">{{item}}</div>
                  </template>

                </div>
              </div>
            </template>
            <div class="typebg-head">
              <el-button plain size="mini" type="primary" @click="addChildAattributes()" v-if="this.model.length<3">+ 添加子属性</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-purple">价格库存</div>
        </el-col>
        <el-col :span="20">
          <el-table :data="editEodel" :span-method="objectSpanMethod" style="width: 100%" border class="editEodel">
            <el-table-column type="index" label="编号" width="60"></el-table-column>
            <el-table-column prop="modelValue1" :label='this.modelKey1'> </el-table-column>
            <el-table-column prop="modelValue2" :label="this.modelKey2"> </el-table-column>
            <el-table-column prop="modelValue3" :label="this.modelKey3"> </el-table-column>
            <el-table-column prop="useTime" label="价格">
              <template slot-scope="scope">
                <el-input placeholder="价格" v-model="scope.row.goodsPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="useTime" label="库存">
              <template slot-scope="scope">
                <el-input placeholder="库存" v-model="scope.row.stockNum"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="useTime" label="商品编号">
              <template slot-scope="scope">
                <el-input placeholder="编号" v-model="scope.row.stockNum"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div><span class="red">*</span>商品描述</div>
        </el-col>
        <el-col :span="20">
          <el-upload action="" list-type="picture-card" :limit="4" :file-list="imgfileList" :http-request="uploadImg" :on-remove="onehandleRemove">
            <i class="el-icon-plus"></i> </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div>建议尺寸：800*800</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="issueVb = false">取 消</el-button>
        <el-button @click="issueVb = false">存入仓库</el-button>
        <el-button type="primary" @click="offering()">上架出售</el-button>
      </span>

      <el-dialog width="400px" title="选择型号" :visible.sync="innerVisible" append-to-body class="man">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <div style="border-bottom: 1px solid #EEEEEE;"></div>
        <el-tag size="mini" color="#fff" class="mt20" @click="addmodel()">+ 添加型号</el-tag>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addinner">确 定</el-button>
        </span>

        <el-dialog width="300px" title="添加型号" :visible.sync="towVisible" append-to-body>
          <el-input placeholder="输入型号" v-model="announcement"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="towinner">确 定</el-button>
          </span>
        </el-dialog>
      </el-dialog>

    </el-dialog>

    <el-dialog width="600px" title="型号" :visible.sync="skuTypeVisible" append-to-body>
      <el-table :data="skuTypeCount" style="width: 100%" border ref="multipleTable">
        <el-table-column type="index" label="编号" width="70"></el-table-column>
        <el-table-column prop="linkMobile" label="型号">
        </el-table-column>
        <el-table-column prop="companyName" label="价格"></el-table-column>
        <el-table-column prop="companyName" label="库存"></el-table-column>
        <el-table-column prop="companyName" label="销量"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="skuTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addinner">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    return {
      modelValueData: [],
      innerVisible: false,
      skuTypeVisible: false,
      keyword: "",
      issueVb: false,
      announcement: "",
      addshow: true,
      fileimg: {},
      goodsName: "",
      goodsSubClassId: "",
      skuTypeCount: [],
      value: "",
      goodsStatus: "",
      imgfileList: [],
      statusValue: [
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
          label: "已售完"
        }
      ],
      commodity: {
        goodsName: "",
        price: "",
        priceLow: "",
        goodsName: "",
        stockNum: ""
      },
      modelindex: 0,
      dialogImageUrl: "",
      total: 0,
      page: 1,
      dialogVisible1: false,
      towVisible: false,
      checked: false,
      editEodel: [],
      spanArr: [],
      modelKey1: "",
      modelKey2: "",
      modelKey3: "",
      pos: "",
      checkAll: false,
      cities: [],
      checkedCities: [],
      isIndeterminate: true,
      model: [
        {
          modelKey: "",
          modelValue: []
        }
      ],
      modelValueall: [
        {
          value: "尺寸",
          label: "尺寸"
        },
        {
          value: "顔色",
          label: "顔色"
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
          label: "已结束"
        }
      ],
      tableData: [
        {
          mainPic:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          linkName: '宇哥的草莓',
          companyName: ["米兰婚纱", "米兰婚纱", "米兰婚纱"],
          goodsName: "宇哥的草莓",
          goodsStatus: "1",
          createTime: "2019-03-21 9:34:74",
          price: 100,
          stockNum: 100,
          saleNum: 1200,
          className: '食品-水果生鲜',
          compStatus: -1
        },
        {
          mainPic:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          linkName: "张三",
          companyName: "米兰婚纱",
          goodsName: "宇哥熏鸡",
          linkMobile: "15747898564",
          goodsStatus: "0",
          createTime: "2019-03-21 9:34:74",
          price: 69,
          stockNum: 200,
          saleNum: 120,
          className: '食品-熟食',
          compStatus: 0
        },
        {
          mainPic:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          linkName: "张三",
          companyName: "米兰婚纱",
          goodsName: "宇哥的绵羊",
          linkMobile: "15747898564",
          goodsStatus: "2",
          createTime: "2019-03-21 9:34:74",
          price: 120,
          stockNum: 40,
          saleNum: 10223,
          className: '食品-活禽',
          compStatus: 0
        },
        {
          mainPic:
            "https://wx.qlogo.cn/mmopen/vi_32/3xZTOcrzPsEI45wJ5pWZfteHCgP8tYOdRJFhtNDicJFtrDhxJME2jic8accbJCDAM65QHeMP0yRGfHqxsiasu7Wcw/132",
          linkName: "张三",
          companyName: "米兰婚纱",
          goodsName: "宇哥小风扇",
          linkMobile: "15747898564",
          goodsStatus: "2",
          createTime: "2019-03-21 9:34:74",
          price: 419,
          stockNum: 1203,
          saleNum: 42013,
          className: '食品-活禽',
          compStatus: 0
        }
      ]
    };
  },
  methods: {
    search() {},
    // 确定添加型号
    addinner() {
      this.innerVisible = false;
      const data = this.model[this.modelindex];
      data.modelValue = this.checkedCities;
      this.editEodel = [];
      this.addConfirm();
    },
    // 删除商品型号
    deleteType(e) {
      this.model.splice(e, 1);
      this.editEodel = [];
      this.addConfirm();
    },
    // 确定添加型号弹框
    addmodel() {
      this.towVisible = true;
      this.announcement = "";
    },
    // 添加商品弹框
    add() {
      this.issueVb = true;
      this.addshow = true;
      this.model = [{ modelKey: "", modelValue: [] }];
      this.editEodel = [];
    },
    // 确定添加型号
    towinner() {
      this.cities.push(this.announcement);
      this.towVisible = false;
    },
    // 添加子属性
    addChildAattributes() {
      this.model.push({
        modelKey: "",
        modelValue: []
      });
    },
    // 点击型号弹窗
    skuTypeBut(e) {
      this.skuTypeVisible = true;
    },
    // 型号库存
    addConfirm() {
      if (this.model.length > 0) {
        if (this.model.length == 1) {
          for (let i = 0; i < this.model[0].modelValue.length; i++) {
            this.editEodel.push({
              modelValue1: this.model[0].modelValue[i]
            });
          }
        }
        if (this.model.length == 2) {
          for (let i = 0; i < this.model[0].modelValue.length; i++) {
            for (let j = 0; j < this.model[1].modelValue.length; j++) {
              this.editEodel.push({
                modelValue1: this.model[0].modelValue[i],
                modelValue2: this.model[1].modelValue[j]
              });
            }
          }
        }
        if (this.model.length == 3) {
          for (let i = 0; i < this.model[0].modelValue.length; i++) {
            for (let j = 0; j < this.model[1].modelValue.length; j++) {
              for (let x = 0; x < this.model[2].modelValue.length; x++) {
                this.editEodel.push({
                  modelValue1: this.model[0].modelValue[i],
                  modelValue2: this.model[1].modelValue[j],
                  modelValue3: this.model[2].modelValue[x]
                });
              }
            }
          }
        }
      }
    },
    // 删除商品
    deleteCommodity(e) {
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
    // 选项类型下拉框
    modelKeyChange(e, i) {
      console.log(e);
      this.checkedCities = [];
      if (i == 0) {
        this.modelKey1 = e.modelKey;
      } else if (i == 1) {
        this.modelKey2 = e.modelKey;
      } else {
        this.modelKey3 = e.modelKey;
      }
      this.modelindex = i;
      this.innerVisible = true;
      this.cities = ["红色", "蓝色", "黄色", 14, 15, 16];
      this.editEodel = [];
      this.addConfirm();
    },
    // 编辑商品
    editCommodity(e) {
      this.issueVb = true;
      this.addshow = false;
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
    // 改变页数
    handleCurrentChange(val) {
      this.page = val;
    },
    // 复选框改变的值
    handleCheckedCitiesChange(e) {
      this.checkedCities = e;
    },
    // 上架出售
    offering() {},
    // 活动图片删除事件
    onehandleRemove(file) {
      this.imgfileList = [];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {}
  }
};
</script>
<style scoped lang="less">
.a-style {
  color: #409eff;
  text-decoration: underline;
}
.grid-purple {
  line-height: 40px;
}
.el-row {
  margin-bottom: 30px;
}
.el-dialog__body {
  height: 500px;
  overflow: auto;
}
.red {
  color: red;
}
.typebg {
  border: 1px solid #dddddd;
}
.typebg-head {
  background: #fafafa;
  padding: 10px;
}
.typebg-content {
  padding: 20px 0px;
}
.bianqian {
  padding: 5px 10px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  margin-left: 10px;
}
.el-dialog__body .el-checkbox {
  width: 60px;
  margin-bottom: 10px;
}
</style>
