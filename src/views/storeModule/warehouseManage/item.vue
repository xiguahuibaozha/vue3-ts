<template>
    <div class="item">
        <div class="item-top">
            <div class="item-top-left">
                <div class="title">仓库编号：{{item.warehouseNo}}</div>
                <div class="phone">{{item.phone}}</div>
            </div>
            <div class="item-top-right">
                <span class="btn" @click="btnHandle('edit',item.id,item)">编辑</span>
                <el-popconfirm title="确定要删除这个门店吗？" @confirm="btnHandle('delete',item.id,item)">
                    <template #reference>
                        <span class="btn">删除</span>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="item-bottom">
            <div class="item-bottom-tag">
                <el-tag v-if="item.status == 1">正常</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
            </div>
            {{item.province}}{{item.city}}{{item.area}}{{item.detailedAddress}}
        </div>
        <div class="item-remark">
            描述：{{item.remark}}
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    item: {
        type: Object,
        default(){
            return {}
        }
    }
})

// 默认按钮点击事件
const emit = defineEmits(['handle'])

const btnHandle = (name:string, value:any, item:any) => {
    emit('handle',name,value,item)
}
</script>

<style lang="scss" scoped>
    .item{
        margin-right: 10px;
        margin-top: 10px;
        width: 300px;
        background-color: white;
        border: 1px solid $BORDERHUI;
        padding: 0px 10px;

        &-top{
            border-radius: 3px;
            padding: 8px 0px;
            border-bottom: 1px solid $BORDERHUI;
            display: flex;
            justify-content: space-between;


            &-left{
                width: 70%;
                .title{
                    font-size: 13px;
                    font-weight: 600;
                }
                .phone{
                    font-size: 12px;
                    color: $FONTHUI;
                    margin-top: 8px;
                }
            }

            &-right{
                width: 30%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .btn{
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    padding: 0px 8px;
                    border-radius: 3px;
                    background-color: #F4F0EF;
                    border: 1px solid $BORDERHUI;
                    cursor: pointer;
                }
            }
        }

        &-bottom{
            padding: 5px 0px;
            font-size: 12px;
            color: $FONTHUI;
            border-bottom: 1px dashed $BORDERHUI;

            &-tag{
                margin: 5px 0px;
            }
        }

        &-remark{
            padding: 5px 0px;
            font-size: 12px;
            color: $FONTHUI;
        }
    }
</style>