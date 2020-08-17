<template>
<div>
    <div class="crumb">返利设置</div>
    <div class="backfff  mb20">
        <div class="container-head flex-B" style="padding: 9px 30px;">
            <span>返利设置</span>
            <el-button type="primary" size="medium" @click="add">新增返利</el-button>
        </div>
        <div class="container" style="max-height: 570px;">
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                <el-table-column label="返利比例"> 
                    <template slot-scope="scope">
                        <span  v-if="scope.row.rebateType=='0'">{{scope.row.rebateVal}}%</span>
                        <span  v-if="scope.row.rebateType=='1'">{{scope.row.rebateVal/100}}</span>
                     </template> 
                </el-table-column>
                <el-table-column prop="createUserName" label="名称"> </el-table-column>
                <el-table-column prop="createMobile" label="手机号"> </el-table-column>
                <el-table-column prop="receiveshop" label="接收门店"> </el-table-column>
                <el-table-column prop="totalAmount" label="总返利金额">
                    <template slot-scope="scope">
                        <span >{{scope.row.totalAmount/100}}</span>
                    </template> 
                </el-table-column>
                <el-table-column prop="createTime" label="未结算金额"> 
                     <template slot-scope="scope">
                        <span >{{scope.row.balanceAmount/100}}</span>
                    </template> 
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column  label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button plain size="mini" type="primary"    @click="handleread(scope.row)">明细</el-button>
                        <el-button plain size="mini"    @click="handleEdit(scope.row)">编辑</el-button> 
                        <el-button plain size="mini" type="danger"  v-if="scope.row.balanceAmount=='0'" @click="handleDelete(scope)">删除</el-button>
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
    <div class="backfff">      
        <div class="container-head"><span>我的返利</span></div>
        <div class="container" style=" max-height: 570px;">
            <el-table :data="RecordList" style="width: 100%" border>
                <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                <el-table-column label="返利比例"> 
                    <template slot-scope="scope">
                        <span  v-if="scope.row.rebateType=='0'">{{scope.row.rebateVal}}%</span>
                        <span  v-if="scope.row.rebateType=='1'">{{scope.row.rebateVal/100}}</span>
                     </template> 
                </el-table-column>
                <el-table-column prop="linkName" label="名称"> </el-table-column>
                <el-table-column prop="linkMobile" label="手机号"> </el-table-column>
                <el-table-column prop="givecompanyName" label="发放门店"> </el-table-column>
                <el-table-column prop="totalAmount" label="总返利金额">
                    <template slot-scope="scope">
                        <span >{{scope.row.totalAmount/100}}</span>
                    </template> 
                </el-table-column>
                <el-table-column  label="未结算金额"> 
                     <template slot-scope="scope">
                        <span >{{scope.row.balanceAmount/100}}</span>
                    </template> 
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column  label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button plain size="mini" type="primary" @click="handleread(scope.row)">查看</el-button>
                        <el-button  size="mini" type="danger"  @click="handlejiesuan(scope.row)">结算</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>   
    </div>
     <el-dialog title="新增返利" :visible.sync="issueVb1" width="600px" :close-on-click-modal="false" :show-close="false" class="pl100">
            <div class="flex-row align-items mb20">
                <span class="wid80">接收门店</span>
                <el-select :rows="6" v-model="rebateCompIdReceived"   placeholder="选择门店">
                    <el-option :label="item.companyName" :value="item.id" v-for="(item,index) in CompanyList" :key="index"></el-option>
                </el-select>
            </div>
            <div class="flex-row align-items mb20">
                <span class="wid80">返利类型</span>
                 <el-radio v-model="rebateType" label="0" class="mr24">按比例</el-radio>
                 <el-radio v-model="rebateType" label="1" class="mr24">按金额</el-radio>
            </div>
             <div class="flex-row align-items mb20">
                <span class="wid80"></span>
                <el-input class="mr10"  placeholder="请输入比例" v-model="bili" v-if="rebateType=='0'"></el-input><span v-if="rebateType=='0'">%</span>
                <el-input class="mr10"  placeholder="请输入金额" v-model="jine" v-if="rebateType=='1'"></el-input><span v-if="rebateType=='1'">元</span>
               
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="issueVb1 = false">取 消</el-button>
                <el-button type="primary" @click="issueVb1 = false">确 定</el-button>
            </span>
        </el-dialog>
    <el-dialog title="返利明细" :visible.sync="issueVb" width="800px" :close-on-click-modal="false" :show-close="false">
        <el-table :data="couponData" style="width: 100%" border>
                <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                <el-table-column  label="优惠券" > 
                    <template slot-scope="scope">
                        <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="linkName" label="会员昵称"> </el-table-column>
                <el-table-column label="消费金额"> 
                     <template slot-scope="scope">
                        <span >{{scope.row.consumeAmount/100}}</span>
                    </template> 
                </el-table-column>
                <el-table-column prop="afterTime" label="核销时间" width="160"> </el-table-column>
                <el-table-column label="返利金额">
                    <template slot-scope="scope">
                        <span >{{scope.row.rebateAmount/100}}</span>
                    </template> 
                </el-table-column>
        </el-table>    
        <div slot="footer" class="dialog-footer flex-B">
           <el-button type="primary" @click="issueVb = false">确 定</el-button>
           <div class="block-page flex">
                <el-pagination
                    @size-change="handleSizeChange"  @current-change="handleCurrentChange"  :page-size="limit" :pager-count="11" layout="prev, pager, next"  :total="total">
                </el-pagination>
            </div>  
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
    data(){
        return {
           issueVb:false,
           issueVb1:false,
           rebateCompIdReceived:"",
           bili:"",
           jine:"",
           rebateType:"0",
           rebateVal:"",
           assName:"",
           assMobile:"",
           assStatus:"",
           page:0,
           limit:2,
           total:4,
           CompanyList:[
              {
                  companyName:"一点点",
                  id:"20",
              },
              {
                  companyName:"麻辣香锅",
                  id:"10",
              }
           ],
           RecordList:[
               {
                  rebateType:"0",
                  rebateVal:"50",
                  linkName:"张三",
                  givecompanyName:"米兰婚纱",
                  linkMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  totalAmount:"23398",
                  balanceAmount:"12233",
               },
           ],
           tableData:[
               {
                  rebateType:"0",
                  rebateVal:"50",
                  createUserName:"张三",
                  receiveshop:"米兰婚纱",
                  createMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  totalAmount:"23398",
                  balanceAmount:"12233",
               },
               {
                  rebateType:"1",
                  rebateVal:"500000",
                  createUserName:"张三",
                  receiveshop:"一点点",
                  createMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  totalAmount:"23398",
                  balanceAmount:"12233",
               },
               {
                  rebateType:"1",
                  rebateVal:"500000",
                  createUserName:"张三",
                  receiveshop:"一点点",
                  createMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  totalAmount:"23398",
                  balanceAmount:"0",
               },
               {
                  rebateType:"0",
                  rebateVal:"50",
                  createUserName:"张三",
                  receiveshop:"一点点",
                  createMobile:"15747898564",
                  createTime:"2019-03-21 9:34:74",
                  totalAmount:"23398",
                  balanceAmount:"12233",
               }
           ],
           couponData:[
               {
                   couponName:"满5.01元减5元",
                   linkName:"张三",
                   consumeAmount:"40000",
                   afterTime:"2019-03-21 9:34:74",
                   rebateAmount:"4500",
               },
               {
                   couponName:"满5.01元减5元",
                   linkName:"张三",
                   consumeAmount:"40000",
                   afterTime:"2019-03-21 9:34:74",
                   rebateAmount:"4500",
               },
               {
                   couponName:"满5.01元减5元",
                   linkName:"张三",
                   consumeAmount:"40000",
                   afterTime:"2019-03-21 9:34:74",
                   rebateAmount:"4500",
               },
               {
                   couponName:"满5.01元减5元",
                   linkName:"张三",
                   consumeAmount:"40000",
                   afterTime:"2019-03-21 9:34:74",
                   rebateAmount:"4500",
               },
           ]
        }
    },
    created() {
       
    },
    methods: {
       //新增
       add(){
          this.issueVb1=true;
       },
       //查看
       handleread(val){
          this.issueVb=true;
       },
       //编辑
       handleEdit(val){

       },
       //删除
       handleDelete(scope){
             this.$confirm('确定删除该条返利设置?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.$axios.interface.sysUserDel,{'rebateSetId':scope.row.id}).then(res=>{
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
