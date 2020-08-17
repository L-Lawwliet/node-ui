<template>
  <div>
    <div>
      <el-input v-model="keyword" size="small" clearable style="width:300px;" @keyup.enter="query"></el-input>
      <el-button size="small" type="primary" @click="query">查询</el-button>
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
    <div class="mt10 table_wrapper">
      <el-table v-loading="loading" :data="tableData" border stripe size="mini">
        <!-- <el-table-column prop="id" label="id"></el-table-column> -->
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column label="简介">
          <template slot-scope="scope">
            <div class="ellipsis2" :title="scope.row.synopsis">{{scope.row.synopsis}}</div>
          </template>
        </el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img v-if="scope.row.coverImg" :src="scope.row.coverImg" alt="" height="100"> -->
            <el-image style="height: 100px" v-if="scope.row.coverImg" :src="scope.row.coverImg" :preview-src-list="[scope.row.coverImg]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="上映日期" width="90"></el-table-column>
        <el-table-column label="是否完结" width="80">
          <template slot-scope="scope">
            {{scope.row.isEnd?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加/修改 -->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :title="isEdit?'修改':'添加'" width="500px">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-form-item label="名称">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.synopsis" clearable rows="5"></el-input>
        </el-form-item>
        <el-form-item label="上映日期">
          <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否完结">
          <el-checkbox v-model="form.isEnd" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="封面图地址">
          <el-input v-model="form.coverImg" clearable></el-input>
        </el-form-item>
        <el-form-item label=" " v-if="form.coverImg">
          <img :src="form.coverImg" alt="" width="300" height="300">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '../api/api';

export default {
  data() {
    return {
      loading: false,
      keyword: '',
      tableData: [],
      dialogVisible: false,
      isEdit: false,
      form: {
        name: '',
        synopsis: '',
        createDate: '',
        isEnd: 0,
        coverImg: '',
      },
      id: '',
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.loading = true;
      const params = {
        keyword: this.keyword
      };
      api.select(params).then((res) => {
          this.loading = false;
          if (res.data.status === 200) {
            this.tableData = res.data.data;
          } else {
            this.tableData = [];
          }
        })
        .catch((err) => {
          this.tableData = [];
          this.loading = false;
        });
    },
    add() {
      this.isEdit = false;
      this.dialogVisible = true;
      this.form = {
        name: '',
        synopsis: '',
        createDate: '',
        isEnd: 0,
        coverImg: '',
      };
    },
    edit(e) {
      this.isEdit = true;
      this.dialogVisible = true;
      this.form = {
        name: e.name,
        synopsis: e.synopsis,
        createDate: e.createDate,
        isEnd: e.isEnd,
        coverImg: e.coverImg,
      };
      this.id = e.id;
    },
    confirm() {
      if (this.isEdit) {
        const params = {
          id: this.id,
          name: this.form.name,
          synopsis: this.form.synopsis,
          createDate: this.form.createDate,
          isEnd: this.form.isEnd,
          coverImg: this.form.coverImg,
        };
        api.update(params).then((res) => {
          if (res.data.status === 200) {
            this.dialogVisible = false;
            this.$message.success('修改成功');
            this.query();
          }
        });
      } else {
        api.add(this.form).then((res) => {
          if (res.data.status === 200) {
            this.dialogVisible = false;
            this.$message.success('添加成功');
            this.query();
          }
        });
      }
    },
    del(id) {
      const params = {
        id,
      };
      api.delete(params).then((res) => {
        if (res.data.status === 200) {
          this.$message.success('删除成功');
          this.query();
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
</style>
