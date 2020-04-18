"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const react_1 = __importDefault(require("react"));
let defaultValue = {
    dataItem: {}, form: null
};
exports.DataFormContext = react_1.default.createContext(defaultValue);
class DataForm extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.inputs = {};
    }
    async validate() {
        let isValid = true;
        for (let key in this.inputs) {
            let r = await this.inputs[key].validate();
            if (r == false)
                isValid = false;
        }
        return isValid;
    }
    async submit() {
        let isValid = await this.validate();
        if (isValid != true)
            return;
        if (!this.props.dataSource) {
            return Promise.reject(new Error("Props submit function is null."));
        }
        let id = this.props.dataItem["id"] || this.props.dataItem["Id"];
        if (id)
            return this.props.dataSource.update(this.props.dataItem);
        return this.props.dataSource.insert(this.props.dataItem);
    }
    render() {
        return react_1.default.createElement(taro_ui_1.AtForm, null,
            react_1.default.createElement(exports.DataFormContext.Provider, { value: { dataItem: this.props.dataItem, form: this } }, this.props.children));
    }
}
exports.DataForm = DataForm;
//# sourceMappingURL=data-form.js.map