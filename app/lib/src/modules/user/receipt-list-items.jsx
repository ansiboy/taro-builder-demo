"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const loading_1 = require("../../controls/loading");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
class ReceiptListItems extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.checkboxOption = [{
                value: 'list1',
                label: 'iPhone X',
            }];
    }
    detail(item) {
        var result = `${item.ProvinceName} ${item.CityName} ${item.CountyName} ${item.Address}`;
        result = result + ` 联系人: ${item.Consignee}`;
        if (item.Phone != null || item.Mobile != null)
            result = result + ` 电话：${item.Phone || ''} ${item.Mobile || ''}`;
        return result;
    }
    render() {
        let context = taro_1.useContext(loading_1.LoadingContext);
        console.assert(context != null);
        let r = context.data;
        if (r == null) {
            debugger;
            return null;
        }
        return <taro_ui_1.AtList>
            {r.dataItems.map((o, index) => <components_1.View key={o.Id}>
                <taro_ui_1.AtListItem key={o.Id} title={o.Name} arrow="right" note={this.detail(o)}>
                </taro_ui_1.AtListItem>
                <components_1.View style={{ padding: "10px 10px 10px 10px" }}>
                    <components_1.View style={{ float: "left" }}>
                        <components_1.Switch /><components_1.Text style={{ paddingLeft: 6 }}>设为默认</components_1.Text>
                    </components_1.View>
                    <taro_ui_1.AtButton size="small" full={false} type={"secondary"} customStyle={{ width: "50px", float: "right" }}>
                        <components_1.Text>删除</components_1.Text>
                    </taro_ui_1.AtButton>
                    <taro_ui_1.AtButton size="small" full={false} type={"secondary"} customStyle={{ width: "50px", float: "right", marginRight: "8px" }}>
                        <components_1.Text>编辑</components_1.Text>
                    </taro_ui_1.AtButton>
                    <components_1.View style={{ clear: "both" }}>

                    </components_1.View>
                </components_1.View>
                {index < r.dataItems.length ? <components_1.View style={{ backgroundColor: "#eeeeee", width: "100%", height: "8px" }}></components_1.View> : null}
            </components_1.View>)}
        </taro_ui_1.AtList>;
    }
}
exports.ReceiptListItems = ReceiptListItems;
//# sourceMappingURL=receipt-list-items.jsx.map