<template>
  <div>
    <div class="crumb">生活圈管理</div>
    <div class="backfff mb20">
      <div class="container-head">
        <span>基本信息</span>
      </div>
      <div class="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="86px">
          <el-form-item label="名称">
            <el-input v-model="form.lcName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.lcLabel" placeholder="请输入标签"></el-input>
          </el-form-item>
          <el-form-item label="门店logo">
            <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :limit="1" :file-list="imgfileList" :http-request="uploadImg" :on-remove="onehandleRemove">
              <i class="el-icon-plus"></i> </el-upload>
            <el-dialog :visible.sync="dialogVisible1">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="门店简介">
            <el-input v-model="form.lcRemarks" placeholder="请输入门店简介"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgfileList: [],
      fileimg: {},
      dialogVisible1: false,
      dialogImageUrl: "",
      form: {
        lcName: "",
        lcLabel: "",
        address: "",
        lcPicUrl: "",
        lcRemarks: "",
        linkMobile: ""
      },
      rules: {
        lcName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入门店地址", trigger: "blur" }
        ],
        lcPicUrl: [
          { required: true, message: "请输入门店log", trigger: "blur" }
        ],
        lcRemarks: [
          { required: true, message: "请输入门店简介", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
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