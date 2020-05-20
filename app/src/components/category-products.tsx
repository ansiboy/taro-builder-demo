import React from "react";
import { component } from "taro-builder-core";
import { Product } from "../models/models";
import { Repeater, RepeaterItem, Empty } from "../data-controls/index";
import { DataSource } from "maishu-toolkit";
import { services } from "../services/index";
import { View, ScrollView, Text } from "@tarojs/components";
import { RepeaterEmtpy } from "../data-controls/repeater/repeater";

import "./single-column-products.scss";
import "./category-products.scss";
import { defaultProps } from "./default-props";
import { ProductItem } from "./product/product-item";
import { ProductPart } from "./product/product-parts";

export interface Category {
    id: string,
    name: string,
    children?: Category[],
    productIds?: string[],
    categoryId?: string,
    source: "category" | "manual",
    sortNumber?: number,
}

export interface Props {
    categories: Category[],
    productParts: ProductPart[],
}

export interface State {
    products?: Product[],
    // /** 当前一级目录 */
    // currentParent?: Category,
    // /** 当前二级目录 */
    // currentChild?: Category,
    currentCategory?: Category,
}

@component({ displayName: "类别商品", icon: "icon-list", introduce: "用于单列商品，方便用户进行结算" })
export default class CategoryProducts extends React.Component<Props, State> {
    private dataSource: DataSource<Product>;
    static defaultProps: Props = defaultProps.categoryProducts

    protected repeater: Repeater<Product>;

    constructor(props: Props) {
        super(props);

        this.state = {};
        this.dataSource = new DataSource({
            primaryKeys: ["Id"],
            select: async () => {
                let category = this.currentCategory(this.props);
                let products: Product[];
                if (category == null) {
                    products = [];
                }
                else if (category.source == "category" && category.categoryId != null) {
                    products = await services.shopping.productsByCategory(category.categoryId, 2000);
                }
                else if (category.source == "manual" && category.productIds != null) {
                    products = await services.shopping.productsByIds(category.productIds);
                }
                else {
                    products = [];
                }

                return { dataItems: products, totalRowCount: products.length };
            }
        })
    }

    protected currentCategory(props: Props): Category {
        let category = this.state.currentCategory
        if (category == null && props.categories != null) {
            category = props.categories[0];
        }

        if (category == null)
            return null;

        if (category.children != null && category.children.length > 0)
            return category.children[0];

        return category;
    }

    /** 点击一级目录 */
    selectCategory(tab: Category) {
        this.setState({ currentCategory: tab }, () => {
            this.repeater.reload();
        });
    }

    findParent(category: Category) {
        for (let i = 0; i < this.props.categories.length; i++) {
            let parent = this.props.categories[i];
            let children = this.props.categories[i].children || [];
            for (let j = 0; j < children.length; j++) {
                if (children[j].id == category.id)
                    return parent;
            }
        }

        return null;
    }

    render() {
        let { categories: tabs, productParts } = this.props;
        console.assert(tabs != null);

        let currentCategory = this.currentCategory(this.props);
        let currentParent = currentCategory ? this.findParent(currentCategory) : null;
        if (currentParent == null)
            currentParent = currentCategory;

        return <View className="single-colunm-products category-products">
            {tabs != null && tabs.length > 0 ? <View className="categories">
                {tabs.map(c =>
                    <View className={c.id == (currentParent || currentCategory).id ? "item active" : "item"} key={c.id} onClick={() => this.selectCategory(c)}>
                        {c.name}
                    </View>)}
            </View> : null}
            <View className="product-list">
                {currentParent != null && currentCategory != null ?
                    <ScrollView scrollX={true} style={{ width: 200 }}>
                        <View className="tabs">
                            {currentParent.children.map((o) =>
                                <Text key={o.id} className={o.id == currentCategory.id ? "tab active" : "tab"}
                                    onClick={() => this.selectCategory(o)}>{o.name}</Text>
                            )}
                        </View>
                    </ScrollView> : null}
                <Repeater dataSource={this.dataSource} ref={e => this.repeater = e || this.repeater}>
                    <RepeaterItem.Consumer>
                        {args => {
                            let dataItem = args.dataItem as Product;
                            return <View className="item spliter">
                                <ProductItem key={dataItem.Id} product={dataItem} productParts={productParts} />
                            </View>
                        }}
                    </RepeaterItem.Consumer>
                    <RepeaterEmtpy.Consumer>
                        {() => <Empty text="暂无所要显示的商品" icon="" />}
                    </RepeaterEmtpy.Consumer>
                </Repeater>
            </View>
        </View>

    }
}