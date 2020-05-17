import { Menu, Props } from "app/components/menu";
import { Component } from "maishu-jueying";
import { MenuNodeList } from "./menu-node-list";
import "./index.scss";
import { toggle } from "../custom-prop-editors";
import { defaultProps } from "app/components/default-props";

let componentType: keyof { Menu: Menu } = "Menu";
let showMenuIconProp: keyof Props = "showMenuIcon";
Component.setPropEditor({
    displayName: "显示图标",
    componentType,
    propName: showMenuIconProp,
    editorType: toggle(),
    defaultValue: defaultProps.menu.showMenuIcon,
})

let itemsProp: keyof Props = "items";
Component.setPropEditor({
    displayName: "菜单项",
    componentType,
    propName: itemsProp,
    editorType: MenuNodeList,
    defaultValue: defaultProps.menu.items,
})