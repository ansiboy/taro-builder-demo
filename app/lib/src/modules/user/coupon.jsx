"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const empty_1 = require("../../controls/empty");
const taro_ui_1 = require("taro-ui");
class UserCouponPage extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.config = {
            navigationBarTitleText: '我的优惠券'
        };
        this.state = { current: 0 };
    }
    switchTab(index) {
        this.setState({ current: index });
    }
    render() {
        let current = this.state.current;
        return <taro_ui_1.AtTabs current={current} tabList={[{ title: "未使用" }, { title: "已使用" }, { title: "已过期" }]} onClick={e => this.switchTab(e)}>
            <taro_ui_1.AtTabsPane current={current} index={0}>
                <empty_1.Empty icon="money" text="暂无未使用优惠券"/>
            </taro_ui_1.AtTabsPane>
            <taro_ui_1.AtTabsPane current={current} index={1}>
                <empty_1.Empty icon="money" text="暂无已使用优惠券"/>
            </taro_ui_1.AtTabsPane>
            <taro_ui_1.AtTabsPane current={current} index={2}>
                <empty_1.Empty icon="money" text="暂无已过期优惠券"/>
            </taro_ui_1.AtTabsPane>
        </taro_ui_1.AtTabs>;
    }
}
exports.default = UserCouponPage;
//# sourceMappingURL=coupon.jsx.map