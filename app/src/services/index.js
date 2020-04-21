"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shopping_service_1 = require("./shopping-service");
const taro_1 = require("@tarojs/taro");
var shopping_service_2 = require("./shopping-service");
exports.ShoppingService = shopping_service_2.ShoppingService;
exports.services = {
    shopping: new shopping_service_1.ShoppingService((error) => errorHandle(error))
};
function errorHandle(error) {
    let msg = error.message || error.Message;
    taro_1.default.showModal({
        title: "错误",
        content: `${msg}`,
        confirmText: "确认",
        cancelText: "取消"
    });
}
