"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_jueying_core_1 = require("maishu-jueying-core");
const index_1 = require("../data-controls/index");
const index_2 = require("../services/index");
const react_1 = __importDefault(require("react"));
const components_1 = require("@tarojs/components");
const taro_ui_1 = require("taro-ui");
// import "./single-column-products.scss";
const maishu_toolkit_1 = require("maishu-toolkit");
let SingleColumnProducts = class SingleColumnProducts extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: index_2.ShoppingService.cacheCategories || [], shoppingCartItems: [],
            productCounts: {}
        };
    }
    componentDidMount() {
        index_2.services.shopping.categories().then(r => {
            this.setState({ categories: r });
        });
    }
    async loadData(props) {
        props = props || this.props;
        let { categoryId, productsCount, productIds } = props;
        let sourceType = props.productSourceType;
        let productPromise;
        if (sourceType == 'category') {
            productPromise = index_2.services.shopping.productsByCategory(categoryId, productsCount);
        }
        else if (sourceType == 'custom') {
            productPromise = productIds ? index_2.services.shopping.productsByIds(productIds) : Promise.resolve([]);
        }
        else {
            productPromise = index_2.services.shopping.products(productsCount);
        }
        let products = await productPromise;
        return { dataItems: products, totalRowCount: products.length };
    }
    render() {
        let { categories, productCounts } = this.state;
        return react_1.default.createElement(components_1.View, { className: "single-colunm-products" },
            react_1.default.createElement(taro_ui_1.AtList, { className: "categories", hasBorder: false }, categories.map(c => react_1.default.createElement(taro_ui_1.AtListItem, { key: c.Id, title: c.Name }, c.Name))),
            react_1.default.createElement(components_1.View, { className: "product-list" },
                react_1.default.createElement(index_1.Repeater, { dataSource: new maishu_toolkit_1.DataSource({ primaryKeys: ["Id"], select: () => this.loadData(this.props) }) },
                    react_1.default.createElement(index_1.RepeaterItem.Consumer, null, args => {
                        let p = args.dataItem;
                        return react_1.default.createElement(components_1.View, null,
                            react_1.default.createElement(components_1.View, { className: "item at-row" }, p.Name),
                            react_1.default.createElement(components_1.View, { className: "item at-row" },
                                react_1.default.createElement(components_1.View, { className: "at-col at-col-6" },
                                    react_1.default.createElement(components_1.Text, null, "\u4EF7\u683C"),
                                    p.Price.toFixed(2)),
                                react_1.default.createElement(components_1.View, { className: "at-col at-col-6", style: { textAlign: "right" } },
                                    react_1.default.createElement(taro_ui_1.AtInputNumber, { type: "digit", value: productCounts[p.Id] || 0, onChange: (value) => {
                                            productCounts[p.Id] = value;
                                            this.setState({ productCounts });
                                        } }))),
                            args.index < args.count - 1 ? react_1.default.createElement(components_1.View, { style: { backgroundColor: "#eeeeee", width: "100%", height: "2px" } }) : null);
                    }))));
    }
};
SingleColumnProducts.defaultProps = {
    imageSize: "small", productNameLines: "singleLine", productSourceType: "all",
    productsCount: 1000, showCategories: true, productIds: undefined,
};
SingleColumnProducts = __decorate([
    maishu_jueying_core_1.component({ displayName: "单列商品", icon: "icon-list", introduce: "单列展示商品" })
], SingleColumnProducts);
exports.SingleColumnProducts = SingleColumnProducts;
//# sourceMappingURL=single-column-products.js.map