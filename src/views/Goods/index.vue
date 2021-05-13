<template>
  <div class="table_box">
    <!-- 商品搜索 -->
    <div class="input_box">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="changeInput"
      ></el-input>
      <el-button type="primary">{{ $t("Goods.query") }}</el-button>
      <el-button type="primary" @click="addGoods">{{ $t("Goods.add") }}</el-button>
    </div>
    <!-- 商品列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="selectChange"
      :row-style="{ height: '45px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="id"
        label="商品ID"
        show-overflow-tooltip
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        show-overflow-tooltip
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        show-overflow-tooltip
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        show-overflow-tooltip
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="category"
        label="规格类目"
        show-overflow-tooltip
        width="120"
      >
      </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >{{ $t("Goods.edit") }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >{{ $t("Goods.delete") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量删除-------取消全选 -->
    <div style="margin-top: 10px; margin-left: 25px">
      <el-button @click="batchDel">{{ $t("Goods.BatchDelete") }}</el-button>
      <el-button @click="toggleSelection()">{{ $t("Goods.Deselect") }}</el-button>
    </div>
    <!-- 分页器 -->
    <div class="Pagination">
      <Pagination
        @currentChange="currentChange"
        :total="total"
        :pageSize="pageSize"
      />
    </div>
    <!-- 商品添加 -->
    <GoodsDialog ref="goodsDialog" :rowDate='rowDate' :title='title'/>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import GoodsDialog from "./GoodsDialog";
export default {
  data() {
    return {
      tableData: [],
      total: 10,
      pageSize: 8,
      input: "",
      idArr: [],
      rowDate:{},
      title:'',
      page:''
    };
  },
  components: {
    Pagination,
    GoodsDialog,
  },
  created() {
    this.http(1);
  },
  methods: {
    /**
     * 搜索
     */
    changeInput(val) {
      if (val) {
        this.$api
          .getSearchList({ search: val })
          .then((res) => {
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.total = res.data.result.length;
              this.pageSize = 8;
            } else {
              this.tableData = [];
              this.total = 8;
              this.pageSize = 8;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.http(1);
      }
    },
    /**
     * 分页切换
     */
    currentChange(e) {
      this.http(e);
      this.page=e
    },
    /**
     * 添加商品
     */
    addGoods() {
      this.$refs.goodsDialog.dialogVisible = true;
      this.title='添加商品'
    },
    /**
     * 修改商品
     */
    handleEdit(index, row) {
      this.$refs.goodsDialog.dialogVisible = true;
      this.title='修改商品'
      this.rowDate=Object.assign({},row)
    },
    /**
     * 删除商品
     */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getDeleteItemById({
              id: row.id,
            })
            .then((res) => {
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
    /**
     * 批量删除
     */
    batchDel() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.idArr.length === 0) {
            this.$message.error("选择你要删除的商品");
          } else {
            this.$api
              .getBatchDelete({
                idArr: this.idArr,
              })
              .then((res) => {
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
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 获取选择框信息
     */
    selectChange(val) {
      let arr = [];
      val.forEach((ele) => {
        arr.push(ele.id);
      });
      this.idArr = arr;
    },
    /**
     * 取消全选
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 数据请求分装
     */
    http(page) {
      this.$api
        .getProjectList({ page })
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less">
.table_box {
  .el-table {
    padding: 0 10px;
  }
  .Pagination {
    position: fixed;
    bottom: 0;
    left: 43%;
  }
  .input_box {
    display: flex;
    padding: 15px;
    background-color: #fff;
    button {
      margin-left: 10px;
    }
  }
}
</style>