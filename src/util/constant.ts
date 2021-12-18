type Constant = {
    [name:string]:{
        [name:number]:any,
        [name:string]:any
    },
}

export const userConstant:Constant = {
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
}

export const goodsConstant:Constant = {
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
}