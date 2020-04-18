import { Component, TextInput } from "maishu-jueying";
Component.setPropEditor({
    displayName: "店铺名称",
    componentType: "StoreInfo",
    propName: "name",
    editorType: TextInput
})

Component.setPropEditor({
    displayName: "店铺图标",
    componentType: "StoreInfo",
    propName: "logo",
    editorType: TextInput
})
