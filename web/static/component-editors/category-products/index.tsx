import { Props as ComponentProps } from "app/components/category-products";
import { Component } from "maishu-jueying";
import { CategoriesEditor } from "./tabs-editor";
import { ProductPartsEditor } from "./product-parts-editor";
import { createItemsEditor } from "../controls/items-editor";
import { ProductPart } from "app/components/product/product-parts";
import { defaultProps } from "app/components/default-props";

let categories: keyof ComponentProps = "categories";
Component.setPropEditor({
    displayName: "商品分类",
    componentType: "CategoryProducts",
    propName: categories,
    editorType: CategoriesEditor,
})

let productParts: keyof ComponentProps = "productParts"
Component.setPropEditor({
    displayName: "商品信息",
    componentType: "CategoryProducts",
    propName: productParts,
    editorType: createItemsEditor<ProductPart>({
        nameField: "name"
    }),
    defaultValue: defaultProps.categoryProducts.productParts
})

