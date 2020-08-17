<template>
<div>
    <div class="crumb">盟友设置</div>
    <div class="backfff  mb20">
        <div class="container-head flex-B" style="padding: 9px 30px;">
            <span>盟友列表 </span>
            <el-button type="primary" size="medium" @click="add">新增盟友</el-button>
        </div>
        <div class="container" style="max-height: 570px;">
             <div class="search flexWarp ">
                <div class="item mr24">
                     <span class="name">筛选</span>
                    <el-select v-model="select" style="width:110px;">
                        <el-option label="名称" value="linkName"></el-option>
                        <el-option label="手机号" value="mobile"></el-option>
                    </el-select>
                </div>
                <div class="item mr24">
                     <el-input prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容"></el-input>
                </div>
                <div class="item mr24 time">
                   <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </div>
             </div>    
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                <el-table-column prop="linkName" label="名称"> </el-table-column>
                <el-table-column prop="linkMobile" label="手机号"> </el-table-column>
                <el-table-column prop="companyName" label="门店"> </el-table-column>
                <el-table-column  label="状态"> 
                     <template slot-scope="scope">
                        <el-tag size="mini" type="danger" plain  v-if="scope.row.compStatus=='-1'">停用</el-tag>
                        <el-tag size="mini" type="success" plain  v-if="scope.row.compStatus=='0'">启用</el-tag>
                        <el-tag size="mini" type="info" plain v-if="scope.row.compStatus=='1'">审核中</el-tag>
                     </template>   
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column  label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button  size="mini" :type="scope.row.compStatus=='-1'?'success':'danger'"  @click="handleState(scope.row)">{{scope.row.compStatus=='-1'?'启动':'停用'}}</el-button>
                        <el-button  size="mini"  @click="handleDelete(scope)"  v-if="scope.row.compStatus=='-1'">删除</el-button>
                        <el-button size="mini"  type="info"  @click="handleEdit(scope.row)" v-if="scope.row.compStatus=='0'">设置权限</el-button> 
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
    <el-dialog title="新增盟友" :visible.sync="issueVb" width="700px" :close-on-click-modal="false" :show-close="false" class="pl100 ">
        <div class="flex-row align-items mb20">
            <span class="wid80">门店</span>
            <el-input  placeholder="请输入门店名称" v-model="companyName" class="wid360"></el-input>
        </div>
        <div class="flex-row align-items mb20">
            <span class="wid80">名称</span>
            <el-input  placeholder="请输入盟友名称" v-model="linkName" class="wid360"></el-input>
        </div>
        <div class="flex-row align-items mb20">
            <span class="wid80">手机号码</span>
            <el-input  placeholder="请输入盟友号码" v-model="linkMobile" class="wid360"></el-input>
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
    data(){
        return{
            issueVb:false,
            companyName:"",
            linkName:"",
            linkMobile:"",
            select:"",
            keyword:"",
            page:0,
            limit:2,
            total:4,
            tableData:[
                {
                  linkName:"张三",
                  companyName:"米兰婚纱",
                  linkMobile:"15747898564",
                  compStatus:"-1",
                  createTime:"2019-03-21 9:34:74",
                },
                {
                  linkName:"张三",
                  companyName:"米兰婚纱",
                  linkMobile:"15747898564",
                  compStatus:"0",
                  createTime:"2019-03-21 9:34:74",
                },
                {
                  linkName:"张三",
                  companyName:"米兰婚纱",
                  linkMobile:"15747898564",
                  compStatus:"-1",
                  createTime:"2019-03-21 9:34:74",
                },
                {
                  linkName:"张三",
                  companyName:"米兰婚纱",
                  linkMobile:"15747898564",
                  compStatus:"0",
                  createTime:"2019-03-21 9:34:74",
                },
            ]
        }
    },
    methods:{
      //新增
      add(){
         this.issueVb=true;
      },
      //搜索
      search(){

      },
       //删除
       handleDelete(scope){
            this.$confirm('确定删除该盟友?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.$axios.interface.sysUserDel,{'id':scope.row.id}).then(res=>{
                if(res.data.msg==='ok'){
                    this.userData.splice(scope.$index, 1)
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                }else{
                    this.$message.warning(res.data.msg)
                }
                }) 
            })
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
}
</script>
