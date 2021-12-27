<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="提货方式">
          <el-select v-model="filterForm.takeGoodsMode" placeholder="请选择" clearable>
            <el-option
              v-for="item in Object.keys(goodsConstant.takeGoodsMode)"
              :key="item"
              :label="goodsConstant.takeGoodsMode[item]"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="filterForm.ordersState" placeholder="请选择" clearable>
            <el-option
              v-for="item in Object.keys(orderConstant.state)"
              :key="item"
              :label="orderConstant.state[item]"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买时间">
          <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="searchTimeChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #table>
      <table-item
        v-for="item in tableData"
        :key="item.id"
        :item="item"
        @handle="btnHandle"
      ></table-item>
    </template>

    <template #pagination>
      <el-pagination
        v-model:currentPage="filterForm.currentPage"
        :page-size="filterForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[1, 12, 20, 30]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
  </page-default>
</template>

<script lang="ts" setup>
import PageDefault from "@/components/PageDefault/index.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TableItem from "./item.vue";
import { goodsConstant, orderConstant } from "@/util/constant";
import { orderPage } from "@/api/orderModule/order";

const router = useRouter();

const defaultFormData: PageParams = {
  pageSize: 5,
  currentPage: 1,
  takeGoodsMode: null,
  endTime: null,
  startTime: null,
  ordersState: null,
};

const filterForm = ref({ ...defaultFormData });
const total = ref<number>(0);

const tableData = ref<Obj[]>([]);

// 查询时间
const searchTime = ref<string[]>([]);
const searchTimeChange = () => {
  if (searchTime.value && searchTime.value.length > 0) {
    filterForm.value.startTime = searchTime.value[0];
    filterForm.value.endTime = searchTime.value[1];
  }
};

const onSubmit = () => {
  filterForm.value.pageSize = defaultFormData.pageSize;
  filterForm.value.currentPage = 1;
  getList();
};

const reset = () => {
  filterForm.value = { ...defaultFormData };
  getList();
};

const handleSizeChange = (size: number) => {
  filterForm.value.pageSize = size;
  filterForm.value.currentPage = 1;
  getList();
};

const handleCurrentChange = () => {
  getList();
};

const getList = () => {
  orderPage(filterForm.value).then(({ data }) => {
    total.value = data.total;
    tableData.value = data.data;
  });
};
getList();

const btnHandle = (name: string, val: Obj) => {
  if (name == "detail") {
    router.push({
      path: "/orderDetail",
      query: {
        id: val.id,
      },
    });
  }
};
</script>
<style lang="scss" scoped></style>
