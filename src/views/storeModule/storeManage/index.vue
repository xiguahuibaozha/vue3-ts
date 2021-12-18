<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="店铺名">
          <el-input
            v-model="filterForm.storeName"
            placeholder="店铺名"
          ></el-input>
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
        :page-sizes="[1, 5, 10, 20]"
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
import { storePage, storeDelete } from "@/api/storeModule/store";
import TableItem from "./item.vue";
import PageDefault from "@/components/PageDefault/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TableItem,
    PageDefault,
  },
  setup() {
    const router = useRouter()

    const defaultFormData:PageParams = {
      pageSize: 5,
      currentPage: 1,
      storeName: null
    }

    const filterForm = ref<PageParams>({...defaultFormData});

    const total = ref(0);

    const tableData = ref<Obj[]>([]);

    const getList = () => {
      storePage(filterForm.value).then(({ data }) => {
        total.value = data.total;
        tableData.value = data.data;
      });
    }

    getList()

    const onSubmit = () => {
      filterForm.value.pageSize = defaultFormData.pageSize
      filterForm.value.currentPage = 1
      getList()
    }

    const reset = () => {
      filterForm.value = {...defaultFormData}
      getList()
    }

    const handleSizeChange = (size:number) => {
      filterForm.value.pageSize = size
      getList()
    }

    const handleCurrentChange = () => {
      getList()
    }

    const runToEdit = (query?:Obj) => {
      router.push({path:'/storeEdit', query})
    }

    const btnHandle = (name:string,val:number) => {
      if(name == 'edit'){
        runToEdit({id:val})
      }else if(name == 'delete'){
        storeDelete(val).then(() => {
          getList()
        })
      }
    }

    return {
      filterForm,
      total,
      tableData,
      onSubmit,
      reset,
      handleSizeChange,
      handleCurrentChange,
      runToEdit,
      btnHandle
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