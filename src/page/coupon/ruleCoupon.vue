<template>
    <div>
        <div class="crumb">优惠券管理</div>
        <div class="backfff">
            <div class="container-head flex-B" style="padding: 9px 30px;">
                <span>发券规则 </span>
                <el-button type="primary" size="medium" @click="add">新增</el-button>
            </div>
            <div class="container">
                 <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%" border>
                    <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                    <el-table-column prop="consumeCompName" label="门店名"> </el-table-column>
                    <el-table-column  label="消费金额"> 
                        <template slot-scope="scope">
                            <span v-if="scope.row.consumeAmountLimit=='0'">不限</span>
                            <span v-else>{{scope.row.consumeAmountLow/100}}-{{scope.row.consumeAmountUp/100}}</span>
                        </template>   
                    </el-table-column>
                    <el-table-column prop="useTime" label="是否发积分">
                        <template slot-scope="scope">
                            {{scope.row.sendPointLimit=='0'?"否":"是"}}
                        </template>
                    </el-table-column>
                    <el-table-column  label="积分范围"> 
                         <template slot-scope="scope">
                            <span v-if="scope.row.sendPointLimit=='0'">0</span>
                            <span v-else>{{scope.row.sendPointLow}}-{{scope.row.sendPointUp}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column  label="发放券"> 
                         <template slot-scope="scope">
                           <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button size="mini"  type="info"  @click="handleEdit(scope.row)">修改</el-button>
                            <el-button  size="mini" type="danger"  @click="handleDelete(scope)">删除</el-button>
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
        <el-dialog title="新增发券规则" :visible.sync="issueVb" width="700px" :close-on-click-modal="false" :show-close="false">
            <div class="flex-row align-items mb20">
                <span class="wid80">发放门店</span>
                <el-select :rows="6" v-model="companyName"   placeholder="选择门店">
                    <el-option :label="item.companyName" :value="item.id" v-for="(item,index) in CompanyList" :key="index"></el-option>
                </el-select>
            </div>
            <div class="flex-row align-items mb20">
                <span class="wid80">消费金额</span>
                <el-input class="wid80 mr24" placeholder="最小值" v-model="consumeAmountLow"></el-input>
                <span class="mr24">-</span>
                <el-input class="wid80 mr24" placeholder="最大值" v-model="consumeAmountUp"></el-input>
                <el-checkbox v-model="consume" @change="getconsume">不限</el-checkbox>
            </div>
             <div class="flex-row align-items mb20">
                <span class="wid80">发放积分</span>
                <el-input class="wid80 mr24" placeholder="最小值" v-model="sendPointLow"></el-input>
                <span class="mr24">-</span>
                <el-input class="wid80 mr24" placeholder="最大值" v-model="sendPointUp"></el-input>
                <el-checkbox v-model="sendPoint" @change="getsendPoint">不发放</el-checkbox>
            </div>
            <div class="flex-row  mb20" style="    align-items: self-start;">
                <span class="wid80">发放优惠券</span>
                <el-table :data="couponData" style="width: 100%" border>
                     <el-table-column prop="companyName" label="所属门店">
                    </el-table-column>
                    <el-table-column prop="couponName" label="优惠券">
                    <template slot-scope="scope">
                        <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="deleteCoupon(scope)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                 <el-button type="primary" class="ml10" @click="addDiscountCoupon">添加优惠券</el-button>
            </div>    
            <span slot="footer" class="dialog-footer">
                <el-button @click="issueVb = false">取 消</el-button>
                <el-button type="primary" @click="issueVb = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog width="700px" title="选择优惠券" :visible.sync="innerVisible" append-to-body>
            <el-table :data="couponallData" style="width: 100%" border @selection-change="handleSelectionChange" ref="multipleTable">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" label="编号" width="70"></el-table-column>
                <el-table-column prop="couponName" label="优惠券">
                    <template slot-scope="scope">
                    <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" label="所属门店">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="addinner">确 定</el-button>
            </span>
        </el-dialog>
    
    </div>    
</template>
<script>
export default {
    data(){
        return{
           issueVb:false,
           innerVisible:false,
           start:0,
           limit:2,
           total:6,
           spanArr:[],
           companyName:"",//选择门店
           consume:false,
           consumeAmountLimit:this.consume=='true'?'0':'1',
           consumeAmountLow:"",
           consumeAmountUp:"",
           sendPointLow:"",
           sendPointUp:"",
           sendPoint:false,
           sendPointLimit:this.sendPoint=='true'?'0':'1',
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
           couponData:[
              {
                   companyName:"一点点",
                   couponName:"5元优惠券 [一点点]",
              },
              {
                   companyName:"一点点",
                   couponName:"25元优惠券 [一点点]",
              },
           ],
           tableData:[
               {
                "consumeCompName":"伯爵旅拍",
                "consumeAmountLimit":"1",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"1",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               },
                {
                "consumeCompName":"伯爵旅拍",
                "consumeAmountLimit":"0",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"0",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               },
                {
                "consumeCompName":"伯爵旅拍",
                "consumeAmountLimit":"0",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"0",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               },
                {
                "consumeCompName":"麻辣香锅",
                "consumeAmountLimit":"0",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"0",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               },
                {
                "consumeCompName":"麻辣香锅",
                "consumeAmountLimit":"0",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"0",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               },
                {
                "consumeCompName":"一点点",
                "consumeAmountLimit":"0",
                "consumeAmountLow":"0",
                "consumeAmountUp":"1000",
                "sendPointLimit":"0",
                "sendPointLow":"0",
                "sendPointUp":"200",
                "couponName":"5元优惠券 [一点点]",
                "objStatus":"0"
               }

           ],
            couponallData: [
                {
                companyName:"一点点",
                couponName:"25元优惠券 [一点点]",
                linkMobile: "15747898564",
                createTime: "2019-03-21 9:34:74"
                },
                {
                couponName:"25元优惠券",
                companyName: "米兰婚纱",
                linkMobile: "15747898564",
                createTime: "2019-03-21 9:34:74"
                },
                {
                couponName:"35元优惠券",
                companyName: "米兰婚纱",
                linkMobile: "15747898564",
                createTime: "2019-03-21 9:34:74"
                }
            ],
           
        }
        
    },
    methods:{
        //新增
        add(){
           this.issueVb=true;
        },
        //修改
        handleEdit(val){

        },
        //删除
        handleDelete(scope){
            this.$confirm('确定删除该条发券规则?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(this.$axios.interface.sysUserDel,{'couponSendRuleId':scope.row.id}).then(res=>{
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
        //是否限制金额
        getconsume(val){
           if(val){
               this.consumeAmountLow="";
               this.consumeAmountUp="";
           }
        },
        //是否发放积分
        getsendPoint(val){
            if(val){
               this.sendPointLow="";
               this.sendPointUp="";
           }
        },
        // 添加优惠券弹窗
        addDiscountCoupon() {
        this.multipleSelection = [];
        this.innerVisible = true;
        },
        // 删除优惠券
        deleteCoupon(e) {
        this.couponData.splice(e, 1);
        },
        // 选择复选框
        handleSelectionChange(e) {
        this.multipleSelection = e;
        },
        // 确定添加优惠券
        addinner() {
        this.multipleSelection.forEach(x => {
            this.couponData.push(x);
        });
        this.innerVisible = false;
        this.$refs.multipleTable.clearSelection();
        },
        getSpanArr(data) {　
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                this.spanArr.push(1);
                this.pos = 0
                } else {
                // 判断当前元素与上一个元素是否相同
                if (data[i].consumeCompName === data[i - 1].consumeCompName) {
                    this.spanArr[this.pos] += 1;
                    this.spanArr.push(0);
                } else {
                    this.spanArr.push(1);
                    this.pos = i;
                }
                }
          }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
             if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                     colspan: _col
                }
            }
        },
       


         //分页
        handleSizeChange(val) {
            this.limit=val
        
        },
        handleCurrentChange(val) {
            this.start=val
        
        },
    },
    mounted(){ 
        this.getSpanArr(this.tableData);
    }
}
</script>

