<template>
    <div>
        <div class="crumb">优惠券管理</div>
        <div class="backfff mb20">
            <div class="container-head flex-B" style="padding: 9px 30px;">
                <span>进店领优惠券列表</span>
                <el-button type="primary" size="medium" @click="add">新增优惠券</el-button>
            </div>
            <div class="container">
                <el-table :data="tableData"  style="width: 100%" border>
                    <el-table-column  label="优惠券"  width="300"> 
                        <template slot-scope="scope">
                           <el-tag size="mini" plain>{{scope.row.couponName}} {{scope.row.expireDayStart}}-{{scope.row.expireDayEnd}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendNumLimit" label="发放数量"> </el-table-column>
                    <el-table-column label="剩余数量">
                        <template slot-scope="scope">
                            {{scope.row.sendNumLimit-scope.row.hasSendNum}}    
                        </template>    
                    </el-table-column>
                    <el-table-column label="发布状态">
                        <template slot-scope="scope">
                            <el-tag size="mini" plain v-if="scope.row.auditStatus=='0'">草稿</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.auditStatus=='1'">已发布</el-tag>   
                            <el-tag size="mini" type="info" plain v-if="scope.row.auditStatus=='2'">已终止</el-tag>   
                        </template>    
                    </el-table-column>
                    <el-table-column label="投放状态">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="info" plain v-if="scope.row.couponStatus=='0'">未投放</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.couponStatus=='1'">投放中</el-tag>   
                            <el-tag size="mini" type="danger" plain v-if="scope.row.couponStatus=='2'">已结束</el-tag>   
                        </template>    
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                    <el-table-column prop="updateTime" label="最后更新时间"> </el-table-column>
                    <el-table-column  label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="success"  @click="handleUpper(scope.row)" v-if="scope.row.couponStatus=='0'||scope.row.couponStatus=='2'">上架</el-button>
                            <el-button  size="mini"  @click="handleEdit(scope.row)" v-if="scope.row.auditStatus=='0'">编辑</el-button>
                            <el-button  size="mini" type="danger"  @click="handleDelete(scope.row)"  v-if="scope.row.couponStatus=='1'">下架</el-button>
                            <el-button  size="mini" type="info"  @click="handleDelete(scope.row)" v-if="scope.row.couponStatus=='0'||scope.row.couponStatus=='2'">删除</el-button>
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
         <div class="backfff mb20">
            <div class="container-head flex-B" style="padding: 9px 30px;">
                <span>消费赠优惠券列表</span>
                <el-button type="primary" size="medium" @click="add">新增优惠券</el-button>
            </div>
            <div class="container">
                <el-table :data="tableData"  style="width: 100%" border>
                    <el-table-column  label="优惠券"  width="300"> 
                        <template slot-scope="scope">
                           <el-tag size="mini" plain>{{scope.row.couponName}} {{scope.row.expireDayStart}}-{{scope.row.expireDayEnd}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendNumLimit" label="发放数量"> </el-table-column>
                    <el-table-column label="剩余数量">
                        <template slot-scope="scope">
                            {{scope.row.sendNumLimit-scope.row.hasSendNum}}    
                        </template>    
                    </el-table-column>
                    <el-table-column label="发布状态">
                        <template slot-scope="scope">
                            <el-tag size="mini" plain v-if="scope.row.auditStatus=='0'">草稿</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.auditStatus=='1'">已发布</el-tag>   
                            <el-tag size="mini" type="info" plain v-if="scope.row.auditStatus=='2'">已终止</el-tag>   
                        </template>    
                    </el-table-column>
                    <el-table-column label="投放状态">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="info" plain v-if="scope.row.couponStatus=='0'">未投放</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.couponStatus=='1'">投放中</el-tag>   
                            <el-tag size="mini" type="danger" plain v-if="scope.row.couponStatus=='2'">已结束</el-tag>   
                        </template>    
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                    <el-table-column prop="updateTime" label="最后更新时间"> </el-table-column>
                    <el-table-column  label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="success"  @click="handleUpper(scope.row)" v-if="scope.row.couponStatus=='0'||scope.row.couponStatus=='2'">上架</el-button>
                            <el-button  size="mini"  @click="handleEdit(scope.row)" v-if="scope.row.auditStatus=='0'">编辑</el-button>
                            <el-button  size="mini" type="danger"  @click="handleshelf(scope.row)"  v-if="scope.row.couponStatus=='1'">下架</el-button>
                            <el-button  size="mini" type="info"  @click="handleDelete(scope.row)" v-if="scope.row.couponStatus=='0'||scope.row.couponStatus=='2'">删除</el-button>
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
        <el-dialog title="新增优惠券" :visible.sync="issueVb" width="850px" :close-on-click-modal="false" :show-close="false">
            <div style="display:inline-block;vertical-align: top;padding-left:50px;">
                    <div class="flex-row align-items mb20">
                        <span class="wid80">优惠券名称</span>
                        <el-input :rows="6" placeholder="输入优惠券名称" v-model="couponName"></el-input>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80">投放数量</span>
                        <el-input class=" mr24" placeholder="投放数量" v-model="sendNumLimit"></el-input>
                        <el-checkbox v-model="consume" @change="getsendNum">不限</el-checkbox>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80">① 面值</span>
                        <el-radio v-model="rebateType" label="0" class="mr24">折扣</el-radio>
                        <el-radio v-model="rebateType" label="1" class="mr24">金额</el-radio>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80"></span>
                        <el-input class="mr10"  placeholder="请输入折扣" v-model="bili" v-if="rebateType=='0'"></el-input><span v-if="rebateType=='0'">折</span>
                        <el-input class="mr10"  placeholder="请输入优惠金额" v-model="jine" v-if="rebateType=='1'"></el-input><span v-if="rebateType=='1'">元</span>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80">② 使用条件</span>
                        <el-input class="mr24" placeholder="输入满限定可使用金额" v-model="userRulePrice"></el-input>
                        <el-checkbox v-model="useRule" @change="getuseRule">不限</el-checkbox>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80">③ 使用说明</span>
                        <el-input  placeholder="可使用条件说明" v-model="couponRemarks"></el-input>
                    </div>
                    <div class="flex-row align-items mb20">
                        <span class="wid80">④ 有效期</span>
                        <el-radio v-model="expireType" label="0" class="mr10">永久</el-radio>
                    </div>
                    <div class="flex-row align-items mb20">
                        <div class="wid80"></div>
                        <el-radio v-model="expireType" label="1" class="mr10 time"></el-radio>
                        <el-date-picker v-model="expiretime"   type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd" @change="gettime">
				        </el-date-picker>
                    </div>    
                     <div class="flex-row align-items mb20">
                        <div class="wid80"></div>    
                        <el-radio v-model="expireType" label="2" class="mr10 time"></el-radio>
                        <span class="mr3">领取后</span>
                        <el-input class="wid60 mr3" placeholder="天数" v-model="expireDays"></el-input>
                        <span class="mr3">天</span>
                         <el-input class="mr3 wid60"  placeholder="时长" v-model="expireHours"></el-input>
                         <span>小时有效</span>
                    </div>
                   
            </div>
            <div style="display:inline-block ;vertical-align: top;margin-left: -50px;">
                <div class="code flex-row">
                     <div class="code-left">
                            <p><span class="mr10">①</span>
                                <span class="f32" v-if="rebateType=='1'"><small class="f14">￥</small>{{jine>0?jine:"0"}}</span>
                                <span class="f32" v-if="rebateType=='0'">{{bili?bili:"1"}}<small class="f14">折</small></span>
                            </p>
                            <p class="f12"><span class="mr10">②</span>
                               <span  v-if="useRule==false">满{{userRulePrice>0?userRulePrice:"100"}}元可用</span>
                               <span v-else>不限</span>
                            </p>
                     </div>
                     <div class="flex-1 code-right">
                            <p class="f16">铂爵铝牌</p>
                            <div class="f12 mt55 mb5"><span class="mr10">③</span><span class="f12">{{couponRemarks?couponRemarks:"示例：仅门店可使用"}}</span></div>
                            <div class="f12"><span class="mr10">④</span>
                                 <span v-if="expireType=='0'">永久有效</span>
                                 <span v-if="expireType=='1'&&expiretime==''">2019/03/26 - 2019/07/11</span>
                                 <span v-if="expireType=='1'&&expiretime.length>0">{{expireDayStart}}至{{expireDayEnd}}</span>
                                 <span v-if="expireType=='2'">{{expireDays?expireDays:"X"}}天{{expireHours?expireHours:'Y'}}小时有效</span>
                            </div>
                     </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:left;padding-left:120px;">
                <el-button type="primary" @click="issueVb = false">上架投放</el-button>
                <el-button type="primary" plain @click="issueVb = false">存为草稿</el-button>
                <el-button @click="issueVb = false">取 消</el-button>
                
            </div>
        </el-dialog>  
    </div>
</template>
<style>
.time .el-radio__label{
    display: none;
}
.code{
    width:325px;
    height:150px;
    background:rgba(236,245,255,1);
    border:1px solid rgba(179,216,255,1);
    border-radius:12px;
    padding: 10px 15px;
    box-sizing: border-box;
    color: #0D86FF;
}
.code-left{
    padding-right: 20px;
    border-right:1px dashed rgba(179,216,255,1);
}
.code-right{
    text-align: right;
}
</style>

<script>
export default {
    data(){
        return{
           start:0,
           limit:2,
           total:6,
           issueVb:false,
           couponName:"",
           consume:false,
           sendNumLimit:"",
           bili:"",
           jine:"",
           auditStatus:"",
           sendNumLimitType:this.consume=='true'?'0':'1',
           couponRemarks:"",
           userRulePrice:"",
           useRule:false,
           useRuleType:this.useRule=='true'?'0':'1',
           rebateType:"0",
           expireType:"0",
           expiretime:[],
           expireDayStart:"",
           expireDayEnd:"",
           expireDays:"",
           expireHours:"",
           tableData:[
               {
                  couponName:"满5.01元减5元",
                  expireDayStart:"2019/03/26",
                  expireDayEnd:"2019/07/11",
                  sendNumLimit:"3000",
                  hasSendNum:"300",
                  auditStatus:"1",
                  couponStatus:"2",
                  createTime:"2019-03-21 9:34:74",
                  updateTime: "2018-12-01 12:20",
               },
               {
                  couponName:"满5.01元减5元",
                  expireDayStart:"2019/03/26",
                  expireDayEnd:"2019/07/11",
                  sendNumLimit:"3000",
                  hasSendNum:"300",
                  auditStatus:"1",
                  couponStatus:"1",
                  createTime:"2019-03-21 9:34:74",
                  updateTime: "2018-12-01 12:20",
               },
               {
                  couponName:"满5.01元减5元",
                  expireDayStart:"2019/03/26",
                  expireDayEnd:"2019/07/11",
                  sendNumLimit:"3000",
                  hasSendNum:"300",
                  auditStatus:"0",
                  couponStatus:"0",
                  createTime:"2019-03-21 9:34:74",
                  updateTime: "2018-12-01 12:20",
               },
           ]
        }
    },
    methods:{
        add(){
            this.issueVb=true;
            this.expireDayStart="";
            this.expireDayEnd="";
        },
        //投放数量
        getsendNum(val){
            if(val){
                this.sendNumLimit="";
            }
        },
        //限定金额
        getuseRule(val){
            if(val){
                this.userRulePrice="";
            }  
        },
        //选择时间
        gettime(val){
           this.expireDayStart=val[0];
           this.expireDayEnd=val[1];
        },
        //上架
        handleUpper(val){

        },
        //下架
        handleshelf(val){

        },
        //编辑
        handleEdit(val){

        },
        //删除
        handleDelete(scope){
            this.$confirm('确定删除该优惠券?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.$axios.interface.sysUserDel,{'couponSetId':scope.row.id}).then(res=>{
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
        handleSizeChange(val){
            this.limit=val
        
        },
        handleCurrentChange(val){
            this.start=val
        
        },
    },
    mounted(){

    }
}
</script>
