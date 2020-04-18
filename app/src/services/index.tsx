import { ShoppingService } from "./shopping-service";
import Taro from "@tarojs/taro";

export { ShoppingService } from "./shopping-service";

export let services = {
    shopping: new ShoppingService((error) => errorHandle(error))
}

function errorHandle(error: any) {
    let msg = error.message || error.Message;
    Taro.showModal({
        title: "错误",
        content: `${msg}`,
        confirmText: "确认",
        cancelText: "取消"
    })
}