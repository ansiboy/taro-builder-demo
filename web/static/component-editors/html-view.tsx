import { Component, TextInput } from "maishu-jueying";
import { HTMLEditor } from "./html-editor";
Component.setPropEditor({
    displayName: "内容",
    componentType: "HtmlView",
    propName: "html",
    editorType: HTMLEditor
})