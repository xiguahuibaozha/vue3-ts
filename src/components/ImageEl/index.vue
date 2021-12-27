<template>
  <div class="image-el">
    <el-image
      fit="fill"
      :src="getUrl(src) || ('https://acg.yanwz.cn/menhera/api.php?t='+new Date().getTime())"
      :preview-src-list="previewList.map((item:any) => {
        return getUrl(item)
      })"
      :initial-index="initialIndex"
      lazy
    >
      <template #placeholder>
        <div class="image-slot">
          <el-icon><Loading /></el-icon>
        </div>
      </template>
      <template #error>
        <div class="image-slot">
          <el-icon><PictureFilled /></el-icon>
        </div>
      </template>
    </el-image>
  </div>
</template>

<script lang="ts" setup>
import { getUrl } from "@/util/utils"

defineProps({
  src: {
    type: String,
    default: "",
  },
  previewList: {
    type: Array,
    default() {
      return [];
    },
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

</script>

<style lang="scss" scoped>
.image-el {
  cursor: pointer;
  :deep(.el-image) {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid $BORDERHUI;
    border-radius: 5px;

    .image-slot {
      font-size: 10px;
      height: 100%;
      color: $FONTHUI;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>
