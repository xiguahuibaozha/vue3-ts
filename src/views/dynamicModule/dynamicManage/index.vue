<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="filterTime"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="filterTimeChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
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
        :page-sizes="[1, 8, 15, 20]"
        :page-size="filterForm.pageSize"
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
import { dynamicPage, dynamicDelete } from "@/api/dynamicModule/dynamic";
import { userUpdate } from "@/api/userModule/user";
import TableItem from "./item.vue";
import PageDefault from "@/components/PageDefault/index.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    TableItem,
    PageDefault,
  },
  setup() {
    const route = useRoute();

    const defaultForm = {
      pageSize: 8,
      currentPage: 1,
      userId: Number(route.query.userId),
      startTime: "",
      endTime: "",
    };

    const filterForm = ref({ ...defaultForm });

    const total = ref(0);

    const tableData = ref<Obj[]>([]);

    const getList = () => {
      dynamicPage(filterForm.value).then(({ data }) => {
        total.value = data.total;
        tableData.value = data.data;
      });
    };

    getList();

    const onSubmit = () => {
      filterForm.value.pageSize = defaultForm.pageSize;
      filterForm.value.currentPage = 1;
      getList();
    };

    const reset = () => {
      filterForm.value = { ...defaultForm };
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

    // 创建时间
    const filterTime = ref<Obj>([]);
    const filterTimeChange = (times: string[]) => {
      if (times && times.length > 0) {
        filterForm.value.startTime = times[0];
        filterForm.value.endTime = times[1];
      }
    };

    // item 按钮点击
    const { push } = useRouter();
    const btnHandle = (name: string, item: any) => {
      if (name == "detail") {
        push({ path: "/dynamicDetail", query: { id: item.id } });
      } else if (name == "delete") {
        dynamicDelete(item.id).then(() => {
          getList();
        });
      } else if (name == "userUpdate") {
        userUpdate({ id: item.userId, isComment: 1 })
      }
    };

    return {
      filterForm,
      total,
      reset,
      tableData,
      onSubmit,
      handleSizeChange,
      handleCurrentChange,
      filterTime,
      filterTimeChange,
      btnHandle,
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
