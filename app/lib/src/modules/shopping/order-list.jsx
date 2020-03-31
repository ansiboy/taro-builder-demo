"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const taro_ui_1 = require("taro-ui");
const empty_1 = require("../../controls/empty");
class OrderListPage extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.config = {
            navigationBarTitleText: "我的订单"
        };
        this.state = { current: 0 };
    }
    switchTab(index) {
        this.setState({ current: index });
    }
    componentDidMount() {
        console.log(this.$router.params);
        let tab = this.$router.params["tab"];
        // this.setState({ tab })
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
        return <taro_ui_1.AtTabs current={current} tabList={[{ title: "全部" }, { title: "待付款" }, { title: "待收货" },
            { title: "待评价" }]} onClick={e => this.switchTab(e)}>
            <taro_ui_1.AtTabsPane current={current} index={0}>
                <empty_1.Empty icon="money" text="暂无此类订单"/>
            </taro_ui_1.AtTabsPane>
            <taro_ui_1.AtTabsPane current={current} index={1}>
                <empty_1.Empty icon="money" text="暂无此类订单"/>
            </taro_ui_1.AtTabsPane>
            <taro_ui_1.AtTabsPane current={current} index={2}>
                <empty_1.Empty icon="money" text="暂无此类订单"/>
            </taro_ui_1.AtTabsPane>
            <taro_ui_1.AtTabsPane current={current} index={3}>
                <empty_1.Empty icon="money" text="暂无此类订单"/>
            </taro_ui_1.AtTabsPane>
        </taro_ui_1.AtTabs>;
    }
}
exports.default = OrderListPage;
//# sourceMappingURL=order-list.jsx.map