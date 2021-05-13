<template>
  <div class="table">
    <!-- 参数搜索 -->
    <div class="input_box">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="changeInput"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!-- 参数列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-style="{ height: '42px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column
        prop="id"
        label="规格参数Id"
        show-overflow-tooltip
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="itemCatId"
        label="类目ID"
        show-overflow-tooltip
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="specsName"
        label="规格名称"
        show-overflow-tooltip
        width="150"
      >
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="Pagination">
      <Pagination
        @currentChange="currentChange"
        :total="total"
        :pageSize="pageSize"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tableData: [],
      input: "",
      total: 10,
      pageSize: 10,
      page:'',
    };
  },
  created() {
    this.http(1);
  },
  methods: {
    //搜索参数
    changeInput(val) {
      console.log(val);
      if (val) {
        this.$api
          .getParamsSearch({
            search: val,
          })
          .then((res) => {
            if (res.data.status === 200) {
              console.log(res.data);
              this.tableData = res.data.result;
              this.total = res.data.result.length;
              this.pageSize = 10;
            } else {
              this.total = 10;
              this.pageSize = 10;
              this.tableData = [];
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.http(1);
      }
    },
    //分页器
    currentChange(val) {
      this.http(val);
      this.page=val
    },
    //编辑参数
    handleEdit(index,row) {},
    //删除参数
    handleDelete(index,row) {
          console.log(row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getParamsDelete({
              id: row.id,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                this.http(this.page);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // http请求封装
    http(page) {
      this.$api
        .getItemParam({
          page,
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  padding: 0 10px;
}
.input_box {
  display: flex;
  padding: 15px;
  background-color: #fff;
  button {
    margin-left: 10px;
  }
}
.Pagination {
  position: fixed;
  bottom: 0;
  left: 43%;
}
</style>