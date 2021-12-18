<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="手机号">
          <el-input
            v-model="filterForm.phone"
            type="number"
            placeholder="手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册来源">
          <el-select v-model="filterForm.registerType" placeholder="注册来源">
            <el-option label="小程序" :value="0"></el-option>
            <el-option label="安卓" :value="1"></el-option>
            <el-option label="IOS" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-select v-model="filterForm.status" placeholder="是否禁用">
            <el-option label="正常" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #table>
      <div class="table">
        <table-item v-for="i in 10" :key="i"></table-item>
      </div>
    </template>

    <template #pagination>
      <el-pagination
        v-model:currentPage="filterForm.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
    </el-pagination>
    </template>
  </page-default>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { userPage } from "@/api/userModule/user";
import TableItem from "./item.vue";
import PageDefault from "@/components/PageDefault/index.vue";

export default defineComponent({
  components: {
    TableItem,
    PageDefault,
  },
  setup() {
    const filterForm = ref({
      pageSize: 5,
      currentPage: 1,
      phone: null,
      registerType: null,
      status: null,
    });

    const total = ref(0);

    const tableData = ref<Obj[]>([]);

    const onSubmit = () => {
      userPage(filterForm.value).then(({ data }) => {
        total.value = data.total;
        tableData.value = data.data;
      });
    };

    const handleSizeChange = (size:number) => {
      console.log(size)
    }
    const handleCurrentChange = (current:number) => {
      console.log(current)
    }

    return {
      filterForm,
      total,
      tableData,
      onSubmit,
      handleSizeChange,
      handleCurrentChange
    };
  },
});
</script>

<style lang="scss" scoped>
.table{
  display: flex;
  flex-wrap: wrap;
}
</style>