"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_ui_1 = require("taro-ui");
const react_1 = require("react");
let defaultValue = {
    dataItem: {}, form: null
};
exports.DataFormContext = react_1.default.createContext(defaultValue);
class DataForm extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.inputs = {};
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = true;
            for (let key in this.inputs) {
                let r = yield this.inputs[key].validate();
                if (r == false)
                    isValid = false;
            }
            return isValid;
        });
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = yield this.validate();
            if (isValid != true)
                return;
            if (!this.props.dataSource) {
                return Promise.reject(new Error("Props submit function is null."));
            }
            let id = this.props.dataItem["id"] || this.props.dataItem["Id"];
            if (id)
                return this.props.dataSource.update(this.props.dataItem);
            return this.props.dataSource.insert(this.props.dataItem);
        });
    }
    render() {
        return react_1.default.createElement(taro_ui_1.AtForm, null,
            react_1.default.createElement(exports.DataFormContext.Provider, { value: { dataItem: this.props.dataItem, form: this } }, this.props.children));
    }
}
exports.DataForm = DataForm;
