<template>
  <div>
    <p>Hello</p>
    <lfn-hello message="my component library"></lfn-hello>
    <p>choose-map</p>
    <div style="margin: 20px 0;width: 800px;">
      <el-form ref="storeForm" :model="storeForm" label-width="100px">
        <el-form-item label="地址坐标：" prop="coordinate">
          <el-input v-model="storeForm.coordinate" :readonly="true" style="width: 300px;" placeholder="请选择地址坐标" @focus="show=true"></el-input>
          {{ storeForm.shopMapAddress }}
        </el-form-item>
      </el-form>
      <lfn-choose-map :title="'地址坐标'" :show="show" :location="storeForm.location" :longitude="storeForm.longitude" :latitude="storeForm.latitude" @closeMap="closeMap" @confirmMap="confirmMap"></lfn-choose-map>
    </div>
    <el-button @click="query">query</el-button>
  </div>
</template>
<script>
import Http from '../../src/utils/http';

const http = new Http();
export default {
  name: 'Hello',
  data() {
    return {
      show: false,
      storeForm: {
        coordinate: '',
        longitude: '114.127',
        latitude: '22.573198',
        location: '贝丽北路水贝工业区四栋(佳峰集团大厦)4-5层',
        shopMapAddress: ''
      },
    };
  },
  created() {
  },
  methods: {
    query() {
      http.get('/select');
    },
    // 关闭地图
    closeMap() {
      this.show = false;
    },
    // 确定选择地址
    confirmMap(selectedAddress) {
      this.storeForm.shopMapAddress = selectedAddress.address;
      this.storeForm.coordinate = selectedAddress.location;
      // this.userInfo.weiDu = selectedAddress.location.split(",")[1];
    },
  }
};
</script>
<style>

</style>
