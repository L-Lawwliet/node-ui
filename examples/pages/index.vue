<template>
  <div>
    <div>
      <el-input v-model="keyword" size="small" clearable style="width:300px;"></el-input>
      <el-button size="small" type="primary" @click="query">查询</el-button>
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
    <div>
      <el-table v-loading="loading" :data="tableData" border size="mini">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加/修改 -->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :title="isEdit?'修改':'添加'" width="30%">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Http from "../../src/utils/http";

const http = new Http();
export default {
  data() {
    return {
      loading: false,
      keyword: "",
      tableData: [],
      dialogVisible: false,
      isEdit: false,
      form: {
        userName: "",
        age: ""
      },
      id: ""
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.loading = true;
      http.post("/select", { keyword: this.keyword }).then(res => {
        this.loading = false;
        if (res.data.status === 200) {
          this.tableData = res.data.data;
        } else {
          this.tableData = [];
        }
      }).catch(err => {
        this.loading = false;
      });
    },
    search() {},
    add() {
      this.isEdit = false;
      this.dialogVisible = true;
      this.form = {
        userName: "",
        age: ""
      };
    },
    edit(e) {
      this.isEdit = true;
      this.dialogVisible = true;
      this.form = {
        userName: e.userName,
        age: e.age
      };
      this.id = e.id;
    },
    confirm() {
      if (this.isEdit) {
        const params = {
          id: this.id,
          userName: this.form.userName,
          age: this.form.age
        };
        http.post("/update", params).then(res => {
          if (res.data.status === 200) {
            this.dialogVisible = false;
            this.$message.success("修改成功");
            this.query();
          }
        });
      } else {
        http.post("/add", this.form).then(res => {
          if (res.data.status === 200) {
            this.dialogVisible = false;
            this.$message.success("添加成功");
            this.query();
          }
        });
      }
    },
    del(id) {
      const params = {
        id
      };
      http.post("/delete", params).then(res => {
        if (res.data.status === 200) {
          this.$message.success("删除成功");
          this.query();
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
