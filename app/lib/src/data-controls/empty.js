"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
const config_1 = require("../config");
require("./empty.scss");
const react_1 = __importDefault(require("react"));
class Empty extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, { className: "empty", onClick: this.props.onClick },
            react_1.default.createElement(components_1.View, { className: "icon" },
                react_1.default.createElement(taro_ui_1.AtIcon, { value: this.props.icon, size: config_1.style.emptyIconSize })),
            react_1.default.createElement(components_1.View, { className: "text" }, this.props.text));
    }
}
exports.Empty = Empty;
//# sourceMappingURL=empty.js.map