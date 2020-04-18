"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../data-controls/index");
const taro_ui_1 = require("taro-ui");
const react_1 = __importDefault(require("react"));
class UserCouponPage extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { current: 0 };
    }
    switchTab(index) {
        this.setState({ current: index });
    }
    render() {
        let current = this.state.current;
        return react_1.default.createElement(taro_ui_1.AtTabs, { current: current, tabList: [{ title: "未使用" }, { title: "已使用" }, { title: "已过期" }], onClick: e => this.switchTab(e) },
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 0 },
                react_1.default.createElement(index_1.Empty, { icon: "money", text: "\u6682\u65E0\u672A\u4F7F\u7528\u4F18\u60E0\u5238" })),
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 1 },
                react_1.default.createElement(index_1.Empty, { icon: "money", text: "\u6682\u65E0\u5DF2\u4F7F\u7528\u4F18\u60E0\u5238" })),
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 2 },
                react_1.default.createElement(index_1.Empty, { icon: "money", text: "\u6682\u65E0\u5DF2\u8FC7\u671F\u4F18\u60E0\u5238" })));
    }
}
exports.default = UserCouponPage;
//# sourceMappingURL=coupon-list.js.map