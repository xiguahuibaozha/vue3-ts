<template>
  <el-form :inline="true" :model="formFilter" size="mini">
    <el-form-item label="订单号">
      <el-input v-model="formFilter.orderNo" placeholder="订单号"></el-input>
    </el-form-item>
    <!-- <el-form-item label="商品编号">
      <el-input v-model="formFilter.goodsCode" placeholder="商品编号"></el-input>
    </el-form-item>
    <el-form-item label="商品名称">
      <el-input v-model="formFilter.goodsName" placeholder="商品名称"></el-input>
    </el-form-item> -->
    <el-form-item label="购买人编号">
      <el-input v-model="formFilter.userId" placeholder="购买人编号"></el-input>
    </el-form-item>
    <el-form-item label="购买人姓名">
      <el-input v-model="formFilter.buyRealName" placeholder="购买人姓名"></el-input>
    </el-form-item>
    <el-form-item label="购买人电话">
      <el-input v-model="formFilter.buyPhone" placeholder="购买人电话"></el-input>
    </el-form-item>
    <el-form-item label="购买人身份账号">
      <el-input v-model="formFilter.buyCardId" placeholder="购买人身份账号"></el-input>
    </el-form-item>
    <!-- <el-form-item label="购买时间">
      <el-date-picker
          v-model="formFilter.buyTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="购买时间"
      >
      </el-date-picker>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <el-button @click="runToClick" type="primary">新增</el-button>

  <el-table :data="tableData" style="margin-top: 10px;">
    <el-table-column label="订单号" prop="orderNo" />
    <el-table-column label="商品编号" prop="goodsCode" />
    <el-table-column label="商品名称" prop="goodsName" />
    <el-table-column label="购买人编号" prop="userId" />
    <el-table-column label="购买人姓名" prop="buyRealName" />
    <el-table-column label="购买人电话" prop="buyPhone" />
    <el-table-column label="购买人身份账号" prop="buyCardId" />
    <el-table-column label="购买时间" prop="buyTime" />
    <el-table-column
      label="操作"
      width="200">
      <template #default="props">
        <el-popconfirm title="Are you sure to delete this?" @confirm="deleteBtn(props.row.id)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:currentPage="formFilter.currentPage"
    :page-sizes="[1, 10, 20, 50]"
    :page-size="formFilter.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="margin-top: 20px;"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { page, deleteOrder } from "@/api/order"
import { useRouter } from "vue-router";

const { push } = useRouter()

// 查询表单
const defauleForm:PageParams = {
  pageSize: 10,
  currentPage: 1,
  orderNo: null,
  userId: null,
  buyRealName: null,
  buyPhone: null,
  buyCardId: null,
  goodsCode: null,
  goodsName: null,
  buyTime: null,
}
const formFilter = ref({...defauleForm});


const submit = () => {
  getPage()
};

const reset = () => {
  formFilter.value = { ...defauleForm }
  getPage()
};

// 表格
const tableData = ref<any[]>([])

// 总条数
const total = ref(0)

const getPage = () => {
  page(formFilter.value).then(({data}:any) => {
    tableData.value = data.data
    total.value = data.total
  })
}

getPage()

// 分页
const handleSizeChange = (size:number) => {
  formFilter.value.pageSize = size
  formFilter.value.currentPage = 1
  getPage()
}

const handleCurrentChange = () => {
  getPage()
}

// 跳转
const runToClick = () => {
  push("/orderEdit")
}

// 删除
const deleteBtn = (id: number) => {
  deleteOrder(id).then(() => {
    getPage()
  })
}
</script>

<style lang="scss" scoped>
  .text{
    font-size: 12px;
  }
</style>
