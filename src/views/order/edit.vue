<template>
    <el-form :model="editForm" class="demo-form-inline">
        <el-form-item label="订单编号">
            <el-input v-model="editForm.orderNo" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
            <el-input v-model="editForm.goodsCode" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
            <el-input v-model="editForm.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="购买人编号">
            <el-input v-model="editForm.userId" placeholder="购买人编号"></el-input>
        </el-form-item>
        <el-form-item label="购买人姓名">
            <el-input v-model="editForm.buyRealName" placeholder="购买人姓名"></el-input>
        </el-form-item>
        <el-form-item label="购买人电话">
            <el-input v-model="editForm.buyPhone" placeholder="购买人电话"></el-input>
        </el-form-item>
        <el-form-item label="购买人身份账号">
            <el-input v-model="editForm.buyCardId" placeholder="购买人身份账号"></el-input>
        </el-form-item>
        <el-form-item label="购买时间">
            <el-date-picker
                v-model="editForm.buyTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="购买时间"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { addOrder } from "@/api/order"
import { useRouter } from "vue-router";

const { back } = useRouter()

const editForm = ref({
    buyCardId: null,
    buyPhone: null,
    buyRealName: null,
    buyTime: null,
    goodsCode: null,
    goodsName: null,
    orderNo: null,
    userId: null
})

const onSubmit = () => {
    addOrder(editForm.value).then(() => {
        back()
    })
}
</script>

<style lang="scss" scoped>

</style>