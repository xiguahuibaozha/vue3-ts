type Contants = {
    [name:string]: {
        [name:number]: string
    }
}

const contants: Contants = {
    orderState: {
        1: "待付款",
        2: "等待审核",
        3: "已完成",
        4: "退款中",
        5: "已关闭"
    },
    payWay: {
        1: "微信",
        2: "支付宝"
    }
}

export default contants