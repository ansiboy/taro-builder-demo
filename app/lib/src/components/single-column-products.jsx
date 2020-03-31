"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Taro = require("@tarojs/taro");
const decorators_1 = require("maishu-jueying-core/decorators");
const loading_1 = require("../controls/loading");
const index_1 = require("../services/index");
let SingleColumnProducts = class SingleColumnProducts extends Taro.Component {
    async loadData(props) {
        props = props || this.props;
        let { categoryId, productsCount, productIds } = props;
        let sourceType = props.productSourceType;
        let productPromise;
        if (sourceType == 'category') {
            productPromise = index_1.services.shopping.productsByCategory(categoryId, productsCount);
        }
        else if (sourceType == 'custom') {
            productPromise = productIds ? index_1.services.shopping.productsByIds(productIds) : Promise.resolve([]);
        }
        else {
            productPromise = index_1.services.shopping.products(productsCount);
        }
        let [categories, products] = await Promise.all([index_1.services.shopping.categories(), productPromise]);
        if (products == null || products.length == 0)
            return "暂无所要显示的商品";
        return { products, categories };
    }
    render() {
        return <loading_1.Loading loadData={() => this.loadData()}>

        </loading_1.Loading>;
    }
};
SingleColumnProducts.defaultProps = {
    imageSize: "small", productNameLines: "singleLine", productSourceType: "all",
    productsCount: 1, showCategories: true, productIds: undefined,
};
SingleColumnProducts = __decorate([
    decorators_1.component({ displayName: "单列商品", icon: "icon-list", introduce: "单列展示商品" })
], SingleColumnProducts);
exports.SingleColumnProducts = SingleColumnProducts;
//# sourceMappingURL=single-column-products.jsx.map