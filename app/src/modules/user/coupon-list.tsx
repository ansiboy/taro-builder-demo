import { Empty } from "../../data-controls/index";
import { AtTabs, AtTabsPane } from "taro-ui";
import React from "react";

interface State {
    current: number
}

export default class UserCouponPage extends React.Component<{}, State> {
    constructor(props) {
        super(props)

        this.state = { current: 0 }
    }
    switchTab(index: number) {
        this.setState({ current: index })
    }
    render() {
        let current = this.state.current;
        return <AtTabs current={current}
            tabList={[{ title: "未使用" }, { title: "已使用" }, { title: "已过期" }]}
            onClick={e => this.switchTab(e)}>
            <AtTabsPane current={current} index={0}>
                <Empty icon="money" text="暂无未使用优惠券" />
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
                <Empty icon="money" text="暂无已使用优惠券" />
            </AtTabsPane>
            <AtTabsPane current={current} index={2}>
                <Empty icon="money" text="暂无已过期优惠券" />
            </AtTabsPane>
        </AtTabs>
    }
}