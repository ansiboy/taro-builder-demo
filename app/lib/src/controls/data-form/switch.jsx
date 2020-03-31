"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const taro_ui_1 = require("taro-ui");
const data_form_1 = require("./data-form");
class DataSwitch extends taro_1.default.Component {
    render() {
        let context = this.context;
        let dataItem = context.dataItem || {};
        let value = dataItem[this.props.dataField];
        return <taro_ui_1.AtSwitch checked={value} title={this.props.title} onChange={value => {
            context.dataItem[this.props.dataField] = value;
        }}/>;
    }
}
exports.DataSwitch = DataSwitch;
DataSwitch.contextType = data_form_1.DataFormContext;
//# sourceMappingURL=switch.jsx.map