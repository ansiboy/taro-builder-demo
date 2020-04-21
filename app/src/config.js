"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = {
    receiptEdit: "/modules/user/receipt-edit",
    receiptList: "/modules/user/receipt-list",
    userIndex: "/modules/user/index",
    couponList: "/modules/user/coupon-list",
    index: "/modules/index",
    accountSecurity: "/modules/account-security/index",
    mobileBindding: "/modules/account-security/mobile-binding",
    payPassword: "/modules/account-security/pay-password",
    loginPassword: "/modules/account-security/login-password",
    salesCenter: "/modules/sales-center/index",
    orderList: "/modules/shopping/order-list"
};
exports.style = {
    emptyIconSize: 150
};
let host = "shop6.bailunmei.com"; //"192.168.1.102:2858"
exports.config = {
    shopUrl: `https://${host}/UserShop/`,
    stockUrl: `https://${host}/UserStock/`,
    pageSize: 15,
};
