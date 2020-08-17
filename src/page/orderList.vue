<template>
    <div>
        <div class="crumb">商品券管理</div>
        <div class="backfff  mb20">
            <div class="container-head">
                <span>商品券列表 </span>
            </div>
            <div class="container">
                <div class="search flexWarp ">
                    <div class="item mr24">
                        <span class="name">筛选</span>
                        <el-select v-model="select">
                            <el-option label="商品名称" value="couponName"></el-option>
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
                        <el-select v-model="source" placeholder="选择商品来源">
                            <el-option label="秒杀" value="1"></el-option>
                            <el-option label="拼团" value="2"></el-option>
                            <el-option label="砍价" value="3"></el-option>
                            <el-option label="商城" value="4"></el-option>
                            <el-option label="组合商品" value="5"></el-option>
                            <el-option label="充值" value="6"></el-option>
                        </el-select>
                    </div>
                   <div class="item mr24 time">
                        <el-date-picker v-model="useTime" type="date" placeholder="核销时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-date-picker v-model="receiveTime" type="date" placeholder="购买时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="item mr24 time">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </div>
                </div> 
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column  type="index" label="编号"  width="60"></el-table-column>
                    <el-table-column prop="sheetNo" label="订单号"> </el-table-column>
                    <el-table-column  label="订单状态"> 
                        <template slot-scope="scope">
                            <el-tag size="mini" plain v-if="scope.row.payStatus=='0'">支付中</el-tag>
                            <el-tag size="mini" type="danger" plain  v-if="scope.row.payStatus=='1'">支付失败</el-tag>
                            <el-tag size="mini" type="success" plain  v-if="scope.row.payStatus=='2'">支付成功</el-tag>
                            <el-tag size="mini" type="danger" plain  v-if="scope.row.payStatus=='3'">退款中</el-tag>
                            <el-tag size="mini" type="danger" plain  v-if="scope.row.payStatus=='4'">退款中</el-tag>
                            <el-tag size="mini" type="info"  plain v-if="scope.row.payStatus=='5'">退款成功</el-tag>
                        </template>   
                    </el-table-column>
                    <el-table-column prop="couponName" label="商品名称"> </el-table-column>
                    <el-table-column prop="couponSendRecordId" label="卡券ID"> </el-table-column>
                    <el-table-column label="商品来源">
                       <template slot-scope="scope">
                           <span v-if="scope.row.source=='1'">秒杀</span>
                           <span v-if="scope.row.source=='2'">拼团</span>
                           <span v-if="scope.row.source=='3'">砍价</span>
                           <span v-if="scope.row.source=='4'">商城</span>
                           <span v-if="scope.row.source=='5'">组合商品</span>
                           <span v-if="scope.row.source=='6'">充值</span>
                        </template>  
                    </el-table-column>
                    <el-table-column prop="purchaseNum" label="商品数量"> </el-table-column>
                    <el-table-column prop="useNum" label="已核销数量"> </el-table-column>
                    <el-table-column label="价格">
                        <template slot-scope="scope" v-if="scope.row.payAmount">{{scope.row.payAmount/100}}</template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="会员昵称"> </el-table-column>
                    <el-table-column prop="mobileNo" label="手机号" width="115"> </el-table-column>
                    <el-table-column prop="pointsVal" label="返积分"> </el-table-column>
                     <el-table-column  label="赠券状态"> 
                        <template slot-scope="scope">
                            <el-tag size="mini" type="success" plain  v-if="scope.row.couponStatus=='0'">已领取</el-tag>
                            <el-tag size="mini"  plain  v-if="scope.row.couponStatus=='1'">已核销</el-tag>
                            <el-tag size="mini" type="danger" plain v-if="scope.row.couponStatus=='2'">已过期</el-tag>
                        </template>   
                    </el-table-column>
                    <el-table-column prop="useTime" label="核销时间"> </el-table-column>
                    <el-table-column prop="receiveTime" label="购买时间"> </el-table-column>
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
           useTime:"",
           receiveTime:"",
           couponStatus:"",
           source:"",
           start:0,
           limit:2,
           total:4,
           tableData:[
               {
                "id":"1",
                "sheetNo":"O1009878123",
                "payStatus":"0",
                "payAmount":"12400",
                "source":"1",
                "pointsVal":"455",
                "couponName":"大猪蹄子",
                "purchaseNum":"4",
                "useNum":"2",
                "nickName":"张三",
                "mobileNo":"15874585236",
                "receiveTime":"2019-03-14 15:00",
                "couponStatus":"0",
                "useTime":"2019-03-21 15:00",
                "couponSendRecordId":"xRq189d"
               },
               {
                "id":"1",
                "sheetNo":"O1009878123",
                "payStatus":"2",
                "payAmount":"12400",
                "source":"1",
                "pointsVal":"455",
                "couponName":"大猪蹄子",
                "purchaseNum":"4",
                "useNum":"2",
                "nickName":"张三",
                "mobileNo":"15874585236",
                "receiveTime":"2019-03-14 15:00",
                "couponStatus":"1",
                "useTime":"2019-03-21 15:00",
                "couponSendRecordId":"xRq189d"
               }
           ]
        }
    },
    methods:{
       search(){

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

