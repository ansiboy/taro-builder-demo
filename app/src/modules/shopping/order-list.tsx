import { AtTabs, AtTabsPane } from "taro-ui";
import { Empty } from "../../data-controls/empty";
import React from "react";
import { parseUrl } from "maishu-toolkit";

interface State {
    current: number,
}

type Tab = "all" | "toPaid" | "toReceive" | "toEvaluate";

interface Props {
    tid: string;
}

export default class OrderListPage extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = { current: 0 };
    }
    switchTab(index: number) {
        this.setState({ current: index });
    }
    componentDidMount() {
        let params = parseUrl(this.props.tid);
        let tab = params.tab as Tab;
        let current: number;
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
        return <AtTabs current={current}
            tabList={[{ title: "全部" }, { title: "待付款" }, { title: "待收货" },
            { title: "待评价" }]}
            onClick={e => this.switchTab(e)}>
            <AtTabsPane current={current} index={0}>
                <Empty icon="money" text="暂无此类订单" />
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
                <Empty icon="money" text="暂无此类订单" />
            </AtTabsPane>
            <AtTabsPane current={current} index={2}>
                <Empty icon="money" text="暂无此类订单" />
            </AtTabsPane>
            <AtTabsPane current={current} index={3}>
                <Empty icon="money" text="暂无此类订单" />
            </AtTabsPane>
        </AtTabs>
    }
}