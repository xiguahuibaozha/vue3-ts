<template>
  <div class="item">
    <div class="item-left">
      <div>
        <div style="margin-bottom: 5px">创建时间</div>
        {{ item.createTime }}
      </div>
      <ImageEl class="image" :src="item.imagesUrl"></ImageEl>
    </div>
    <div class="item-right">
      <div class="item-right-top">
        <span>{{ activityConstant.state[item.state] }}</span>
        <span>{{ activityConstant.operation[item.operation] }}</span>
        <div>
          <span class="btn" @click="btnHandle('joinNums', item)">注水</span>

          <el-popconfirm
            v-if="item.state == 1 || item.state == -1"
            title="确定要终止这个活动吗？"
            @confirm="btnHandle('over', item)"
          >
            <template #reference>
              <span class="btn">终止</span>
            </template>
          </el-popconfirm>

          <span class="btn" @click="btnHandle('edit', item)">编辑</span>

          <el-popconfirm
            v-if="item.state == 0 || item.state == 2"
            title="确定要删除这个活动吗？"
            @confirm="btnHandle('delete', item)"
          >
            <template #reference>
              <span class="btn">删除</span>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="item-right-content">
        <div class="item-right-content-title">{{ item.activityName }}</div>
        <div>
          开始时间 - 结束时间：{{ item.activityStartTime }} -
          {{ item.activityEndTime }}
        </div>
        <div>
          参与人数（实际+注水=合计）：{{ item.joinNums || 0 }} + {{ item.falseJoinNums || 0 }} =
          {{ (item.joinNums || 0) + (item.falseJoinNums || 0) }}
        </div>
        <div>
          浏览人数（实际+注水=合计）：{{ item.browseNums || 0 }} + {{ item.falseBrowseNums || 0 }} =
          {{ (item.browseNums || 0) + (item.falseBrowseNums || 0) }}
        </div>
        <div>
          <el-button type="text" v-if="item.operation == 1" @click="btnHandle('personList', item)">报名名单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageEl from "@/components/ImageEl/index.vue";
import { activityConstant } from "@/util/constant";

defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});

// 默认按钮点击事件
const emit = defineEmits(["handle"]);

const btnHandle = (name: string, value: any, item?: any) => {
  emit("handle", name, value, item);
};
</script>

<style lang="scss" scoped>
.item {
  margin-right: 10px;
  margin-top: 10px;
  width: 580px;
  background-color: white;
  border: 1px solid $BORDERHUI;
  padding: 10px;
  display: flex;
  color: $FONTHUI;
  justify-content: space-between;

  &-left {
    width: 30%;
    font-size: 13px;
    min-width: 180px;

    .image {
      height: 140px;
      width: 170px;
      margin-top: 10px;
    }
  }

  &-right {
    width: 68%;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 280px;

    &-top {
      height: 10%;
      display: flex;
      justify-content: space-between;
    }
    &-content {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-title {
        font-size: 13px;
        font-weight: bold;
        color: $FONTHEI;
      }
    }
  }
  .btn {
    font-size: 12px;
    padding: 2px 8px;
    background-color: #f4f0ef;
    border: 1px solid $BORDERHUI;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
