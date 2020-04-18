"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const config_1 = require("../../config");
const react_1 = __importDefault(require("react"));
class AccountSecurityPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, null,
            react_1.default.createElement(taro_ui_1.AtList, { className: "list-group" },
                react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: "\u767B\u5F55\u5BC6\u7801", arrow: "right", note: "\u8BBE\u7F6E\u767B\u5F55\u5BC6\u7801\uFF0C\u53EF\u4EE5\u4F7F\u7528\u624B\u673A\u548C\u5BC6\u7801\u767B\u5F55", onClick: () => taro_1.default.navigateTo({ url: config_1.pages.loginPassword }) }),
                react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: "\u624B\u673A\u7ED1\u5B9A", arrow: "right", note: "\u7ED1\u5B9A\u624B\u673A\u540E\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u624B\u673A\u627E\u56DE\u5BC6\u7801", onClick: () => taro_1.default.navigateTo({ url: config_1.pages.mobileBindding }) }),
                react_1.default.createElement(taro_ui_1.AtListItem, { className: "list-group-item", title: "\u652F\u4ED8\u5BC6\u7801", arrow: "right", note: "\u8BBE\u7F6E\u652F\u4ED8\u5BC6\u7801\u540E\uFF0C\u4F7F\u7528\u4F59\u989D\u652F\u4ED8\u9700\u8981\u5BC6\u7801", onClick: () => taro_1.default.navigateTo({ url: config_1.pages.payPassword }) })));
    }
}
exports.default = AccountSecurityPage;
//# sourceMappingURL=index.js.map