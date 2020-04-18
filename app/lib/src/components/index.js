"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const carousel_1 = require("./carousel");
const single_column_products_1 = require("./single-column-products");
var carousel_2 = require("./carousel");
exports.Carousel = carousel_2.Carousel;
var single_column_products_2 = require("./single-column-products");
exports.SingleColumnProducts = single_column_products_2.SingleColumnProducts;
function factory(componentData) {
    switch (componentData.name) {
        case "Carousel":
            return react_1.default.createElement(carousel_1.Carousel, Object.assign({}, componentData.props));
        case "SingleColumnProducts":
            return react_1.default.createElement(single_column_products_1.SingleColumnProducts, Object.assign({}, componentData.props));
    }
}
exports.factory = factory;
//# sourceMappingURL=index.js.map