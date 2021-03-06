import { Component } from "maishu-jueying";
import { Props as ComponentProps, Carousel } from "app/components/carousel";
import { ItemsEditor } from "./items-editor";
import { Less } from "maishu-ui-toolkit";
import { pathContact } from "maishu-toolkit";
import { config } from "../../config";
import { toggle } from "../custom-prop-editors";
import { defaultProps } from "app/components/default-props";

let componentType: keyof { Carousel: Carousel } = "Carousel";

Less.renderByRequireJS(pathContact(config.componentEditorsPath, "carousel/index.less"))
let autoplay: keyof ComponentProps = "autoplay";
Component.setPropEditor({
    displayName: "自动播放",
    componentType: "Carousel",
    propName: autoplay,
    editorType: toggle(),
    defaultValue: defaultProps.carousel.autoplay
})

let items: keyof ComponentProps = "items";
Component.setPropEditor({
    displayName: "轮播图片",
    componentType: componentType,
    propName: items,
    editorType: ItemsEditor,
    defaultValue: defaultProps.carousel.items,
})

