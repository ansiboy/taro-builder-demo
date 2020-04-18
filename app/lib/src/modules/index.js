"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.less");
const react_1 = __importDefault(require("react"));
const components_1 = require("../components");
const components_2 = require("@tarojs/components");
const taro_1 = __importDefault(require("@tarojs/taro"));
class Index extends react_1.default.Component {
    componentWillMount() { }
    componentDidMount() {
    }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() {
    }
    render() {
        return react_1.default.createElement(components_2.ScrollView, { scrollY: true, style: { height: `${taro_1.default.getSystemInfoSync().screenHeight}px`, width: "100%" }, onScroll: (e) => {
                console.log(e.detail.scrollTop);
            }, onScrollToLower: () => {
                console.log("onScrollToLower");
            }, onScrollToUpper: () => {
                console.log("onScrollToUpper");
            } },
            react_1.default.createElement(components_1.Carousel, null),
            react_1.default.createElement(components_1.SingleColumnProducts, null));
    }
}
exports.default = Index;
//# sourceMappingURL=index.js.map