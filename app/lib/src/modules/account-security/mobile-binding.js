"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const react_1 = __importDefault(require("react"));
class MobileBindingPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, { className: "page" },
            react_1.default.createElement(taro_ui_1.AtForm, { className: "container" },
                react_1.default.createElement(taro_ui_1.AtInput, { name: "mobile", title: "\u624B\u673A\u53F7\u7801", placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", onChange: e => { } }),
                react_1.default.createElement(taro_ui_1.AtInput, { name: "mobile", title: "\u9A8C\u8BC1\u7801", placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801", onChange: e => { } },
                    react_1.default.createElement(components_1.Text, null, "\u53D1\u9001\u9A8C\u8BC1\u7801"))),
            react_1.default.createElement(components_1.View, { className: "footer" },
                react_1.default.createElement(taro_ui_1.AtForm, { className: "container" },
                    react_1.default.createElement(taro_ui_1.AtButton, { type: "primary" }, "\u7ACB\u5373\u8BBE\u7F6E"))));
    }
}
exports.default = MobileBindingPage;
//# sourceMappingURL=mobile-binding.js.map