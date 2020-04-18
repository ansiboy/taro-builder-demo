"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("@tarojs/components");
class PageView extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, null, this.props.children);
    }
}
exports.PageView = PageView;
//# sourceMappingURL=page-view.js.map