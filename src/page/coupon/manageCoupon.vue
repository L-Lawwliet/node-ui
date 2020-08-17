<template>
    <div>
        <div class="crumb">优惠券管理</div>
        <div class="backfff  mb20">
            <div class="container-head">
                <span>本店优惠券</span>
            </div>
            <div class="container">
                <div class="search flexWarp ">
                    <div class="item mr24">
                        <span class="name">筛选</span>
                        <el-select v-model="select">
                            <el-option label="券名称" value="couponName"></el-option>
                            <el-option label="发放门店" value="companyName"></el-option>
                            <el-option label="会员昵称" value="nickName"></el-option>
                            <el-option label="会员手机号" value="mobileNo"></el-option>
                        </el-select>
                    </div>
                    <div class="item mr24">
                        <el-input prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容"></el-input>
                    </div>
                    <div class="item mr24">
                       <el-select v-model="couponStatus" placeholder="选择商品券状态">
                            <el-option label="已领取" value="0"></el-option>
                            <el-option label="已核销" value="1"></el-option>
                            <el-option label="已过期" value="2"></el-option>
                        </el-select>
                    </div>
                    <div class="item mr24">
                       <el-select v-model="couponType" placeholder="赠券类型">
                            <el-option label="无门槛券" value="1"></el-option>
                            <el-option label="消费赠券" value="2"></el-option>
                        </el-select>
                    </div>
                   <div class="item mr24 time">
                        <el-date-picker v-model="useTime" type="date" placeholder="核销时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-date-picker v-model="receiveTime" type="date" placeholder="发放时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </div>
                </div> 
                <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%" border>
                    <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                    <el-table-column prop="couponSetNo" label="卡券ID"> </el-table-column>
                    <el-table-column  label="优惠券"> 
                        <template slot-scope="scope">
                            <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                        </template>   
                    </el-table-column>
                    <el-table-column  label="获得方式" width="80"> 
                        <template slot-scope="scope">
                            {{scope.row.couponType=='1'?'无门槛券':'消费赠券'}}
                        </template>   
                    </el-table-column>
                    <el-table-column prop="nickName" label="会员昵称"> </el-table-column>
                    <el-table-column prop="mobileNo" label="手机号"> </el-table-column>
                    <el-table-column prop="companyName" label="发放门店"> </el-table-column>
                    <el-table-column prop="receiveTime" label="发放时间"> </el-table-column>
                    <el-table-column label="消费金额">
                        <template slot-scope="scope"> {{scope.row.amount/100}} </template>   
                     </el-table-column>
                     <el-table-column label="投放状态" width="80">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="info" plain v-if="scope.row.couponStatus=='0'">未投放</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.couponStatus=='1'">投放中</el-tag>   
                            <el-tag size="mini" type="danger" plain v-if="scope.row.couponStatus=='2'">已结束</el-tag>   
                        </template>   
                     </el-table-column>
                    <el-table-column prop="useTime" label="核销时间"> </el-table-column>
                    <el-table-column label="有效时长">
                        <template slot-scope="scope">
                            <span v-if="scope.row.expireType=='0'">永久</span>
                            <span v-else>{{scope.row.expireDayStart}}/{{scope.row.expireDayEnd}}</span> 
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
         <div class="backfff  mb20">
            <div class="container-head">
                <span>盟友优惠券</span>
            </div>
            <div class="container">
                <div class="search flexWarp ">
                    <div class="item mr24">
                        <span class="name">筛选</span>
                        <el-select v-model="select">
                            <el-option label="券名称" value="couponName"></el-option>
                            <el-option label="发放门店" value="companyName"></el-option>
                            <el-option label="会员昵称" value="nickName"></el-option>
                            <el-option label="会员手机号" value="mobileNo"></el-option>
                        </el-select>
                    </div>
                    <div class="item mr24">
                        <el-input prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容"></el-input>
                    </div>
                    <div class="item mr24">
                       <el-select v-model="couponStatus" placeholder="选择商品券状态">
                            <el-option label="已领取" value="0"></el-option>
                            <el-option label="已核销" value="1"></el-option>
                            <el-option label="已过期" value="2"></el-option>
                        </el-select>
                    </div>
                    <div class="item mr24">
                       <el-select v-model="couponType" placeholder="赠券类型">
                            <el-option label="无门槛券" value="1"></el-option>
                            <el-option label="消费赠券" value="2"></el-option>
                        </el-select>
                    </div>
                   <div class="item mr24 time">
                        <el-date-picker v-model="useTime" type="date" placeholder="核销时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-date-picker v-model="receiveTime" type="date" placeholder="发放时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </div>
                </div> 
                <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%" border>
                    <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                     <el-table-column prop="companyName" label="发放门店"> </el-table-column>
                    <el-table-column  label="优惠券"> 
                        <template slot-scope="scope">
                            <el-tag size="mini" plain>{{scope.row.couponName}}</el-tag>
                        </template>   
                    </el-table-column>
                    <el-table-column prop="nickName" label="会员昵称"> </el-table-column>
                    <el-table-column prop="mobileNo" label="手机号"> </el-table-column>
                    <el-table-column prop="receiveTime" label="发放时间"> </el-table-column>
                    <el-table-column label="消费金额">
                        <template slot-scope="scope"> {{scope.row.amount/100}} </template>   
                     </el-table-column>
                     <el-table-column label="投放状态" width="80">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="info" plain v-if="scope.row.couponStatus=='0'">未投放</el-tag>  
                            <el-tag size="mini" type="success" plain v-if="scope.row.couponStatus=='1'">投放中</el-tag>   
                            <el-tag size="mini" type="danger" plain v-if="scope.row.couponStatus=='2'">已结束</el-tag>   
                        </template>   
                     </el-table-column>
                    <el-table-column prop="useTime" label="核销时间"> </el-table-column>
                    <el-table-column label="有效时长">
                        <template slot-scope="scope">
                            <span v-if="scope.row.expireType=='0'">永久</span>
                            <span v-else>{{scope.row.expireDayStart}}/{{scope.row.expireDayEnd}}</span> 
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
    </div>    
</template>
<script>
export default {
    data(){
        return{
           select:"",
           keyword:"",
           couponStatus:"",
           couponType:"",
           useTime:"",
           receiveTime:"",
           start:0,
           limit:2,
           total:6,
           tableData:[
               {
                   couponSetNo:"xRq189d",
                   couponName:"满5.01元减5元",
                   couponType:"1",
                   nickName:"张三",
                   mobileNo:"15847825694",
                   companyName:"一点点",
                   receiveTime:"2019-03-21 9:34:74",
                   amount:"4000",
                   useTime:"2019-03-26",
                   couponStatus:"2",
                   expireType:"0"
               },
                {
                   couponSetNo:"xRq189d",
                   couponName:"满5.01元减5元",
                   couponType:"0",
                   nickName:"张三",
                   mobileNo:"15847825694",
                   companyName:"一点点",
                   receiveTime:"2019-03-21 9:34:74",
                   amount:"4000",
                   useTime:"2019-03-26 9:34:74",
                   couponStatus:"2",
                   expireType:"1",
                   expireDayStart:"2019-03-26",
                   expireDayEnd:"2019-06-26",
               }
           ]
        }
    },
    methods:{
         //分页
        handleSizeChange(val) {
            this.limit=val
        
        },
        handleCurrentChange(val) {
            this.start=val
        
        },
    },
    mounted(){

    }
}
</script>

