<template>
<div>
    <div class="crumb">店员管理</div>
    <div class="backfff">
        <div class="container-head flex-B" style="padding: 9px 30px;">
            <span>店员列表</span>
            <el-button type="primary" size="medium" @click="addclerk">新增</el-button>
        </div>
        <div class="container" style="max-height: calc(100vh - 340px);">
            <div class="search flex-row align-items">
                 <div class="item">
                     <span class="name">名字</span>
                     <el-input v-model="assName" placeholder="店员名字"></el-input>
                 </div>
                 <div class="item">
                     <span class="name">手机号码</span>
                     <el-input v-model="assMobile" placeholder="手机号码"></el-input>
                 </div>
                 <div class="item">
                     <span class="name">是否启用</span>
                     <el-select v-model="assStatus" style="width:130px;" placeholder="请选择">
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                     </el-select>
                 </div>
                 <div class="item">
                   <el-button type="primary" icon="el-icon-search" @click="searchclerk">搜索</el-button>
                 </div>   
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column  type="index" label="编号"  width="100"></el-table-column>
                <el-table-column prop="assName" label="姓名"> </el-table-column>
                <el-table-column prop="assMobile" label="手机号"> </el-table-column>
                <el-table-column  label="状态"> 
                     <template slot-scope="scope">
                        <el-tag size="mini" type="success" plain  v-if="scope.row.assStatus=='0'">启用</el-tag>
                        <el-tag size="mini" type="info" plain v-if="scope.row.assStatus=='1'">停用</el-tag>
                     </template>   
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button  size="mini" :type="scope.row.assStatus=='0'?'danger':'success'"  @click="handleStatus(scope.row)">{{scope.row.assStatus=='0'?'停用':'启用'}}</el-button>
                        <el-button  size="mini" type="warning"  @click="handleEdit(scope.row)">编辑</el-button> 
                        <el-button  size="mini"   @click="handleDelete(scope)" v-if="scope.row.assStatus=='1'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block-page">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" :pager-count="11" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>   
    </div>
    <el-dialog :title="title" :visible.sync="issueVb" width="700px" :close-on-click-modal="false" :show-close="false" class="pl100 ">
        <div class="flex-row align-items mb20">
            <span class="wid80">店员名称</span>
            <el-input  placeholder="请输入店员名称" v-model="Name" class="wid360"></el-input>
        </div>
        <div class="flex-row align-items mb20">
            <span class="wid80">手机号码</span>
            <el-input  placeholder="请输入店员号码" v-model="Mobile" class="wid360"></el-input>
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
        return {
            page:0,
            limit: 2,
            total: 3,
           title:"",
           issueVb:false,
           assId:"",
           Name:"",
           Mobile:"",
           assName:"",
           assMobile:"",
           assStatus:"",
           tableData:[
               {
                  assName:"张三",
                  assMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  assStatus:"1"
               },
               {
                  assName:"李四",
                  assMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  assStatus:"0"
               }
           ]
        }
    },
    created() {
       
    },
    methods: {
       //新增店员
       addclerk(){
           this.issueVb=true;
           this.title="新增店员";
           this.Name="";
           this.Mobile="";
           this.assId="";
       },
       //搜索店员
       searchclerk(){

       },
       //编辑
       handleEdit(val){
           this.issueVb=true;
           this.title="修改店员信息";
           this.assId=val.id;
           this.Name=val.assName;
           this.Mobile=val.assMobile;
       },
       //删除
       handleDelete(scope){
            this.$confirm('确定删除该店员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.$axios.interface.sysUserDel,{'assId':scope.row.id}).then(res=>{
                if(res.data.msg==='ok'){
                    this.tableData.splice(scope.$index, 1)
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
        this.limit = val;
        },
        handleCurrentChange(val) {
        this.page = val;
        }
    },
     mounted(){

    }
}
</script>
