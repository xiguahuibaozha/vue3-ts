<template>
    <div class="item">
        <el-image
            fit="cover"
            :src="item.head??''"
            :preview-src-list="imageList"
            :initial-index="initialIndex"
            lazy
        >
            <template #placeholder>
                <div class="image-slot">Loading...</div>
            </template>
        </el-image>
        <div class="content">
            <span class="title">{{item.nickName}}</span>
            <div class="tag-box">
                <span class="tag">头衔：{{item.userTitleId}}</span>
                <span class="tag">等级：{{item.userLevelId}}</span>
                <span class="tag">性别：{{userConstant.sex[item.sex]}}</span>
                <span class="tag">手机号：{{item.phone}}</span>
                <span class="tag">签名：{{item.sign}}</span>
                <span class="tag">购买物品数：{{item.buyGoodsTotalCount}}</span>
                <span class="tag">消费金额：{{item.consumerPriceTotalCount}}</span>
                <span class="tag">发布动态数：{{item.releaseDynamicTotalCount}}</span>
                <span class="tag">评论数：{{item.releaseCommentTotalCount}}</span>
                <span class="tag">获得点赞数：{{item.getFabulousTotalCount}}</span>
                <span class="tag">注册时间：{{item.registerTime}}</span>
                <span class="tag">来源：{{userConstant.originType[item.originType]}}</span>
                <span class="tag">是否在线：{{userConstant.online[item.isOnline]}}</span>
                <span class="tag">是否禁言：{{userConstant.comment[item.isComment]}}</span>
                <span class="tag">是否联合创始人：{{userConstant.founder[item.isFounder]}}</span>
                <span class="tag">是否禁用：{{userConstant.status[item.status]}}</span>
                <span class="tag">邀请人昵称：{{item.parentNickName}}</span>
                <span class="tag">创建时间：{{item.createTime}}</span>
            </div>
            <div class="btn-box">
                <el-button type="warning" size="mini" v-if="!item.status" @click="btnHandle('status',1,item)">禁用</el-button>
                <el-button type="primary" size="mini" v-else @click="btnHandle('status',0,item)">启用</el-button>

                <el-button type="warning" size="mini" v-if="!item.isComment" @click="btnHandle('isComment',1,item)">禁言</el-button>
                <el-button type="primary" size="mini" v-else @click="btnHandle('isComment',0,item)">取消禁言</el-button>

                <el-button type="danger" size="mini" @click="btnHandle('delete',null,item)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { userConstant} from "@/util/constant"

defineProps({
    item: {
        type: Object,
        default(){
            return {}
        }
    },
    imageList: {// 预览图片列表
        type: Array
    },
    initialIndex: {// 默认展示预览图片下标
        type: Number
    }
})

// 默认按钮点击事件
const emit = defineEmits(['handle'])

const btnHandle = (name:string,value:any,item:any) => {
    emit('handle',name,value,item)
}
</script>

<style lang="scss" scoped>
    .item{
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-top: 10px;
        background-color: white;
        padding: 8px;
        border-radius: 3px;

        :deep(.el-image){
            position: relative;
            width: 120px;
            border: 1px solid $BORDERHUI;
            border-radius: 5px;

            .image-slot{
                font-size: 10px;
                height: 100%;
                color: $FONTHUI;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        }

        .content{
            box-sizing: content-box;
            width: calc(100% - 140px);
            
            .title{
                color: 24272F;
                font-size: 15px;
                font-weight: bold;
            }

            .tag-box{
                display: flex;
                flex-wrap: wrap;

                .tag{
                    color: #878B97;
                    font-size: 13px;
                    margin-top: 10px;
                    margin-right: 30px;
                }
            }

            .btn-box{
                margin-top: 10px;
            }
        }
    }
</style>