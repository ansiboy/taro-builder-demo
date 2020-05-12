import { Repeater, RepeaterItem, Empty } from "../data-controls/index";
import { services, ShoppingService } from "../services/index";
import React from "react";
import { View, Text, Image } from "@tarojs/components";
import "./single-column-products.scss";
import { DataSource, DataSourceSelectResult } from "maishu-toolkit";

import { imagePath } from "../common";
import { CountInput } from "./count-input";
// import { Props } from "./single-column-products.d";
import { component } from "taro-builder-core";
import { Category, ShoppingCartItem, Product } from "../models/models";
import { RepeaterEmtpy } from "../data-controls/repeater/repeater";
export { Category, ShoppingCartItem } from "../models/models";

export interface State {
    categories: Category[],
    shoppingCartItems: ShoppingCartItem[],
    productCounts: { [key: string]: number },
}

export declare interface Props {
    /** 商品来源 */
    productSourceType: 'category' | 'custom' | 'all',
    /** 图片大小 */
    imageSize: "small" | "medium" | "large",
    /** 商品名称行数 */
    productNameLines: 'singleLine' | 'doubleColumn',
    /** 选取要展示的商品编号 */
    productIds?: string[],
    /** 商品数量 */
    productsCount: number,
    /** 商品类别 */
    categoryId?: string,
    /** 显示商品类别 */
    showCategories: boolean,
}

@component({ displayName: "单列商品", icon: "icon-list", introduce: "单列展示商品" })
export class SingleColumnProducts extends React.Component<Props, State> {

    static defaultProps: Props = {
        imageSize: "small", productNameLines: "singleLine", productSourceType: "all",
        productsCount: 1, showCategories: true, productIds: undefined,
    }
    protected repeater: Repeater<Product>;

    constructor(props: Props) {
        super(props);
        this.state = {
            categories: ShoppingService.cacheCategories || [], shoppingCartItems: [],
            productCounts: {}
        };

        services.shopping.categories().then(r => {
            this.setState({ categories: r });
        })
    }

    async loadProducts(props: Props): Promise<DataSourceSelectResult<Product>> {
        props = props || this.props
        let { categoryId, productsCount, productIds } = props;
        let sourceType = props.productSourceType;
        let productPromise: Promise<Product[]>;
        if (sourceType == 'category') {
            productPromise = services.shopping.productsByCategory(categoryId, productsCount)
        }
        else if (sourceType == 'custom') {
            productPromise = productIds ? services.shopping.productsByIds(productIds) : Promise.resolve([]);
        }
        else {
            productPromise = services.shopping.products(productsCount);
        }

        let products = await productPromise;
        return { dataItems: products, totalRowCount: products.length };
    }


    render() {
        let { categories } = this.state;
        return <View className="single-colunm-products">
            {this.props.showCategories ? <View className="categories">
                {categories.map(c =>
                    <View className="item" key={c.Id}>
                        {c.Name}
                    </View>
                )}
            </View> : null}
            <View className="product-list">
                <Repeater dataSource={new DataSource({ primaryKeys: ["Id"], select: () => this.loadProducts(this.props) })}
                    ref={e => this.repeater = this.repeater || e}>
                    <RepeaterItem.Consumer>
                        {args => {
                            let p: Product = args.dataItem;
                            return <View className="item spliter">
                                <Image className="image" src={imagePath(p.ImagePath)} />
                                <View className="content">
                                    <View className="name">
                                        {p.Name}
                                    </View>
                                    <View className="price">
                                        <Text className="price-color">￥{p.Price.toFixed(2)}</Text>
                                        <CountInput />
                                    </View>
                                </View>
                            </View>
                        }}
                    </RepeaterItem.Consumer>
                    <RepeaterEmtpy.Consumer>
                        {args => <Empty text="暂无所要显示的商品" icon="" />}
                    </RepeaterEmtpy.Consumer>
                </Repeater>
            </View>
        </View >
    }
}

