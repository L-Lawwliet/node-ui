<template>
  <div>
      <div class="crumb">招募管理</div>
      <div class="backfff  mb20">
        <div class="container-head"><span>招募信息</span></div>
        <div class="container">
              <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="招募电话">
                    <el-input v-model="form.linkMobile" placeholder="请输入招募电话"></el-input>
                </el-form-item>
                <el-form-item label="招募地址">
                    <el-input v-model="form.address" placeholder="请输入招募地址"></el-input>
                </el-form-item>
                <el-form-item label="招募简介">
                    <el-input v-model="form.recruitRemarks" placeholder="请输入招募简介"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>  
        </div>
      </div>  
      <div class="backfff">
        <div class="container-head"><span>招募列表</span></div>
        <div class="container">
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                <el-table-column prop="linkName" label="名称"> </el-table-column>
                <el-table-column prop="linkMobile" label="手机号"> </el-table-column>
                <el-table-column prop="shopName" label="门店名"> </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
                <el-table-column prop="remarks" label="留言"> </el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column  label="状态" width="90" align="center"> 
                     <template slot-scope="scope">
                       <el-tag size="mini" type="warning" plain  v-if="scope.row.recordStatus=='0'">待回访</el-tag>
                       <el-tag size="mini" type="info" plain v-if="scope.row.recordStatus=='1'">已回访</el-tag>
                    </template>   
                </el-table-column>
                <el-table-column  label="操作" width="90" align="center">
                    <template slot-scope="scope">
                        <el-button  size="mini" type="primary"   @click="handleread(scope.row)"  v-if="scope.row.recordStatus=='0'">回访</el-button>
                    </template>
                </el-table-column>
            </el-table>  
            <div class="block-page">
                <el-pagination
                     @size-change="handleSizeChange"  @current-change="handleCurrentChange"  :page-size="limit" :pager-count="11" layout="prev, pager, next"  :total="total">
                </el-pagination>
            </div>  
        </div>
      </div>
      <el-dialog title="回访填写" :visible.sync="issueVb" width="600px" :close-on-click-modal="false" :show-close="false">
        <div class="flex-row">
            <span style="width: 80px;">回访备注</span>
            <el-input type="textarea" :rows="6" placeholder="输入回访结果" v-model="suggest"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="issueVb = false">取 消</el-button>
            <el-button type="primary" @click="issueVb = false">确 定</el-button>
        </span>

        </el-dialog>
  </div>
</template>
<script>
export default {
  name: "recruitmentMan",
  data() {
    return {
      page:0,
      limit:2,
      total:4,
      issueVb:false,
      recruitRecordId:"",
      suggest:"",
      form:{
          linkMobile:"",
          address:"",
          recruitRemarks:"",
      },
      rules:{
          linkMobile: [
          {required: true,message: '请输入招募电话',trigger: "blur"}
          ],
         address: [
          {required: true,message: '请输入招募地址',trigger: "blur"}
          ],
          recruitRemarks: [
          {required: true,message: '请输入招募简介',trigger: "blur"}
          ],
      },
      tableData: [
        {
           id:"212",
           linkName:"张三",
           linkMobile:"15784565864",
           shopName:"一点点",
           address:"深圳市罗湖区水贝工业区IBC商场",
           remarks:"想加入你们",
           recordStatus:"0",
           createTime:"2019-03-21 9:34:74",
         },
         {
           id:"214",
           linkName:"张三",
           linkMobile:"15784565864",
           shopName:"一点点",
           address:"深圳市罗湖区水贝工业区IBC商场",
           remarks:"想加入你们",
           recordStatus:"0",
           createTime:"2019-03-21 9:34:74",
         },
         {
           id:"232",
           linkName:"张三",
           linkMobile:"15784565864",
           shopName:"周黑鸭",
           address:"深圳市罗湖区水贝工业区IBC商场",
           remarks:"想加入你们",
           recordStatus:"1",
           createTime:"2019-03-21 9:34:74",
         },
         {
           id:"212",
           linkName:"张三",
           linkMobile:"15784565864",
           shopName:"周黑鸭",
           address:"深圳市罗湖区水贝工业区IBC商场",
           remarks:"想加入你们",
           recordStatus:"1",
           createTime:"2019-03-21 9:34:74",
         }

      ]
    };
  },
   created() {
       
    },
    methods: {
        //保存
        onSubmit(){

        },
        //回访
        handleread(val){
          this.issueVb=true;
        },
        //分页
        handleSizeChange(val) {
         this.limit=val
     
        },
        handleCurrentChange(val) {
        this.page=val
        
        },
    },
    mounted(){

    }
};
</script>
<style scoped lang="less">
.container-search {
  padding: 30px 0;
}
</style>