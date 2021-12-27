<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="商品名称">
          <el-input v-model="filterForm.keyword" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select
            v-model="filterForm.typeId"
            filterable
            remote
            reserve-keyword
            placeholder="商品类型"
            :remote-method="remoteMethod"
            :loading="goodsTypeloading"
          >
            <el-option
              v-for="item in goodsTypeOptions"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { goodsPage, goodsDelete, goodsState } from "@/api/goodsModule/goods";
import TableItem from "./item.vue";
import PageDefault from "@/components/PageDefault/index.vue";
import { useRouter } from "vue-router";
import { goodsTypeList } from "@/api/goodsModule/type";

export default defineComponent({
  components: {
    TableItem,
    PageDefault,
  },
  setup() {
    const router = useRouter();

    const defaultFormData: PageParams = {
      pageSize: 12,
      currentPage: 1,
      keyword: null,
      typeId: null
    };

    const filterForm = ref<PageParams>({ ...defaultFormData });

    const total = ref(0);

    const tableData = ref<Obj[]>([]);

    const getList = () => {
      goodsPage(filterForm.value).then(({ data }) => {
        total.value = data.total;
        tableData.value = data.data;
      });
    };

    getList();

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

    const runToEdit = (query?: Obj) => {
      router.push({ path: "/goodsEdit", query });
    };

    const btnHandle = (name: string, val: number, goods: any) => {
      if (name == "edit") {
        runToEdit({ id: val });
      } else if (name == "delete") {
        goodsDelete(val).then(() => {
          getList();
        });
      } else if (name == "state") {
        goodsState(goods.id, val).then(() => {
          getList();
        });
      }
    };

    // 获取商品类型
    const goodsTypeloading = ref(false);
    const goodsTypeOptions = ref<Obj>([])

    const remoteMethod = async (keyword:string) => {
      goodsTypeloading.value = true
      await goodsTypeList({keyword}).then(({data}) => {
        goodsTypeOptions.value = data
      })
      goodsTypeloading.value = false
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
      btnHandle,
      goodsTypeloading,
      goodsTypeOptions,
      remoteMethod
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-wrap: wrap;
}
</style>
