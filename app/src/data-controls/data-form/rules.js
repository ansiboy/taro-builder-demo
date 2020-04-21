"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = {
    required(msg) {
        let obj = {
            type: "required",
            validate(value) {
                return (value || "") != "";
            },
            error: msg,
        };
        return obj;
    },
    mobile(msg) {
        let mobileRegex = /^1[34578]\d{9}$/;
        let obj = {
            type: "mobile",
            validate(value) {
                return mobileRegex.test(value);
            },
            error: msg,
        };
        return obj;
    }
};
