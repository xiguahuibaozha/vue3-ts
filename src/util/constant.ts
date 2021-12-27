import { ref } from "vue"
import { getRictionariesList } from "@/api/systemModule/dictionaries"

type Constant = {
    [name:string]:{
        [name:number]:any,
        [name:string]:any
    },
}

// 用户
export const userConstant = ref<Constant>({
    comment: {
        0: '是',
        1: '否'
    }, 
    founder: {
        0: '是',
        1: '否'
    }, 
    online: {
        0: '离线',
        1: '在线'
    }, 
    originType: {
        0: '小程序',
        1: '安卓',
        2: 'IOS'
    }, 
    sex: {
        0: '未知',
        1: '男',
        2: '女'
    }, 
    status:{
        0: '正常',
        1: '禁用'
    }
})

// 商品
export const goodsConstant = ref<Constant>({
    takeGoodsMode:{
        1: '自提',
        2: '仓储',
        3: '配送',
        4: '快递'
    },
    isFreeShipping: {
        0: '否',
        1: '是'
    },
    goodsState: {
        0: '未上架',
        1: '上架',
        "-1": '售空'
    }
})

// 门店
export const storeConstant = ref<Constant>({
    status: {
        0: "正常",
        1: "禁用"
    }
})

// 仓库
export const warehousConstant = ref<Constant>({
    status: {
        0: "禁用",
        1: "正常"
    }
})

// 动态
export const activityConstant = ref<Constant>({
    state: {
        1: "进行中",
        0: "已终止",
        "-1": "待启用",
        2: "已结束"
    },
    operation: {
        1: "报名",
        2: "链接"
    }
})

// 订单
export const orderConstant = ref<Constant>({
    state: {}
})

// 将对象数组，转为对象 like:  [{id,value}] = {id:value}
const formatConstant = (list:Obj[]) => {
    const formatObj:Obj = {}
    list.forEach(item => {
        formatObj[item.value] = item.name
    })
    return formatObj
}

// 初始化所有字典
export const initConstant = () => {
    // 订单状态
    getRictionariesList({parent:"orders_state"}).then(({data}) => {
        orderConstant.value.state = formatConstant(data)
    })

    // 提货方式
    getRictionariesList({parent:"take_goods_mode"}).then(({data}) => {
        goodsConstant.value.takeGoodsMode = formatConstant(data)
    })
}