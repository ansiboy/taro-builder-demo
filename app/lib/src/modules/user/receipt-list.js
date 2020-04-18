"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const data_sources_1 = require("../../services/data-sources");
const react_1 = __importDefault(require("react"));
const data_controls_1 = require("../../data-controls");
const components_1 = require("@tarojs/components");
const taro_1 = __importDefault(require("@tarojs/taro"));
const config_1 = require("../../config");
class ReceiptListPage extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { selectedIds: [] };
    }
    isSelected(id) {
        let selectedIds = this.state.selectedIds;
        return selectedIds.indexOf(id) >= 0;
    }
    detail(item) {
        var result = `${item.ProvinceName} ${item.CityName} ${item.CountyName} ${item.Address}`;
        result = result + ` 联系人: ${item.Consignee}`;
        if (item.Phone != null || item.Mobile != null)
            result = result + ` 电话：${item.Phone || ''} ${item.Mobile || ''}`;
        return result;
    }
    componentDidMount() {
    }
    render() {
        return react_1.default.createElement(taro_ui_1.AtList, null,
            react_1.default.createElement(data_controls_1.Repeater, { dataSource: data_sources_1.dataSources.receiptInfo },
                react_1.default.createElement(data_controls_1.RepeaterItem.Consumer, null, args => {
                    let dataItem = args.dataItem;
                    return react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(taro_ui_1.AtListItem, { key: dataItem.Id, title: dataItem.Name, arrow: "right", note: this.detail(dataItem), onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.receiptEdit}?id=${dataItem.Id}` }) }),
                        react_1.default.createElement(components_1.View, { style: { padding: "10px 10px 10px 10px" } },
                            react_1.default.createElement(components_1.View, { style: { float: "left" } },
                                react_1.default.createElement(components_1.Switch, null),
                                react_1.default.createElement(components_1.Text, { style: { paddingLeft: 6 } }, "\u8BBE\u4E3A\u9ED8\u8BA4")),
                            react_1.default.createElement(taro_ui_1.AtButton, { size: "small", full: false, type: "secondary", customStyle: { width: "50px", float: "right" } },
                                react_1.default.createElement(components_1.Text, null, "\u5220\u9664")),
                            react_1.default.createElement(taro_ui_1.AtButton, { size: "small", full: false, type: "secondary", customStyle: { width: "50px", float: "right", marginRight: "8px" }, onClick: () => taro_1.default.navigateTo({ url: `${config_1.pages.receiptEdit}?id=${dataItem.Id}` }) },
                                react_1.default.createElement(components_1.Text, null, "\u7F16\u8F91")),
                            react_1.default.createElement(components_1.View, { style: { clear: "both" } })),
                        args.index < args.count - 1 ? react_1.default.createElement(components_1.View, { style: { backgroundColor: "#eeeeee", width: "100%", height: "8px" } }) : null);
                })));
    }
}
exports.default = ReceiptListPage;
ReceiptListPage.contextType = data_controls_1.RepeaterItem;
//# sourceMappingURL=receipt-list.js.map