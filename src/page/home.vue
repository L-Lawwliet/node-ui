<template>
  <div>
    <div class="crumb">首页</div>
    <div class="backfff mb20">
      <div class="container-head">
        <span>生活圈今日数据统计</span>
        <span class="nowtiem">更新时间：2019-4-12 12:00</span>
      </div>
      <div class="flex-row container-div">
        <div class="flex-1 xian">
          <div class="contai-num">450,000</div>
          <div class="contai-text">生活圈积分总账</div>
        </div>
        <div class="flex-1 xian">
          <div class="contai-num">4,450</div>
          <div class="contai-text">今日发放积分</div>
        </div>
        <div class="flex-1 xian">
          <div class="contai-num">450,000</div>
          <div class="contai-text">当前会员总数</div>
        </div>
        <div class="flex-1">
          <div class="contai-num">450,000</div>
          <div class="contai-text">今日新增会员</div>
        </div>
      </div>
    </div>
    <div class="backfff mb20">
      <div class="container-head">
        <span>门店今日数据统计</span>
        <span class="nowtiem">更新时间：2019-4-12 12:00</span>
      </div>
      <div class="flex-row container-div">
        <div class="flex-1 xian">
          <div class="contai-num">9,156</div>
          <div class="contai-text">线下收入金额(元)</div>
        </div>
        <div class="flex-1 xian">
          <div class="contai-num">4,450</div>
          <div class="contai-text">线下发放积分</div>
        </div>
        <div class="flex-1 xian">
          <div class="contai-num">450,000</div>
          <div class="contai-text">售卖商品券(张)</div>
        </div>
        <div class="flex-1">
          <div class="contai-num">450,000</div>
          <div class="contai-text">核销卡券</div>
        </div>
      </div>
    </div>
    <div class="backfff mb20">
      <div class="container-head">
        <span>圈内动态</span>
        <span class="nowtiem">2019年3月18日</span>
      </div>
      <div class="flex-B container-footer">
        <div class="flex-1">
          <div class="footer-num mb20">一点点<span class="bianji">餐饮</span></div>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放积分</div>
                <div>1111</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销优惠券</div>
                <div>1111</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放优惠券</div>
                <div>1121</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销商品券</div>
                <div>556</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="flex-1">
          <div class="footer-num mb20">一点点<span class="bianji">餐饮</span></div>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放积分</div>
                <div>1111</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销优惠券</div>
                <div>1111</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放优惠券</div>
                <div>1121</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销商品券</div>
                <div>556</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="flex-1">
          <div class="footer-num mb20">一点点<span class="bianji">餐饮</span></div>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放积分</div>
                <div>1111</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销优惠券</div>
                <div>1111</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="footer-text">
            <el-col :span="12">
              <div class="flex-B mb20">
                <div>发放优惠券</div>
                <div>1121</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex-B">
                <div>核销商品券</div>
                <div>556</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from './../api/api'
export default {
  name: 'home',
  data() {
    return{

    }
  },
  mounted(){
    setTimeout(() => {
      api.getBank().then(res=>{
      console.log(res)
    })
    }, 2000);
  }
}
</script>

<style scoped lang="less">
.nowtiem {
  color: #999999;
  font-size: 12px;
  margin-left: 20px;
}
.container-div {
  padding: 40px 0;
  text-align: center;
}
.container-footer {
  padding: 30px;
}
.contai-num {
  color: #0d86ff;
  font-size: 28px;
}
.contai-text {
  color: #999999;
  font-size: 14px;
  margin-top: 12px;
}
.xian {
  border-right: 1px solid #eee;
}
.footer-num {
  font-weight: bold;
  font-size: 18px;
}
.bianji {
  color: #999999;
  font-size: 12px;
  margin-left: 10px;
  font-weight: initial;
}
.footer-text {
  width: 350px;
  font-size: 14px;
  color: #282828;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}
</style>
