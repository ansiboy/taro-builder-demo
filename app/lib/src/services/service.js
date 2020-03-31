"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const maishu_chitu_service_1 = require("maishu-chitu-service");
class MyService extends maishu_chitu_service_1.Service {
    ajax(url, options) {
        let self = this;
        let headers = options.headers || {};
        headers["application-id"] = "7bbfa36c-8115-47ad-8d47-9e52b58e7efd";
        // headers["user-id"] = "0080eb05-6c24-4d2c-89c0-00c7483a47f9";
        headers["token"] = "889df906-40ba-dcaa-dd83-40a41fee6d8d";
        return new Promise((resolve, reject) => {
            taro_1.default.request({
                url, data: options.data,
                method: options.method || "GET",
                header: options.headers,
                fail(err) {
                    reject(err);
                },
                success(obj) {
                    let textObject;
                    let isJSONContextType = (obj.header['content-type'] || '').indexOf('json') >= 0;
                    if (isJSONContextType) {
                        textObject = typeof obj.data == "string" ? JSON.parse(obj.data) : (obj.data || {});
                    }
                    else {
                        textObject = obj.data;
                    }
                    const CustomError = 400;
                    if (obj.statusCode >= CustomError) {
                        reject(obj);
                        self.error.fire(self, textObject);
                        return;
                    }
                    resolve(obj.data);
                }
            });
        });
    }
}
exports.MyService = MyService;
function imageUrl(path, width, height) {
    // let imageService = new ImageService();
    // return imageService.imageSource(path, width, height);
    return path;
}
exports.imageUrl = imageUrl;
exports.config = {};
//# sourceMappingURL=service.js.map