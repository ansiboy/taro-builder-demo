"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const data_form_1 = require("./data-form");
const react_1 = __importDefault(require("react"));
class DataSwitch extends react_1.default.Component {
    render() {
        let context = this.context;
        let dataItem = context.dataItem || {};
        let value = dataItem[this.props.dataField];
        return react_1.default.createElement(taro_ui_1.AtSwitch, { checked: value, title: this.props.title, onChange: value => {
                context.dataItem[this.props.dataField] = value;
            } });
    }
}
exports.DataSwitch = DataSwitch;
DataSwitch.contextType = data_form_1.DataFormContext;
//# sourceMappingURL=switch.js.map