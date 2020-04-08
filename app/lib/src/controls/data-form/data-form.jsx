"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const taro_1 = require("@tarojs/taro");
let defaultValue = {
    dataItem: {}, form: null
};
exports.DataFormContext = taro_1.default.createContext(defaultValue);
class DataForm extends taro_1.Component {
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
        console.log("submit");
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
        return <taro_ui_1.AtForm>
            <exports.DataFormContext.Provider value={{ dataItem: this.props.dataItem, form: this }}>
                {this.props.children}
            </exports.DataFormContext.Provider>
        </taro_ui_1.AtForm>;
    }
}
exports.DataForm = DataForm;
//# sourceMappingURL=data-form.jsx.map