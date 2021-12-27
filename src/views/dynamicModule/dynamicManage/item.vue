<template>
  <div class="item">
    <div class="item-head">
      <HeadImage
        style="width: 40px; height: 40px"
        :avatarFrame="item.avatarFrame"
        :headImage="item.head"
      ></HeadImage>
      <div class="item-head-right">
        <div class="item-head-right-top">
          <span class="name">{{ item.nickName }}</span>
          <span class="btn" style="background-color: #24272f">
            <element-dianzan></element-dianzan>
            <span class="btn-txt">{{ item.fabulousNums }}</span>
          </span>
          <span class="btn" style="background-color: #ff8888">
            <element-pinglun></element-pinglun>
            <span class="btn-txt">{{ item.commentNums }}</span>
          </span>
          <div class="operation">
            <!-- <el-popconfirm
              title="确定要禁言这个用户吗？"
              @confirm="btnHandle('userUpdate', item)"
            >
              <template #reference>
                <span>禁言</span>
              </template>
            </el-popconfirm> -->
            <el-popconfirm
              title="确定要删除这个动态吗？"
              @confirm="btnHandle('delete', item)"
            >
              <template #reference>
                <span>删除</span>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <div class="item-head-right-bottom">
          <span class="time">{{ item.createTime }}</span>
          <div class="other">
            <element-jvbao class="icon"></element-jvbao>
            <span>{{ item.reportNums }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item-content">
      <ImageEl style="width: 100px; height: 100px" :src="item.cover"></ImageEl>
      <div class="message">
        {{ item.content }}
      </div>
    </div>
    <div class="detail-btn">
      <span @click="btnHandle('detail', item)">查看详情</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageEl from "@/components/ImageEl/index.vue";
import HeadImage from "@/components/HeadImage/index.vue";

defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
  imageList: {
    // 预览图片列表
    type: Array,
  },
  initialIndex: {
    // 默认展示预览图片下标
    type: Number,
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
  padding: 5px;
  width: 280px;
  background-color: white;
  border: 1px solid $BORDERHUI;

  &-head {
    display: flex;
    margin: 5px;
    margin-bottom: 0px;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid $BORDERHUI;

    &-right {
      width: calc(100% - 50px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-top {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 13px;
          font-weight: 600;
        }
        .btn {
          font-size: 12px;
          color: #ffffff;
          border-radius: 5px;
          padding: 0px 5px;
          display: flex;
          align-items: center;

          &-txt {
            margin-left: 2px;
          }
        }
        .operation {
          display: inline-block;
          font-size: 12px;
          color: $FONTHUI;

          span {
            margin: 0px 3px;
            cursor: pointer;
          }
        }
      }
      &-bottom {
        font-size: 10px;
        color: $FONTHUI;
        display: flex;
        justify-content: space-between;

        .other {
          display: flex;
          align-items: center;
          .icon {
            color: #ff8888;
            margin-right: 2px;
            font-size: 12px;
          }
        }
      }
    }
  }

  &-content {
    padding: 10px 5px;
    display: flex;
    border-bottom: 1px solid $BORDERHUI;
    .message {
      width: calc(100% - 100px);
      font-size: 12px;
      color: $FONTHUI;
      padding-left: 10px;
      line-height: 17px;

      @include ellipsis(6);
    }
  }

  .detail-btn {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    padding: 5px;

    span {
      display: inline-block;
      border: 1px solid $BORDERHUI;
      width: 80%;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
