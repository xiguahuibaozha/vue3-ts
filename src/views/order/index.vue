<template>
  <el-form :inline="true" :model="formFilter" size="mini">
    <el-form-item label="订单号">
      <el-input v-model="formFilter.orderNo" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="商品名">
      <el-input v-model="formFilter.goodsName" placeholder="商品名"></el-input>
    </el-form-item>
    <el-form-item label="购买人姓名">
      <el-input v-model="formFilter.buyRealName" placeholder="购买人姓名"></el-input>
    </el-form-item>
    <el-form-item label="购买人手机号">
      <el-input v-model="formFilter.buyPhone" placeholder="购买人手机号"></el-input>
    </el-form-item>
    <el-form-item label="推荐人姓名">
      <el-input v-model="formFilter.refereeRealName" placeholder="购买人姓名"></el-input>
    </el-form-item>
    <el-form-item label="推荐人手机号">
      <el-input v-model="formFilter.refereePhone" placeholder="购买人手机号"></el-input>
    </el-form-item>
    <el-form-item label="支付方式">
      <el-select v-model="formFilter.payMode" placeholder="支付方式" clearable>
        <el-option v-for="item in Object.keys(payWay)" :key="item" :label="payWay[Number(item)]" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单状态">
      <el-select v-model="formFilter.orderStatus" placeholder="订单状态" clearable>
        <el-option v-for="item in Object.keys(orderState)" :key="item" :label="orderState[Number(item)]" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下单时间">
      <el-date-picker
        v-model="dateTime"
        @change="dateTimeChange"
        type="datetimerange"
        value-format="YYYY-MM-DD HH:mm:ss"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <el-button type="text" size="mini" @click="exportOrder">导出报表</el-button>
  <div>
    <span class="text">支付宝余额：【账户余额：{{ALBalance.totalAmount}}，账户可用余额：{{ALBalance.availableAmount}}，冻结金额：{{ALBalance.freezeAmount}}】</span>
    <!-- <br /><span class="text">微信余额：【微信账户余额：{{ALBalance.totalAmount}}，账户可用余额：{{ALBalance.availableAmount}}，冻结金额：{{ALBalance.freezeAmount}}】</span> -->
    <el-button type="text" size="mini" @click="getBalance">刷新余额</el-button>
  </div>

  <el-table :data="tableData" style="margin-top: 10px;">
    <el-table-column label="订单号" prop="orderNo" width="250" />
    <el-table-column label="商品名称" prop="goodsName" width="80"/>
    <el-table-column label="规格" prop="goodsSpeName" width="200"/>
    <el-table-column label="购买数量" prop="goodsNum" width="80"/>
    <el-table-column label="单价 ￥" prop="goodsPrice" width="80"/>
    <el-table-column label="订单总价 ￥" prop="totalPrice" width="100"/>
    <el-table-column label="购买人" prop="buyRealName" width="80"/>
    <el-table-column label="购买人手机号" prop="buyPhone" width="120"/>
    <el-table-column label="购买人身份证" prop="buyCardId" width="180"/>
    <el-table-column label="推荐人" prop="refereeRealName" width="80"/>
    <el-table-column label="推荐人手机号" prop="refereePhone" width="120"/>
    <el-table-column label="支付方式" width="80">
      <template #default="props">
        {{payWay[props.row.payMode]}}
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="100">
      <template #default="props">
        {{orderState[props.row.orderStatus]}}
      </template>
    </el-table-column>
    <el-table-column label="下单时间" prop="createTime" width="140"/>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template #default="props">
        <div v-if="props.row.orderStatus == 2">
          <el-button type="success" size="mini" @click="updateOrdertatus(props.row.id, 3)">审核通过</el-button>
          <el-button type="danger" size="mini" @click="updateOrdertatus(props.row.id, 4)">审核失败</el-button>
        </div>
        <div v-else>暂无操作</div>
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
import constants from "@/util/contants"
import { page, updateStatus, report, getALBalance } from "@/api/order"

// 枚举
const { payWay, orderState } = constants

// 查询表单
const defauleForm:PageParams = {
  pageSize: 10,
  currentPage: 1,
  orderNo: null,
  buyRealName: null,
  startTime: null,
  endTime: null,
  buyPhone: null,
  goodsName: null,
  payMode: null,
  orderStatus: null,
  refereeRealName: null,
  refereePhone: null
}
const formFilter = ref({...defauleForm});

// 下单时间
const dateTime = ref([]);

// 下单时间变化
const dateTimeChange = (dateTimes:string[]) => {
  formFilter.value.startTime = (dateTimes??[])[0]
  formFilter.value.endTime = (dateTimes??[])[1]
}

const submit = () => {
  getPage()
};

const reset = () => {
  formFilter.value = { ...defauleForm }
  dateTime.value = []
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

// 修改状态
const updateOrdertatus = (id: number, orderStatus: number) => {
  updateStatus({id,orderStatus}).then(() => {
    getPage()
  })
}

// 导出报表
const exportOrder = () => {
  report(formFilter.value).then(({data}) => {
    const href = URL.createObjectURL(data)
    let downloadElement:any = document.createElement("a");
    downloadElement.download = "订单列表.xlsx"
    downloadElement.href = href
    downloadElement.click()
    downloadElement = null
  })
}

// 商户信息dialog
const ALBalance = ref<any>({})
const getBalance = () => {
  getALBalance().then(({data}) => {
    ALBalance.value = data
  })
}
getBalance()
</script>

<style lang="scss" scoped>
  .text{
    font-size: 12px;
  }
</style>
