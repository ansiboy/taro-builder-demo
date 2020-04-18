"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const index_1 = require("../../services/index");
const index_2 = require("../../data-controls/index");
const events_1 = require("../../events");
const data_sources_1 = require("../../services/data-sources");
const react_1 = __importDefault(require("react"));
const maishu_toolkit_1 = require("maishu-toolkit");
class ReceiptEditPage extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.inputs = {};
        this.config = {
            navigationBarTitleText: "添加地址"
        };
        this.state = {
            receiptInfo: {}, errorInputs: {},
            provinces: [], cities: [], counties: [], regions: []
        };
        // if (this.$router.params.id) {
        //     Taro.setNavigationBarTitle({ title: "编辑地址" });
        //     services.shopping.receiptInfo(this.$router.params.id).then(r => {
        //         this.setState({ receiptInfo: r });
        //     })
        // }
        let params = maishu_toolkit_1.parseUrl(this.props.tid);
        if (params.id) {
            taro_1.default.setNavigationBarTitle({ title: "编辑地址" });
            index_1.services.shopping.receiptInfo(params.id).then(r => {
                this.setState({ receiptInfo: r });
            });
        }
    }
    validateInput() {
        let errorInputs = {};
        for (let key in this.inputs) {
            let props = this.inputs[key].props || {};
            if (props.required && !props.value) {
                errorInputs[key] = true;
            }
        }
        this.setState({ errorInputs });
        let keys = Object.getOwnPropertyNames(errorInputs);
        return keys.length == 0;
    }
    onPickerChanged(provinceIndex, cityIndex, countyIndex) {
        let { provinces, cities, counties } = this.state;
        let province = provinces[provinceIndex];
        let city = cities[cityIndex];
        let county = counties[countyIndex];
        this.setState({ currentRegion: { province, city, county } });
    }
    componentDidMount() {
        index_1.services.shopping.regions().then(items => {
            let provinces = items.filter(o => o.ParentId == null);
            console.assert(provinces[0] != null);
            let cities = items.filter(o => o.ParentId == provinces[0].Id);
            console.assert(cities[0] != null);
            let counties = items.filter(o => o.ParentId == cities[0].Id);
            this.setState({ provinces, cities, counties, regions: items });
        });
    }
    render() {
        let { receiptInfo } = this.state;
        return react_1.default.createElement(components_1.View, { className: "page" },
            react_1.default.createElement(index_2.DataForm, { dataItem: receiptInfo, dataSource: data_sources_1.dataSources.receiptInfo, ref: e => this.dataForm = this.dataForm || e },
                react_1.default.createElement(index_2.TextInput, { dataField: "Name", title: "\u5730\u5740\u540D\u79F0", placeholder: "\u533A\u5206\u6536\u8D27\u5730\u5740\uFF0C\u4F8B\u5982\uFF1A\u5BB6\u3001\u516C\u53F8", validateRules: [index_2.rules.required()] }),
                react_1.default.createElement(index_2.TextInput, { dataField: "Consignee", title: "\u6536\u8D27\u4EBA", placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA", validateRules: [index_2.rules.required()] }),
                react_1.default.createElement(index_2.TextInput, { dataField: "Mobile", title: "\u624B\u673A\u53F7\u7801", placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u624B\u673A\u53F7\u7801", validateRules: [index_2.rules.required(), index_2.rules.mobile()] }),
                react_1.default.createElement(index_2.RegionSelector, { dataField: "RegionId", title: "\u6240\u5728\u5730\u533A", placeholder: "\u8BF7\u9009\u62E9\u5730\u533A", validateRules: [index_2.rules.required()] }),
                react_1.default.createElement(index_2.TextInput, { dataField: "Address", title: "\u8BE6\u7EC6\u5730\u5740", placeholder: "\u8BF7\u586B\u5199\u6536\u8D27\u5730\u5740", validateRules: [index_2.rules.required()] }),
                react_1.default.createElement(index_2.TextInput, { dataField: "PostalCode", title: "\u90AE\u7F16", placeholder: "\u8BF7\u8F93\u5165\u90AE\u7F16" }),
                react_1.default.createElement(index_2.TextInput, { dataField: "Phone", title: "\u56FA\u5B9A\u7535\u8BDD", placeholder: "\u8BF7\u8F93\u5165\u56FA\u5B9A\u7535\u8BDD" }),
                react_1.default.createElement(index_2.DataSwitch, { dataField: "IsDefault", title: "\u8BBE\u4E3A\u9ED8\u8BA4" })),
            react_1.default.createElement(components_1.View, { className: "footer" },
                react_1.default.createElement(taro_ui_1.AtForm, { className: "container" },
                    react_1.default.createElement(taro_ui_1.AtButton, { type: "primary", onClick: () => this.dataForm.submit().then(r => {
                            events_1.events.receiptInfoSave.fire({ item: r });
                            taro_1.default.navigateBack();
                        }) }, "\u4FDD\u5B58"))));
    }
}
exports.default = ReceiptEditPage;
// import Taro, { Component } from '@tarojs/taro'
// import { View, Text, Picker } from '@tarojs/components'
// export default class PagePicker extends Component {
//     state = {
//         selector: [['广东', '湖南',], ["湛江", "茂名",], ["茂南区", "水东",]],
//         selectorChecked: '美国',
//         timeSel: '12:01',
//         dateSel: '2018-04-22'
//     }
//     onChange = e => {
//         this.setState({
//             selectorChecked: this.state.selector[e.detail.value]
//         })
//     }
//     onTimeChange = e => {
//         this.setState({
//             timeSel: e.detail.value
//         })
//     }
//     onDateChange = e => {
//         this.setState({
//             dateSel: e.detail.value
//         })
//     }
//     render() {
//         return (
//             <View className='container'>
//                 <View className='page-body'>
//                     <View className='page-section'>
//                         <Text>地区选择器</Text>
//                         <View>
//                             <Picker mode='multiSelector' range={this.state.selector} onChange={this.onChange}>
//                                 <View className='picker'>
//                                     当前选择：{this.state.selectorChecked}
//                                 </View>
//                             </Picker>
//                         </View>
//                     </View>
//                     <View className='page-section'>
//                         <Text>时间选择器</Text>
//                         <View>
//                             <Picker mode='time' onChange={this.onTimeChange}>
//                                 <View className='picker'>
//                                     当前选择：{this.state.timeSel}
//                                 </View>
//                             </Picker>
//                         </View>
//                     </View>
//                     <View className='page-section'>
//                         <Text>日期选择器</Text>
//                         <View>
//                             <Picker mode='date' onChange={this.onDateChange}>
//                                 <View className='picker'>
//                                     当前选择：{this.state.dateSel}
//                                 </View>
//                             </Picker>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
// }
//# sourceMappingURL=receipt-edit.js.map