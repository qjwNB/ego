<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品类目" prop="category">
        <el-button type="primary" @click="innerVisible = true"
          >选择类目</el-button
        ><span class="Category">{{ ruleForm.category }}</span>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="innerVisibleImg = true" class="upBtn"
          >上传图片</el-button
        >
        <img :src="ruleForm.image" alt="" class="image" v-if="ruleForm.image" />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <GoodsEditor @changeEditor="changeEditor" ref="editor" />
      </el-form-item>
    </el-form>
    <!-- 内部弹框  类目选择-->
    <el-dialog
      width="40%"
      title="选择类目"
      :visible.sync="innerVisible"
      append-to-body
    >
      <SelectCategory @getCategory="getCategory" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 内部弹框   图片上传 -->
    <el-dialog
      width="40%"
      title="选择类目"
      :visible.sync="innerVisibleImg"
      append-to-body
    >
      <UpdataImg @upadataImg="upadataImg" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisibleImg = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectCategory from "./SelectCategory";
import UpdataImg from "./UpdataImg";
import GoodsEditor from "./GoodsEditor";
export default {
  components: {
    SelectCategory,
    UpdataImg,
    GoodsEditor,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      innerVisibleImg: false,
      ruleForm: {
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        category: "",
        image: "",
        desc: "",
        cid: "",
        id: "",
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
    };
  },
  props: {
    rowDate: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: {
      type: String,
      default: "添加商品",
    },
  },
  watch: {
    rowDate(val) {
      this.$nextTick(() => {
        this.ruleForm = val;
        this.ruleForm.desc = val.descs;
        this.$refs.editor.editor.txt.html(this.ruleForm.desc);
      });
    },
  },
  methods: {
    /**
     * 选择类目
     */
    getCategory(val) {
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },
    /**
     * 图片回显
     */
    upadataImg(val) {
      this.ruleForm.image = val;
    },
    /**
     * 获取编辑器内容
     */
    changeEditor(val) {
      this.ruleForm.desc = val;
    },
    /**
     * 添加商品按钮
     */
    submitHandle() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let {
            title,
            image,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            id,
          } = this.ruleForm;
          if (this.title === "添加商品") {
            this.$api
              .getInsertTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
              })
              .then((res) => {
                if (res.data.status === 200) {
                  // 提示成功消息
                  this.$message({
                    message: "商品添加成功",
                    type: "success",
                  });
                  //清空操作
                  this.resetForm("ruleForm");
                  //刷新视图
                  this.$parent.http(1);
                } else {
                  this.$message.error("商品添加失败");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$api
              .getUpdateTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
                id,
              })
              .then((res) => {
                if (res.data.status === 200) {
                  // 提示成功消息
                  this.$message({
                    message: "商品修改成功",
                    type: "success",
                  });
                  //清空操作
                  this.resetForm("ruleForm");
                  //刷新视图
                  this.$parent.http(1);
                } else {
                  this.$message.error("商品修改失败");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 添加商品取消按钮
     */
    resetForm(formName) {
      // 隐藏弹框
      this.dialogVisible = false;
      // 清空表单内容
      this.$refs[formName].resetFields();
      //清空编辑器
      this.$refs.editor.editor.txt.clear();
    },
    handleClose() {
      this.resetForm("ruleForm");
    },
  },
};
</script>

<style lang="less" scoped>
.Category {
  margin-left: 10px;
}
.upBtn {
  display: block;
}
.image {
  margin-top: 10px;
  width: 130px;
  height: 130px;
}
</style>