"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const data_controls_1 = require("../../data-controls");
const react_1 = __importDefault(require("react"));
class UserFavorPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.View, { className: "page" },
            react_1.default.createElement(data_controls_1.Empty, { icon: "heart", text: "\u4F60\u8FD8\u6CA1\u6709\u6DFB\u52A0\u6536\u85CF\u54E6" }));
    }
}
exports.default = UserFavorPage;
//# sourceMappingURL=favor.js.map