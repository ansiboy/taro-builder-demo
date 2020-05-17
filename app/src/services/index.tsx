import { ShoppingService } from "./shopping-service";
import Taro from "@tarojs/taro";
import { PageServie } from "./page-service";

export { ShoppingService } from "./shopping-service";

export let services = {
    shopping: new ShoppingService((error) => errorHandle(error)),
    page: new PageServie(error => errorHandle(error))
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