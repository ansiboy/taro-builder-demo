"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../components/index");
const react_1 = __importDefault(require("react"));
class ProductList extends Taro.Component {
    render() {
        return react_1.default.createElement(index_1.SingleColumnProducts, null);
    }
}
exports.ProductList = ProductList;
//# sourceMappingURL=product-list.js.map