<template>
  <div class="lfn-table">
    <div class="lfn-table-wrapper">
      <el-table v-loading="loading" ref="table" :data="tableData" border height="100%" @selection-change="handleSelectionChange">
        <el-table-column v-for="(item, index) in headColumns" :key="index" :prop="item.prop" :label="item.label" :align="item.align?item.align:'center'">
          <template slot-scope="scope"><span>{{ scope.row[item.prop] || '-' }}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="lfn-table-pagination">
      <el-pagination :current-page="page.index" :page-sizes="[10, 20, 50, 100]" :page-size="page.size" :total="page.total" layout="total, prev, pager, next, sizes, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lfn-tables',
  props: {
    headColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => ({
        index: 1,
        size: 10,
        total: 0
      })
    },
    multipleSelection: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    fetchData() {
      // const params = {
      //   start: this.page.index,
      //   length: this.page.size,
      // };
      // this.loading = true;
      // api[this.url](params).then((res) => {
      //   this.loading = false;
      //   if (res.data.returnCode === 0) {
      //     this.tableData = res.data.data;
      //     this.page.total = res.data.total;
      //     this.tableHeight = this.$refs.table
      //       ? window.innerHeight - this.$refs.table.$el.offsetTop - 110
      //       : this.tableHeight;
      //   } else {
      //     // this.tableData = [];
      //     this.$message.info(res.data.returnMessage || '请求失败');
      //   }
      // });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.page.index = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.page.index = 1;
      this.fetchData();
    },
  }
};
</script>
<style lang="less" scoped>
  
</style>
