<template>
  <div class="user-head">
    <ImageEl class="image" :src="headImage"></ImageEl>
    <ImageEl class="image" :src="avatarFrame" :previewList="previewList" :initialIndex="initialIndex"></ImageEl>
  </div>
</template>

<script lang="ts" setup>
import ImageEl from "@/components/ImageEl/index.vue";

defineProps({
  avatarFrame: {
    type: String,
    default: "",
  },
  headImage: String,
  previewList: {
    type: Array,
    default() {
      return [];
    },
  },
  initialIndex: {
    type: Number,
    default: 0,
  }
});
</script>

<style lang="scss" scoped>
.user-head {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  :deep(.el-image) {
    border: 0px;
  }
}
</style>
