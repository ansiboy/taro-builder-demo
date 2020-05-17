import { Component, PropEditor, DropDownItem } from "maishu-jueying";
import { Props as ComponentProps } from "app/components/single-column-products";
import { ProductSourceEditor } from "./product-source-editor";
import { toggle } from "../custom-prop-editors";

let imageSize: keyof ComponentProps = "imageSize";
let productNameLines: keyof ComponentProps = "productNameLines";
let productSourceType: keyof ComponentProps = "productSourceType";
let productIds: keyof ComponentProps = "productIds";
let componentType = "SingleColumnProducts";

Component.setPropEditor({
    componentType,
    propName: productSourceType,
    editorType: PropEditor.dropdown({
        "all": "所有商品",
        "category": "品类",
        "custom": "手动添加"
    }),
    displayName: "数据来源",
});

Component.setPropEditor({
    componentType,
    propName: productIds,
    editorType: ProductSourceEditor,
    display: (componentData) => {
        let props = componentData.props as ComponentProps;
        return props.productSourceType == "custom";
    },
    displayName: "选取商品"
});

let categoryId: keyof ComponentProps = "categoryId";
Component.setPropEditor({
    componentType,
    propName: categoryId,
    editorType: PropEditor.dropdown(getCategories(), "string"),
    displayName: "品类",
    display: (componentData) => {
        let props = componentData.props as ComponentProps;
        return props.productSourceType == "category";
    }
})

Component.setPropEditor({
    componentType,
    propName: imageSize,
    editorType: PropEditor.dropdown({
        small: "小",
        medium: "中",
        large: "大"
    }),
    displayName: "图片大小",
});

Component.setPropEditor({
    componentType,
    propName: productNameLines,
    editorType: PropEditor.dropdown({
        singleLine: "单行文字",
        doubleColumn: "双行文字"
    }),
    displayName: "商品名称",
});

let productsCount: keyof ComponentProps = "productsCount";
// let dropdownValues: ComponentProps["productsCount"][] = [1, 2, 3, 4, 5, 6, 7, 8, 0];
Component.setPropEditor({
    componentType,
    propName: productsCount,
    editorType: PropEditor.dropdown(Promise.resolve([
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "全部", value: 2000 },
    ]), "number"),
    displayName: "商品数量",
});

let showCategories: keyof ComponentProps = "showCategories";
Component.setPropEditor({
    componentType,
    propName: showCategories,
    editorType: toggle({ defaultValue: false }),
    displayName: "显示类别"
});



async function getCategories(): Promise<DropDownItem[]> {
    // let categories = await shoppingService.categories() || [];
    // let items: DropDownItem[] = categories.map(o => ({ text: o.Name, value: o.Id }));
    let items: DropDownItem[] = [];
    items.unshift({ text: "全部品类", value: "" });
    return items;
}

