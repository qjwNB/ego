<template>
  <el-pagination
    background
    layout="total,prev, pager, next,jumper"
    :total="total"
    :page-size="pageSize"
    @current-change="changeHandle"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: [Number, String],
      default: 2,
    },
    pageSize: {
      type: [Number, String],
      default: 5,
    },
  },
  methods: {
    changeHandle(e) {
      this.$emit("currentChange", e);
    },
  },
};
</script>

<style lang="less" scoped>
</style>