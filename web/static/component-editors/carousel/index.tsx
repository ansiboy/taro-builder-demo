import { Component, TextInput } from "maishu-jueying";
import { Props as ComponentProps, Carousel } from "app/components/carousel";
import { ItemsEditor } from "./items-editor";
import { Less } from "maishu-ui-toolkit";
import { pathContact } from "maishu-toolkit";
import { config } from "../../config";

Less.renderByRequireJS(pathContact(config.componentEditorsPath, "carousel/index.less"))

Component.setPropEditor({
    displayName: "自动播放",
    componentType: "Carousel",
    propName: "autoplay",
    editorType: TextInput
})

let items: keyof ComponentProps = "items";
Component.setPropEditor({
    displayName: "轮播图片",
    componentType: Carousel.name,
    propName: items,
    editorType: ItemsEditor
})

