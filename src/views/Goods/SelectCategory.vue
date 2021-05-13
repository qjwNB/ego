<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="selectCategory">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    selectCategory(data) {
        this.$emit('getCategory',data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api
          .getItemCategory()
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (node.level >= 1) {
        this.$api
          .getItemCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>