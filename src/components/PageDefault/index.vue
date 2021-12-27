<template>
  <div ref="header" class="header">
    <slot name="form"></slot>
  </div>
  <div class="content">
    <el-scrollbar height="100%" class="table-box">
        <slot name="table"></slot>
    </el-scrollbar>

    <div class="pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const header = ref<Element>();

const headerHight = ref<string>();

onMounted(() => {
  headerHight.value = header.value?.clientHeight + "px";
  window.addEventListener("resize", () => {
    headerHight.value = header.value?.clientHeight + "px";
  });
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: calc(90vh - v-bind(headerHight));
  flex-direction: column;
  padding-top: 10px;
  box-sizing: border-box;
  // border: 1px solid $BORDERHUI;

  .table-box {
    border-bottom: 1px solid $BORDERHUI;
  }

  .pagination {
    padding: 8px;
  }
}
</style>
