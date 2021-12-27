<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="关键词">
          <el-input v-model="filterForm.keyword" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="runToEdit()">新增</el-button>
    </template>

    <template #table>
      <div class="table">
        <table-item
          v-for="item in tableData"
          :key="item.id"
          :item="item"
          @handle="btnHandle"
        ></table-item>
      </div>
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
import { goodsTypePage, goodsTypeDelete } from "@/api/goodsModule/type";
import { useRouter } from "vue-router";
import TableItem from "./item.vue";

const router = useRouter();

const defaultFormData: PageParams = {
  pageSize: 12,
  currentPage: 1,
  keyword: null,
};

const filterForm = ref({ ...defaultFormData });
const total = ref<number>(0);

const tableData = ref<Obj[]>([]);

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
  filterForm.value.currentPage = 1
  getList();
};

const handleCurrentChange = () => {
  getList();
};

const getList = () => {
  goodsTypePage(filterForm.value).then(({ data }) => {
    total.value = data.total;
    tableData.value = data.data;
  });
};
getList();

const runToEdit = (query?: Obj) => {
  router.push({ path: "/typeEdit", query });
};

const btnHandle = (name:string,val:number) => {
    if(name == "edit"){
      runToEdit({id:val})
    }else if(name == "delete"){
      goodsTypeDelete(val).then(() => {
        getList();
      })
    }
}
</script>
<style lang="scss" scoped>
.table{
    display: flex;
    flex-wrap: wrap;
}
</style>
