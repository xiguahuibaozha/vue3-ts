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
        <el-form-item label="头衔">
          <el-input
            v-model="filterForm.userTitleId"
            placeholder="头衔"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #table>
      <table-item
        v-for="(item, i) in tableData"
        :key="item.id"
        :item="item"
        :imageList="
          tableData
            .map((o) => {
              return o.image;
            })
            .filter((o) => {
              return o;
            })
        "
        :initialIndex="i"

        @handle="handleChange"
      ></table-item>
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
import { userPage, userUpdate, userDelete } from "@/api/userModule/user";
import TableItem from "./item.vue";
import PageDefault from "@/components/PageDefault/index.vue";

export default defineComponent({
  components: {
    TableItem,
    PageDefault,
  },
  setup() {
    const defaultFormData:PageParams = {
      pageSize: 5,
      currentPage: 1,
      phone: null,
      registerType: null,
      status: null,
      userTitleId: null
    }

    const filterForm = ref({...defaultFormData});

    const total = ref(0);

    const tableData = ref<Obj[]>([]);

    const getList = () => {
      userPage(filterForm.value).then(({ data }) => {
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
      filterForm.value = defaultFormData
      getList()
    }

    const handleSizeChange = (size:number) => {
      filterForm.value.pageSize = size
      getList()
    }

    const handleCurrentChange = () => {
      getList()
    }

    const handleChange = (name:string,value:any,item:any) => {
      if(name == 'delete'){
        userDelete(item.id).then(() => {
          getList()
        })
      }else{
        const params = {...item}
        params[name] = value
        userUpdate(params).then(() => {
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
      handleChange
    };
  },
});
</script>

<style lang="scss" scoped>
</style>