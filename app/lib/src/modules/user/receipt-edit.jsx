"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const index_1 = require("../../services/index");
const data_form_1 = require("../../controls/data-form");
const events_1 = require("../../events");
const data_sources_1 = require("../../services/data-sources");
class ReceiptEditPage extends taro_1.default.Component {
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
        if (this.$router.params.id) {
            taro_1.default.setNavigationBarTitle({ title: "编辑地址" });
            index_1.services.shopping.receiptInfo(this.$router.params.id).then(r => {
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
        return <components_1.View className="page">
            <data_form_1.DataForm dataItem={receiptInfo} dataSource={data_sources_1.dataSources.receiptInfo} ref={e => this.dataForm = this.dataForm || e}>
                <data_form_1.TextInput dataField="Name" title="地址名称" placeholder="区分收货地址，例如：家、公司" validateRules={[data_form_1.rules.required()]}/>
                <data_form_1.TextInput dataField="Consignee" title="收货人" placeholder="请输入收货人" validateRules={[data_form_1.rules.required()]}/>
                <data_form_1.TextInput dataField="Mobile" title="手机号码" placeholder="请输入收货人手机号码" validateRules={[data_form_1.rules.required(), data_form_1.rules.mobile()]}/>
                <data_form_1.RegionSelector dataField="RegionId" title="所在地区" placeholder="请选择地区" validateRules={[data_form_1.rules.required()]}/>
                <data_form_1.TextInput dataField="Address" title="详细地址" placeholder="请填写收货地址" validateRules={[data_form_1.rules.required()]}/>
                <data_form_1.TextInput dataField="PostalCode" title="邮编" placeholder="请输入邮编"/>
                <data_form_1.TextInput dataField="Phone" title="固定电话" placeholder="请输入固定电话"/>
                <data_form_1.DataSwitch dataField="IsDefault" title="设为默认"/>
            </data_form_1.DataForm>
            <components_1.View className="footer">
                <taro_ui_1.AtForm className="container">
                    <taro_ui_1.AtButton type="primary" onClick={() => this.dataForm.submit().then(r => {
            events_1.events.receiptInfoSave.fire({ item: r });
            taro_1.default.navigateBack();
        })}>
                        保存
                </taro_ui_1.AtButton>
                </taro_ui_1.AtForm>
            </components_1.View>
        </components_1.View>;
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
//# sourceMappingURL=receipt-edit.jsx.map