import React from "react";
import { Product } from "../../models/models";
import { Text } from "@tarojs/components";
import { CountInput } from "../count-input";

import "./product-parts.scss";
import { guid } from "maishu-toolkit";

export interface ProductPart {
    type: keyof typeof productPartTypes,
    position: "left" | "right",
    props: any,
    name: string,

}

export interface ProductPartProps {
    product: Product
}

export class ProductPrice extends React.Component<ProductPartProps> {
    render() {
        let p = this.props.product;
        return <Text className="price-color">￥{p.Price.toFixed(2)}</Text>
    }
}

export class ProductBuyButton extends React.Component<ProductPartProps>{
    render() {
        return <CountInput />
    }
}

export let productPartTypes: { [key: string]: React.ComponentClass } = {
    "ProductPrice": ProductPrice,
    "ProductBuyButton": ProductBuyButton,
}

export let allProductParts: (ProductPart)[] = [
    { type: "ProductPrice", position: "left", props: {}, name: "价格" },
    { type: "ProductBuyButton", position: "right", props: {}, name: "购买按钮" }
]

