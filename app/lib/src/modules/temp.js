"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const react_1 = __importDefault(require("react"));
class PageView extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    onScrollToUpper() { }
    // or 使用箭头函数
    // onScrollToUpper = () => {}
    onScroll(e) {
        console.log(e.detail);
    }
    render() {
        const scrollStyle = {
            height: '150px'
        };
        const scrollTop = 0;
        const Threshold = 20;
        const vStyleA = {
            height: '150px',
            'background-color': 'rgb(26, 173, 25)'
        };
        const vStyleB = {
            height: '150px',
            'background-color': 'rgb(39,130,215)'
        };
        const vStyleC = {
            height: '150px',
            'background-color': 'rgb(241,241,241)',
            color: '#333'
        };
        return (react_1.default.createElement(components_1.ScrollView, { className: 'scrollview', scrollY: true, scrollWithAnimation: true, scrollTop: scrollTop, style: scrollStyle, lowerThreshold: Threshold, upperThreshold: Threshold, onScrollToUpper: this.onScrollToUpper.bind(this), onScroll: this.onScroll },
            react_1.default.createElement(components_1.View, { style: vStyleA }, "A"),
            react_1.default.createElement(components_1.View, { style: vStyleB }, "B"),
            react_1.default.createElement(components_1.View, { style: vStyleC }, "C")));
    }
}
exports.default = PageView;
//# sourceMappingURL=temp.js.map