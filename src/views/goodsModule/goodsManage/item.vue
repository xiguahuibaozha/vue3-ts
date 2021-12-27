<template>
  <div class="item">
    <ImageEl
      style="width: 70px;height:70px;"
      :src="getGoodsFileImage()"
      :previewList="[]"
      :initialIndex="0"
    ></ImageEl>

    <div class="item-center">
      <div class="name">
        {{ item.goodsName }}
      </div>
      <div class="price">￥{{ item.goodsPrice }}</div>
      <div class="num">
        <span>库存 {{ item.goodsStock }}</span>
        <span>已售 {{ item.goodsSold }}</span>
      </div>
    </div>

    <div class="item-right">
      <div class="btns">
        <span v-if="item.state == 0" @click="btnHandle('state', 1, item)">上架</span>
        <span v-else @click="btnHandle('state', 0, item)">下架</span>

        <span @click="btnHandle('edit', item.id, item)">编辑</span>

        <el-popconfirm
          title="确定要删除这件商品吗？"
          @confirm="btnHandle('delete', item.id, item)"
        >
          <template #reference>
            <span>删除</span>
          </template>
        </el-popconfirm>
      </div>
      <span class="status">{{ goodsConstant.goodsState[item.state] }}</span>
      <span class="time">{{ item.updateTime }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { goodsConstant } from "@/util/constant";
import ImageEl from "@/components/ImageEl/index.vue";
import { JSONParse } from "@/util/utils";
import { useStore } from "vuex"

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  }
});

const { state } = useStore();
const imgUrl = state.settings.imgUrl;

// 获取商品首图
const getGoodsFileImage = () => {
  const file = JSONParse(props.item.goodsFile)
  if(file.images){
    return imgUrl + "/" + file.images
  }else {
    return ""
  }
}

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
  width: 380px;
  background-color: white;
  border: 1px solid $BORDERHUI;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-center {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .name {
      font-size: 13px;
      color: $FONTHEI;
      font-weight: bold;
    }
    .price {
      font-size: 12px;
      color: $FONTHUI;
    }
    .num {
      font-size: 12px;
      color: $FONTHUI;
      display: flex;
      justify-content: space-between;
    }
  }

  &-right {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;

    .btns {
      display: flex;
      justify-content: flex-end;
      span {
        display: inline-block;
        font-size: 12px;
        padding: 2px 10px;
        border: 1px solid $BORDERHUI;
        border-radius: 2px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .time {
      font-size: 12px;
      color: $FONTHUI;
    }
    .status {
      font-size: 12px;
      color: #e44990;
      font-weight: normal;
      margin-left: 8px;
    }
  }
}
</style>
