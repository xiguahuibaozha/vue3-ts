<template>
  <div class="item">
    <div class="key-data">
      <span>订单号：{{item.ordersNumber}}</span>
      <span>购买时间：{{item.createTime}}</span>
    </div>
    <div class="item-content">
      <ImageEl class="item-content-image"></ImageEl>
      <div class="item-content-msg">
        <span class="title">商品名称</span>
        <div class="content">
          <span>购买数量：{{item.buyNums}}</span>
          <span>商品价格：￥{{item.goodsPrice}}</span>
          <span>提货方式：配送</span>
          <span>配送费用：￥88/月 x 3</span>
          <span>订单金额：￥600</span>
          <span>购买人：张三</span>
          <span>收货人：李四</span>
          <span>联系方式：15200369874</span>
          <span>收货地址：湖南省长沙市雨花区香樟东路圭塘街道中南家园西区</span>
          <span>状态：待发货</span>
        </div>
        <div class="btns">
          <span @click="btnHandle('send',item)">发货</span>
          <span>取消</span>
          <span @click="btnHandle('detail',item)">详情</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageEl from "@/components/ImageEl/index.vue";

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
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  font-size: 12px;
  color: $FONTHUI;

  .key-data {
    font-size: 12px;

    span{
        display: inline-block;
        margin-right: 30px;
    }
  }

  &-content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    &-image {
      width: 100px;
      height: 100px;
    }

    &-msg {
      width: calc(100% - 100px);
      padding-left: 15px;
      box-sizing: border-box;

      .title {
        color: $FONTHEI;
        font-weight: bold;
        font-size: 14px;
      }

      .content {
        span {
          display: inline-block;
          margin-right: 25px;
          margin-top: 8px;
        }
      }

      .btns {
        display: flex;
        margin-top: 10px;
        span {
          display: inline-block;
          font-size: 12px;
          padding: 2px 10px;
          border: 1px solid $BORDERHUI;
          border-radius: 2px;
          cursor: pointer;
          margin-right: 10px;
          background-color: $DISEHUI;
        }
      }
    }
  }
}
</style>
