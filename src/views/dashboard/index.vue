<template>
  <div class="dashboard">
      <div class="title">{{state.settings.title}}</div>
      <h3>控制台</h3>
      <h4>用户名：{{state.app.userInfo.username}}</h4>

      <el-button type="primary">更新用户信息</el-button>
  </div>

  
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

const { state } = useStore()
</script>

<style lang="scss" scoped>
  .dashboard{
    font-family: "FZNHT";
    font-size: 30px;
  }
</style>