<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="base.baseUrl + base.uploadImg"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="updataSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      fileList: [],
      base,
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    updataSuccess(response) {
      let imgUrl = this.base.baseUrl + "/" + response.url.slice(7);
      this.$emit("upadataImg", imgUrl);
      this.fileList = [];
    },
  },
};
</script>

<style lang="less" scoped>
</style>