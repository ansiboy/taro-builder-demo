import { Props as CompoenntProps } from "app/components/category-products";
import { Component } from "maishu-jueying";
import { TabsEditor } from "./tabs-editor";

let tabs: keyof CompoenntProps = "tabs";
Component.setPropEditor({
    displayName: "商品标签",
    componentType: "CategoryProducts",
    propName: tabs,
    editorType: TabsEditor,
})

