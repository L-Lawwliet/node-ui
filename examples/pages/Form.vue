<template>
  <div>
    <p>tables</p>
    <lfn-tables :head-columns="commissionColumns"/>
    <el-button @click="fetchData">登录</el-button>
  </div>
</template>
<script>
export default {
  name: 'Form',  
  computed: {
    commissionColumns() {
      return [
        { prop: 'id', label: 'ID' },
        { prop: 'amount', label: '金额(元)' },
        { prop: 'type', label: '类型' },
        { prop: 'createTime', label: '时间' },
        { prop: 'status', label: '状态' }
      ];
    },
  },
  created() {
    
  },
  methods: {
    fetchData() {
      const params = {
        grant_type: 'password',
        username: '18682077880',
        password: '18682077880',
        sope: 'all',
        client_id: 'MARKET_MERCHANTS',
        client_secret: '123456',
        accountNo: '100092',
      };
      this.$http.post(`auth-server/oauth/token`, params);
    }
  }
};
</script>
<style lang="less">
  
</style>
