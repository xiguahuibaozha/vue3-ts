<template>
  <div class="detail">
    <el-form ref="form" label-position="top">
      <el-form-item label="订单号">
        <span class="font-small">c2021122018040070916890466</span>
      </el-form-item>
      <div class="inline-box">
        <el-form-item label="订单状态">
          <span class="font-big">待发货</span>
        </el-form-item>
        <el-form-item label="总金额（￥）">
          <span class="font-big">600</span>
        </el-form-item>
      </div>
      <el-form-item label="购买物品" label-position="top">
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.detail {
  .inline-box {
    display: flex;
    width: 50%;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .font-small {
    font-size: 14px;
  }
  .font-big {
    font-size: 18px;
    color: $FONTHUI;
  }
}
</style>
