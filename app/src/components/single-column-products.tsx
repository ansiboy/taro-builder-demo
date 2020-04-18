import { component } from "maishu-jueying-core";
import { Repeater, RepeaterItem } from "../data-controls/index";
import { services, ShoppingService } from "../services/index";
import React from "react";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./single-column-products.scss";
import { DataSource, DataSourceSelectResult } from "maishu-toolkit";

export interface Props {
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

export interface State {
    categories: Category[],
    shoppingCartItems: ShoppingCartItem[],
    productCounts: { [key: string]: number },
}


@component({ displayName: "单列商品", icon: "icon-list", introduce: "单列展示商品" })
export class SingleColumnProducts extends React.Component<Props, State> {

    static defaultProps: Props = {
        imageSize: "small", productNameLines: "singleLine", productSourceType: "all",
        productsCount: 1000, showCategories: true, productIds: undefined,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            categories: ShoppingService.cacheCategories || [], shoppingCartItems: [],
            productCounts: {}
        };
    }

    componentDidMount() {
        services.shopping.categories().then(r => {
            this.setState({ categories: r });
        })
    }

    async loadData(props: Props): Promise<DataSourceSelectResult<Product>> {
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
            <AtList className="categories" hasBorder={false}>
                {categories.map(c =>
                    <AtListItem key={c.Id} title={c.Name}>
                        {c.Name}
                    </AtListItem>
                )}
            </AtList>
            <View className="product-list">
                <Repeater dataSource={new DataSource({ primaryKeys: ["Id"], select: () => this.loadData(this.props) })}>
                    <RepeaterItem.Consumer>
                        {args => {
                            let p: Product = args.dataItem;
                            return <View>
                                <View className="item at-row">
                                    {p.Name}
                                </View>
                                <View className="item at-row">
                                    <View className="at-col at-col-6">
                                        <Text>价格</Text>{p.Price.toFixed(2)}
                                    </View>
                                    <View className="at-col at-col-6" style={{ textAlign: "right" }}>
                                        {/* <AtInputNumber type="digit" value={productCounts[p.Id] || 0}
                                            onChange={(value) => {
                                                productCounts[p.Id] = value;
                                                this.setState({ productCounts });
                                            }} /> */}
                                    </View>
                                </View>
                                {args.index < args.count - 1 ? <View style={{ backgroundColor: "#eeeeee", width: "100%", height: "2px" }} ></View> : null}
                            </View>
                        }}
                    </RepeaterItem.Consumer>
                </Repeater>
            </View>
        </View >
    }
}