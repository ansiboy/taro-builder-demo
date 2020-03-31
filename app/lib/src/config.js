"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = {
    receiptEdit: "/modules/user/receipt-edit",
    receiptList: "/modules/user/receipt-list",
    userIndex: "/modules/user/index",
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
let host = "192.168.1.102:2858";
exports.config = {
    shopUrl: `http://${host}/UserShop/`,
    stockUrl: `http://${host}/UserStock/`,
    pageSize: 15,
};
//# sourceMappingURL=config.js.map