<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    // 生成编辑器
    this.editor = new E("#main");
    // 获取编辑器内容
    this.editor.config.onchange = (newHtml) => {
      this.$emit("changeEditor", newHtml);
    };
    //配置菜单
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "link",
      "list",
      "justify",
      "emoticon",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor.create();
  },
};
</script>

<style lang="less" scoped>
</style>