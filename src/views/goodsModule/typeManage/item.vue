<template>
  <div class="item">
    <ImageEl style="width:50px;height:50px" :src="`${imgUrl}/${item.typeIcon}`" :previewList="[]" :initialIndex="0"></ImageEl>

    <div class="item-center">
      <span class="title">{{ item.typeName }}</span>
      <span class="content">已有 {{item.num}} 个商品</span>
    </div>
    <div class="item-right">
      <span @click="btnHandle('edit', item.id, item)">编辑</span>
      <el-popconfirm :title="`这个分类下面有${item.num}个商品,确定要删除这个分类吗？`" @confirm="btnHandle('delete', item.id, item)">
        <template #reference>
          <span>删除</span>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex"
import ImageEl from "@/components/ImageEl/index.vue";

defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});

const { state } = useStore();
const imgUrl = state.settings.imgUrl;

// 默认按钮点击事件
const emit = defineEmits(["handle"]);

const btnHandle = (name: string, value: any, item: any) => {
  emit("handle", name, value, item);
};
</script>

<style lang="scss" scoped>
.item {
  margin-right: 10px;
  margin-top: 10px;
  width: 250px;
  background-color: $BACKGROUNDHUI;
  border: 1px solid $BORDERHUI;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;

  &-center {
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 13px;
      font-weight: bold;
    }
    .content {
      font-size: 12px;
      color: $FONTHUI;
    }
  }

  &-right {
    width: 28%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    span {
      display: inline-block;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 0px 3px;
      border: 1px solid $BORDERHEI;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>
