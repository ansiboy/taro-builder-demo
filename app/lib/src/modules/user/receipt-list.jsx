"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
require("./receipt-list.less");
const taro_ui_1 = require("taro-ui");
const events_1 = require("../../events");
const data_sources_1 = require("../../services/data-sources");
const loading_1 = require("../../controls/loading");
const receipt_list_items_1 = require("./receipt-list-items");
const dataListId = "0bf48482-5d13-fa63-36fd-8f507a45b225";
console.log(dataListId);
class ReceiptListPage extends taro_1.default.Component {
    constructor(props) {
        super(props);
        // static contextType = ShoppingLoadingContext;
        this.config = {
            navigationBarTitleText: '收货地址'
        };
        this.state = { selectedIds: [] };
        events_1.events.receiptInfoSave.add(() => {
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
        });
    }
    detail(item) {
        var result = `${item.ProvinceName} ${item.CityName} ${item.CountyName} ${item.Address}`;
        result = result + ` 联系人: ${item.Consignee}`;
        if (item.Phone != null || item.Mobile != null)
            result = result + ` 电话：${item.Phone || ''} ${item.Mobile || ''}`;
        return result;
    }
    isSelected(id) {
        let selectedIds = this.state.selectedIds;
        return selectedIds.indexOf(id) >= 0;
    }
    outputItem() {
        // return <AtListItem key={dataItem.Id} iconInfo={{ value: "check-circle", size: 18 }}
        //     title={dataItem.Name} note={this.detail(dataItem)} />
    }
    componentDidMount() {
        // services.shopping.receiptInfos().then(r => {
        //     this.setState({ items: r });
        // })
        // this.dataList.init(() => services.shopping.receiptInfos(), this.renderItem);
    }
    render() {
        let { selectedIds } = this.state;
        return <components_1.View>
            <loading_1.Loading loadData={() => data_sources_1.dataSources.receiptInfo.select()}>
                <receipt_list_items_1.ReceiptListItems />
            </loading_1.Loading>
            

            <components_1.View className="footer">
                <taro_ui_1.AtForm className="container">
                    <taro_ui_1.AtButton type="primary" onClick={() => taro_1.default.navigateTo({ url: "./receipt-edit" })}>添加新的收货地址</taro_ui_1.AtButton>
                </taro_ui_1.AtForm>
            </components_1.View>
        </components_1.View>;
    }
}
exports.default = ReceiptListPage;
//# sourceMappingURL=receipt-list.jsx.map