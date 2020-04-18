"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const empty_1 = require("../../data-controls/empty");
const react_1 = __importDefault(require("react"));
const maishu_toolkit_1 = require("maishu-toolkit");
class OrderListPage extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { current: 0 };
    }
    switchTab(index) {
        this.setState({ current: index });
    }
    componentDidMount() {
        let params = maishu_toolkit_1.parseUrl(this.props.tid);
        let tab = params.tab;
        let current;
        switch (tab) {
            case "toPaid":
                current = 1;
                break;
            case "toReceive":
                current = 2;
                break;
            case "toEvaluate":
                current = 3;
                break;
            default:
                current = 0;
                break;
        }
        this.setState({ current });
    }
    render() {
        let current = this.state.current;
        return react_1.default.createElement(taro_ui_1.AtTabs, { current: current, tabList: [{ title: "全部" }, { title: "待付款" }, { title: "待收货" },
                { title: "待评价" }], onClick: e => this.switchTab(e) },
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 0 },
                react_1.default.createElement(empty_1.Empty, { icon: "money", text: "\u6682\u65E0\u6B64\u7C7B\u8BA2\u5355" })),
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 1 },
                react_1.default.createElement(empty_1.Empty, { icon: "money", text: "\u6682\u65E0\u6B64\u7C7B\u8BA2\u5355" })),
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 2 },
                react_1.default.createElement(empty_1.Empty, { icon: "money", text: "\u6682\u65E0\u6B64\u7C7B\u8BA2\u5355" })),
            react_1.default.createElement(taro_ui_1.AtTabsPane, { current: current, index: 3 },
                react_1.default.createElement(empty_1.Empty, { icon: "money", text: "\u6682\u65E0\u6B64\u7C7B\u8BA2\u5355" })));
    }
}
exports.default = OrderListPage;
//# sourceMappingURL=order-list.js.map