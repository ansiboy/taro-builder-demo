import React from "react";
import { component } from "taro-builder-core";
import { Product } from "../models/models";
import { Repeater, RepeaterItem, Empty } from "../data-controls/index";
import { DataSource, guid } from "maishu-toolkit";
import { services } from "../services/index";
import { View, ScrollView, Text } from "@tarojs/components";
import { RepeaterEmtpy } from "../data-controls/repeater/repeater";
import { ProductItem } from "./single-column-products";

import "./single-column-products.scss";
import "./category-products.scss";

export interface Tab {
    id: string,
    name: string,
    children?: Tab[],
    productIds?: string[],
    categoryId?: string,
    source: "category" | "manual",
    sortNumber?: number,
}

export interface Props {
    tabs: Tab[]
}

export interface State {
    products?: Product[],
    /** 当前一级目录 */
    currentParent?: Tab,
    /** 当前二级目录 */
    currentChild?: Tab,
}

@component({ displayName: "类别商品", icon: "icon-list", introduce: "用于单列商品，方便用户进行结算" })
export default class CategoryProducts extends React.Component<Props, State> {
    private dataSource: DataSource<Product>;
    static defaultProps: Props = { tabs: [] };
    protected repeater: Repeater<Product>;

    constructor(props: Props) {
        super(props);

        let currentChild: Tab | null = null;
        let currentParent = props.tabs[0];
        if (currentParent != null && currentParent.children != null)
            currentChild = currentParent.children[0];

        this.state = { currentParent, currentChild };
        this.dataSource = new DataSource({
            primaryKeys: ["Id"],
            select: async () => {
                let tab = this.state.currentChild || this.state.currentParent;
                let products: Product[];
                if (tab == null) {
                    products = [];
                }
                else if (tab.categoryId) {
                    products = await services.shopping.productsByCategory(tab.categoryId, Number.MAX_SAFE_INTEGER);
                }
                else {
                    products = await services.shopping.productsByIds(tab.productIds || []);
                }

                return { dataItems: products, totalRowCount: products.length };
            }
        })
    }

    /** 点击一级目录 */
    selectParent(tab: Tab) {
        if (this.state.currentParent != null && this.state.currentParent.id == tab.id)
            return;

        let currentChild = tab.children ? tab.children[0] : null;
        this.setState({ currentParent: tab, currentChild }, () => {
            this.repeater.reload();
        });
    }

    /** 点击二级目录 */
    selectChild(tab: Tab) {
        this.setState({ currentChild: tab }, () => {
            this.repeater.reload()
        });
    }

    render() {
        let { tabs } = this.props;
        let { currentParent, currentChild } = this.state;
        if (currentChild == null && currentParent.children != null)
            currentChild = currentParent.children[0];

        return <View className="single-colunm-products category-products">
            {tabs != null && tabs.length > 0 ? <View className="categories">
                {tabs.map(c =>
                    <View className={c.id == currentParent.id ? "item active" : "item"} key={c.id} onClick={() => this.selectParent(c)}>
                        {c.name}
                    </View>)}
            </View> : null}
            <View className="product-list">
                {currentParent != null && currentChild != null ?
                    <ScrollView scrollX={true} style={{ width: 200 }}>
                        <View className="tabs">
                            {currentParent.children.map((o, i) =>
                                <Text key={o.id} className={o.id == currentChild.id ? "tab active" : "tab"}
                                    onClick={() => this.selectChild(o)}>{o.name}</Text>
                            )}
                        </View>
                    </ScrollView> : null}
                <Repeater dataSource={this.dataSource} ref={e => this.repeater = e || this.repeater}>
                    <RepeaterItem.Consumer>
                        {args => {
                            let dataItem = args.dataItem as Product;
                            return <ProductItem key={dataItem.Id} product={dataItem} />
                        }}
                    </RepeaterItem.Consumer>
                    <RepeaterEmtpy.Consumer>
                        {args => <Empty text="暂无所要显示的商品" icon="" />}
                    </RepeaterEmtpy.Consumer>
                </Repeater>
            </View>
        </View>

    }
}