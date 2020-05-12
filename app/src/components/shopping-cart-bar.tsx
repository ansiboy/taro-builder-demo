import React from "react";
import { component } from "taro-builder-core";
import { ShoppingCartItem } from "../models/models";
import { buttonOnClick } from "maishu-ui-toolkit";
import Taro from "@tarojs/taro";
import "./shopping-cart-bar.scss";
import { View, Button } from "@tarojs/components";
import { Text } from "@tarojs/components";

export interface Props {

}

export interface State {
    productsCount?: number,
    items: ShoppingCartItem[],
}

@component({ displayName: "结算栏", icon: "icon-shopping-cart", introduce: "用于单列商品，方便用户进行结算", group: "others" })
export class ShoppingCartBar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { items: [] }
    }

    async buy() {

    }

    render() {

        let { productsCount, items } = this.state;

        let totalAmount = 0;
        let selectedCount = 0;
        items.forEach(o => {
            totalAmount = totalAmount + o.Amount * o.Count;
            selectedCount = selectedCount + o.Count;
        });

        return <View className="settlement">
            <View className="icon"
                onClick={() => { }}>
                <View className='at-icon at-icon-shopping-cart'></View>
                <Text className="badge bg-primary">10</Text>
            </View>
            <Button className="btn">结算</Button>
            <Text className="price">￥0.00</Text>
            <Text className="total">总计：</Text>

        </View>
    }
}