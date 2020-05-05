
import { AtList, AtListItem, AtButton } from 'taro-ui';

import { dataSources } from '../../services/data-sources';
import React from 'react';
import { Repeater, RepeaterItem } from '../../data-controls';
import { View, Switch, Text } from '@tarojs/components';
import Taro from "@tarojs/taro";
import { pages } from '../../config';
import { ReceiptInfo } from '../../models/models';

interface Props {

}

interface State {
    selectedIds: string[],
}

export default class ReceiptListPage extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = { selectedIds: [] };
    }

    isSelected(id: string) {
        let selectedIds = this.state.selectedIds;
        return selectedIds.indexOf(id) >= 0;
    }

    private detail(item: ReceiptInfo) {
        var result = `${item.ProvinceName} ${item.CityName} ${item.CountyName} ${item.Address}`;

        result = result + ` 联系人: ${item.Consignee}`;
        if (item.Phone != null || item.Mobile != null)
            result = result + ` 电话：${item.Phone || ''} ${item.Mobile || ''}`;

        return result;
    }

    componentDidMount() {
    }

    render() {
        return <AtList>
            <Repeater dataSource={dataSources.receiptInfo}>
                <RepeaterItem.Consumer>
                    {args => {
                        let dataItem = args.dataItem as ReceiptInfo;
                        return <React.Fragment>
                            <AtListItem key={dataItem.Id} title={dataItem.Name} arrow="right"
                                note={this.detail(dataItem)}
                                onClick={() => Taro.navigateTo({ url: `${pages.receiptEdit}?id=${dataItem.Id}` })}>
                            </AtListItem>
                            <View style={{ padding: "10px 10px 10px 10px" }}>
                                <View style={{ float: "left" }} >
                                    <Switch /><Text style={{ paddingLeft: 6 }}>设为默认</Text>
                                </View>
                                <AtButton size="small" full={false} type={"secondary"} customStyle={{ width: "50px", float: "right" }}>
                                    <Text>删除</Text>
                                </AtButton>
                                <AtButton size="small" full={false} type={"secondary"} customStyle={{ width: "50px", float: "right", marginRight: "8px" }}
                                    onClick={() => Taro.navigateTo({ url: `${pages.receiptEdit}?id=${dataItem.Id}` })}>
                                    <Text>编辑</Text>
                                </AtButton>
                                <View style={{ clear: "both" }}>

                                </View>
                            </View>
                            {args.index < args.count - 1 ? <View style={{ backgroundColor: "#eeeeee", width: "100%", height: "8px" }} ></View> : null}
                        </React.Fragment>
                    }}
                </RepeaterItem.Consumer>
            </Repeater>
        </AtList>
    }
}
ReceiptListPage.contextType = RepeaterItem;
