<template>
  <div>
    <div class="crumb">门店信息</div>
    <div class="backfff">
      <div class="container-head">门店信息</div>
      <div class="container">
        <el-form ref="form" :model="form" :rules="rules" label-width="86px">
          <el-form-item label="门店名称">
            <el-input v-model="form.companyName" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="门店地址">
            <el-input v-model="form.addressDtl" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.mobile" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.compLabel" placeholder="请输入门店标签，多个逗号隔开"></el-input>
          </el-form-item>
          <el-form-item label="门店logo">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess">
              <img v-if="form.compPicUrl" :src="form.compPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="门店简介">
            <el-input type="textarea" v-model="form.compRemarks" placeholder="请输入门店简介"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess1">
              <img v-if="form.idCardPicUrl" :src="form.idCardPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess2">
              <img v-if="form.businessLicensePicUrl" :src="form.businessLicensePicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
      form: {
        companyName: "",
        addressDtl: "",
        compLabel: "",
        mobile: "",
        compRemarks: "",
        compPicUrl: "",
        idCardPicUrl: "",
        businessLicensePicUrl: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        addressDtl: [
          { required: true, message: "请输入门店地址", trigger: "blur" }
        ],
        compLabel: [
          { required: true, message: "请输入门店标签", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入门店联系号码", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {},
    handleAvatarSuccess(res, file) {
      this.compPicUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess1(res, file) {
      this.idCardPicUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.businessLicensePicUrl = URL.createObjectURL(file.raw);
    }
  },
  mounted() {}
};
</script>
