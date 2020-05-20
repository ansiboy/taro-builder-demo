import React from "react"
import { Product } from "../../models/models"
import { ProductPart, ProductPartProps, productPartTypes, } from "./product-parts"
import { View, Image, Text } from "@tarojs/components"
import { imagePath } from "../../common"
import "./product-item.scss";
import { guid } from "maishu-toolkit"

export interface ProductItemProps {
    product: Product,
    productParts: ProductPart[],
}

export class ProductItem extends React.Component<ProductItemProps> {
    renderProductPart(part: ProductPart) {
        let props: ProductPartProps = { product: this.props.product };
        console.assert(productPartTypes[part.type] != null);
        let c = React.createElement(productPartTypes[part.type], Object.assign(props, part.props));
        return c;
    }
    render() {
        let p = this.props.product;
        let productParts = this.props.productParts;
        let leftParts = productParts.filter(o => o.position == "left").map(o => Object.assign(o, { id: guid() }));
        let rightParts = productParts.filter(o => o.position == "right").map(o => Object.assign(o, { id: guid() }));

        return <View className="product-item">
            <Image className="image" src={imagePath(p.ImagePath)} />
            <View className="content">
                <View className="name">
                    {p.Name}
                </View>
                <View className="row">
                    <View className="left" >
                        {leftParts.map(c => <React.Fragment key={c.id}>
                            {this.renderProductPart(c)}
                        </React.Fragment>)}
                    </View>
                    <View className="right">
                        {rightParts.map(c => <React.Fragment key={c.id}>
                            {this.renderProductPart(c)}
                        </React.Fragment>)}
                    </View>
                </View>
            </View>
        </View>
    }
}
