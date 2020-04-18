"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const taro_1 = __importDefault(require("@tarojs/taro"));
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
require("./index.scss");
const config_1 = require("../../config");
const IconSize = 52;
class default_1 extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, null,
            react_1.default.createElement(components_1.View, { className: "user-info" },
                react_1.default.createElement(components_1.View, { className: "at-row at-row__justify--center" },
                    react_1.default.createElement(taro_ui_1.AtAvatar, { className: "header-image", size: "normal", circle: true, image: "" })),
                react_1.default.createElement(components_1.View, { className: "text" }, "\u672A\u586B\u5199"),
                react_1.default.createElement(components_1.View, { className: "blance" },
                    react_1.default.createElement(components_1.Text, null, "\u4F59\u989D"),
                    react_1.default.createElement(components_1.Text, { className: "price" }, "\uFFE50.00"))),
            react_1.default.createElement(components_1.View, { className: "at-row" },
                react_1.default.createElement(components_1.View, { className: "at-col", onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=all`, }) },
                    react_1.default.createElement(taro_ui_1.AtIcon, { className: "icon", value: "bullet-list", size: IconSize }),
                    react_1.default.createElement(components_1.View, { className: "text" }, "\u5168\u90E8\u8BA2\u5355")),
                react_1.default.createElement(components_1.View, { className: "at-col", onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toPaid`, }) },
                    react_1.default.createElement(taro_ui_1.AtIcon, { className: "icon", value: "credit-card", size: IconSize }),
                    react_1.default.createElement(components_1.View, { className: "text" }, "\u5F85\u4ED8\u6B3E")),
                react_1.default.createElement(components_1.View, { className: "at-col", onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toReceive`, }) },
                    react_1.default.createElement(taro_ui_1.AtIcon, { className: "icon", value: "folder", size: IconSize }),
                    react_1.default.createElement(components_1.View, { className: "text" }, "\u5F85\u6536\u8D27")),
                react_1.default.createElement(components_1.View, { className: "at-col", onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.orderList}?tab=toEvaluate`, }) },
                    react_1.default.createElement(taro_ui_1.AtIcon, { className: "icon", value: "star", size: IconSize }),
                    react_1.default.createElement(components_1.View, { className: "text" }, "\u5F85\u8BC4\u4EF7"))),
            react_1.default.createElement(components_1.View, { className: "list-group" },
                react_1.default.createElement(taro_ui_1.AtList, null,
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u6536\u8D27\u5730\u5740', arrow: 'right', onClick: () => {
                            taro_1.default.navigateTo({ url: config_1.pages.receiptList });
                        } }),
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u6211\u7684\u6536\u85CF', arrow: 'right', onClick: () => taro_1.default.navigateTo({ url: "./favor" }) }),
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u6211\u7684\u4F18\u60E0\u5238', arrow: 'right', hasBorder: false, onClick: () => taro_1.default.navigateTo({ url: config_1.pages.couponList }) }))),
            react_1.default.createElement(components_1.View, { className: "list-group" },
                react_1.default.createElement(taro_ui_1.AtList, null,
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u9500\u552E\u5458\u4E2D\u5FC3', arrow: 'right', hasBorder: false, onClick: () => taro_1.default.navigateTo({ url: config_1.pages.salesCenter }) }))),
            react_1.default.createElement(components_1.View, { className: "list-group" },
                react_1.default.createElement(taro_ui_1.AtList, null,
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u8D26\u53F7\u5B89\u5168', arrow: 'right', onClick: () => taro_1.default.navigateTo({ url: config_1.pages.accountSecurity }) }),
                    react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: '\u9000\u51FA', arrow: 'right', hasBorder: false }))));
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map