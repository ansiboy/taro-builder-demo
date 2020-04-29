import { PropEditor } from "maishu-jueying";
import React = require("react");
// import { createService } from "../../components/common/base-component";
// import { ShoppingService } from "../../mobile/services/shoppingService";
// import { ImageService } from "maishu-services-sdk";
import { renderImage } from "maishu-ui-toolkit";
// import { ProductSelectDialog } from "../../controls/product-select-dialog";
import { Product, ComponentProps } from "./declare";

interface ProductSourceEditorState {
    products?: Product[]
}
export class ProductSourceEditor extends PropEditor<ProductSourceEditorState, ComponentProps["productIds"]> {

    render() {
        return <div>Not implement.</div>
    }
}
