
import { AtList, AtListItem, AtButton } from 'taro-ui';

import { events } from '../../events';
import { dataSources } from '../../services/data-sources';
import React from 'react';
import { DataList, DataListContext } from '../../data-controls';
import { View, Switch, Text } from '@tarojs/components';
import Taro from "@tarojs/taro";
import { pages } from '../../config';

interface Props {

}

interface State {
    // items: ReceiptInfo[] | null,
    selectedIds: string[],
}

// const dataListId = "0bf48482-5d13-fa63-36fd-8f507a45b225";
// console.log(dataListId);
export default class ReceiptListPage extends React.Component<Props, State> {

    // static contextType = ShoppingLoadingContext;



    // loading: ShoppingLoading<ReceiptInfo[]>;
    // dataList: DataList<ReceiptInfo>;

    constructor(props) {
        super(props);

        this.state = { selectedIds: [] };
        events.receiptInfoSave.add(() => {
            // let items = this.loading.state.data || [];
            // let existsItem = items.filter(o => o.Id == args.item.Id)[0];
            // debugger
            // if (existsItem) {
            //     Object.assign(existsItem, args.item);
            // }
            // else {
            //     items.push(args.item);
            // }
            // this.loading.setState({ data: items });
        })
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
        // services.shopping.receiptInfos().then(r => {
        //     this.setState({ items: r });
        // })
        // this.dataList.init(() => services.shopping.receiptInfos(), this.renderItem);
    }

    render() {
        return <AtList>
            <DataList dataSource={dataSources.receiptInfo}>
                <DataListContext.Consumer>
                    {args => {
                        let dataItem = args.dataItem as ReceiptInfo;
                        return <React.Fragment>
                            <AtListItem key={dataItem.Id} title={dataItem.Name} arrow="right"
                                note={this.detail(dataItem)}
                                onClick={e => Taro.navigateTo({ url: `${pages.receiptEdit}?id=${dataItem.Id}` })}>
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
                </DataListContext.Consumer>
            </DataList>
        </AtList>
    }
}
ReceiptListPage.contextType = DataListContext;
