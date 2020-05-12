import { PropEditor } from "maishu-jueying";
import React = require("react");
import { Props as ComponentProps } from "app/components/single-column-products";
import { Product } from "../../models/shopping";
import { ShoppingService } from "../../services/shopping";
import { errorHandle } from "maishu-chitu-admin/static";
import { ProductSelectDialog } from "../controls/product-select-dialog";
import { renderImage } from "maishu-ui-toolkit";
import { ImageService } from "../../services/image-service";

interface ProductSourceEditorState {
    products?: Product[]
}
export class ProductSourceEditor extends PropEditor<ProductSourceEditorState, ComponentProps["productIds"]> {
    shoppingService: ShoppingService;
    productThumbers: HTMLElement;
    imageService: ImageService;

    constructor(props: ProductSourceEditor["props"]) {
        super(props);

        this.state = { products: [] };
        this.shoppingService = new ShoppingService(errorHandle);
        this.imageService = new ImageService(errorHandle);
    }
    setProductDelete(e: HTMLButtonElement, productId: string) {
        if (!e || e.onclick)
            return;

        e.onclick = () => {
            let value = this.props.value.filter(o => o != productId);
            this.props.updateComponentProp(value);
        }
    }
    setProductAdd(e: HTMLElement) {
        if (!e || e.onclick)
            return;

        e.onclick = () => {
            ProductSelectDialog.show((products) => {
                let productIds = this.props.value || [];

                // 排除已存在的 product id
                let newProductIds = products.map(o => o.Id).filter(o => productIds.indexOf(o) < 0)
                productIds.push(...newProductIds);

                //=================================================
                // 更改组件的值
                this.props.updateComponentProp(productIds);
                //=================================================
            });
        }
    }

    async componentDidMount() {
        this.loadProducts(this.props);
    }
    async UNSAFE_componentWillReceiveProps(props: ProductSourceEditor["props"]) {
        this.loadProducts(props);
    }
    async loadProducts(props: ProductSourceEditor["props"]) {
        console.assert(props != null);
        if (props.value != null && props.value.length > 0) {
            let products = await this.shoppingService.productsByIds(props.value);
            this.setState({ products });
        }
    }
    render() {
        let { products } = this.state;
        products = products || [];
        return <div className="product-list-editor">
            <ul className="selected-products"
                ref={(e: HTMLElement) => this.productThumbers = e || this.productThumbers}>
                {products.map(o =>
                    <li key={o.Id} product-id={o.Id} title="拖动图标可以对商品进行排序">
                        <img key={o.Id} src={this.imageService.imageSource(o.ImagePath, 100)}
                            ref={(e: HTMLImageElement) => e ? renderImage(e) : null} />
                        <div className="delete">
                            <button type="button" className="btn-link"
                                ref={(e: HTMLButtonElement) => this.setProductDelete(e, o.Id)}>
                                删除
                    </button>
                        </div>
                    </li>
                )}
                <li className="product-add">
                    <i className="icon-plus icon-4x" ref={(e: HTMLElement) => this.setProductAdd(e)} />
                </li>
            </ul>
        </div>
    }
}


