"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Taro from "@tarojs/taro";
const taro_ui_1 = require("taro-ui");
const data_form_1 = require("./data-form");
// import { Rule, rules } from "./rules";
const components_1 = require("@tarojs/components");
const maishu_toolkit_1 = require("maishu-toolkit");
const default_errors_1 = require("./default-errors");
const react_1 = __importDefault(require("react"));
class TextInput extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.id = maishu_toolkit_1.guid();
        this.state = {};
    }
    async validate() {
        const context = this.context;
        let rules = this.props.validateRules || [];
        let errorMessage;
        let dataItem = context.dataItem || {};
        let value = dataItem[this.props.dataField];
        for (let i = 0; i < rules.length; i++) {
            let r = await rules[i].validate(value);
            if (r == false) {
                // isValid = false;
                let ruleError = rules[i].error;
                if (typeof ruleError == "string")
                    errorMessage = ruleError;
                else if (typeof ruleError == "function")
                    errorMessage = ruleError();
                else {
                    let defaultError = default_errors_1.defaultErrors[rules[i].type];
                    errorMessage = defaultError.replace("%s", this.props.dataField);
                }
            }
        }
        this.setState({ errorMessage });
        return errorMessage == null;
    }
    formatValue(value) {
        if (value == null)
            return "";
        if (typeof value == "string")
            return value;
        if (typeof value == "number")
            return value.toString();
        if (value instanceof Date)
            return value.toUTCString();
        return "Unknown data type";
    }
    formatText(text, dataType) {
        console.assert(text != null);
        if (text == "")
            return null;
        dataType = dataType || "string";
        switch (dataType) {
            case "string":
                return text;
            case "number":
                return Number.parseFloat(text);
            case "date":
                return new Date(text);
        }
        throw new Error(`Unknown data type ${dataType}.`);
    }
    componentDidMount() {
    }
    render() {
        const context = this.context;
        if (context.form != null && context.form.inputs[this.id] == null) {
            context.form.inputs[this.id] = this;
        }
        let dataItem = (context.dataItem || {});
        let value = dataItem[this.props.dataField];
        let errorMessage = this.state.errorMessage;
        let validateRules = this.props.validateRules || [];
        let hasRequired = validateRules.filter(o => o.type == "required").length > 0;
        let isMobile = validateRules.filter(o => o.type == "mobile").length > 0;
        return react_1.default.createElement(components_1.View, null,
            react_1.default.createElement(taro_ui_1.AtInput, { name: this.props.dataField, title: this.props.title, value: this.formatValue(value), placeholder: this.props.placeholder, error: errorMessage != undefined, type: isMobile ? "phone" : "text", onErrorClick: () => {
                    Taro.showToast({ title: errorMessage || "", icon: "none" });
                }, required: hasRequired, onChange: e => {
                    dataItem[this.props.dataField] = this.formatText(e.toString(), this.props.dataType);
                    if (errorMessage)
                        this.validate();
                } }));
    }
}
exports.TextInput = TextInput;
TextInput.contextType = data_form_1.DataFormContext;
//# sourceMappingURL=text-input.js.map