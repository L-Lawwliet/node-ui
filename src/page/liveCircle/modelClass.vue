<template>
  <div>
    <div class="backfff mb20">
      <div class="container-head flex-B" style="padding: 9px 30px;">
        <span>型号分类列表</span>
        <el-button type="primary" size="medium" @click="addModel">新增型号</el-button>
      </div>
      <div class="container member" style="max-height: 570px;">
        <el-tree :data="data4" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent" ref="multipleTable">
        </el-tree>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      data4: [
        {
          id: 1,
          className: "一级 1",
          children: [
            {
              id: 4,
              className: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          className: "一级 2",
          children: [
            {
              id: 5,
              className: "二级 2-1"
            },
            {
              id: 6,
              className: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          className: "一级 3",
          children: [
            {
              id: 7,
              className: "二级 3-1"
            },
            {
              id: 8,
              className: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "className"
      }
    };
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              size="mini"
              type="primary"
              on-click={() => this.append(data)}
              style={{ display: data.children ? "inline-block" : "none" }}
            >
              添加
            </el-button>
            <el-button size="mini" on-click={() => this.editbutt(node, data)}>
              修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    // 添加型号
    addModel() {
      this.$prompt("请输入型号名称", "添加型号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          this.$message({
            type: "success",
            message: "添加失败"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 删除型号
    remove(e) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加子级型号
    append(e) {
      this.$prompt("请输入型号名称", "添加型号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          this.$message({
            type: "success",
            message: "添加失败"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 修改型号
    editbutt(e) {
      this.$prompt("请输入型号名称", "修改型号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: e.label
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          console.log(value);
          this.$message({
            type: "success",
            message: "添加失败"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  mounted() {}
};
</script>
