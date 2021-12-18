<template>
  <div class="item">
    <div class="item-head">
      <el-image
        fit="cover"
        :src="'https://api.yimian.xyz/img?type=moe&time=' + new Date().getTime()"
        lazy
      >
        <template #placeholder>
          <div class="image-slot"></div>
        </template>
      </el-image>
      <div class="item-head-right">
        <div class="item-head-right-top">
          <span class="name">西瓜会爆炸</span>
          <span class="btn" style="background-color: #24272f">
            <element-dianzan></element-dianzan>
            <span class="btn-txt">340</span>
          </span>
          <span class="btn" style="background-color: #ff8888">
            <element-pinglun></element-pinglun>
            <span class="btn-txt">40</span>
          </span>
          <div class="operation">
            <span>禁言</span>
            <span>删除</span>
          </div>
        </div>
        <div class="item-head-right-bottom">
          <span class="time">2015/7/8 12:12:12</span>
          <div class="other">
            <element-jvbao class="icon"></element-jvbao>
            <span>63</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item-content">
      <el-image
        fit="cover"
        :src="'https://api.yimian.xyz/img?type=moe&time=' + new Date().getTime()"
        lazy
      >
        <template #placeholder>
          <div class="image-slot"></div>
        </template>
      </el-image>

      <div class="message">
        阿里巴巴矢量图标库是一款收集了几万个图标的软件，
        您可以在图标库中搜索需要使用的图标类型，阿里巴巴矢量图标库包含了几十种分类，
        点击任意一个分类即可查看里面的图标，需要注意的是图标不需要下载，找到您要使用的图标后，
        直接将其拖动到PS中就可以编辑，非常方便。
      </div>
    </div>
    <div class="detail-btn">
      <span>查看详情</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
    },
    imageList: {
      // 预览图片列表
      type: Array,
    },
    initialIndex: {
      // 默认展示预览图片下标
      type: Number,
    },
  },
});
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

    :deep(.el-image) {
      position: relative;
      width: 40px;
      height: 40px;
      border: 2px solid $BORDERHUI;
      border-radius: 3px;

      .image-slot {
        font-size: 10px;
        height: 100%;
        color: $FONTHUI;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }

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

    :deep(.el-image) {
      position: relative;
      width: 100px;
      height: 100px;
      border: 2px solid $BORDERHUI;
      border-radius: 3px;

      .image-slot {
        font-size: 10px;
        height: 100%;
        color: $FONTHUI;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }

    .message {
        width: calc(100% - 100px);
        font-size: 12px;
        color: $FONTHUI;
        padding: 0px 5px;
        line-height: 17px;

        @include ellipsis(6)
    }
  }

  .detail-btn{
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    padding: 5px;

    span{
      display: inline-block;
      border:1px solid $BORDERHUI;
      width: 80%;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
