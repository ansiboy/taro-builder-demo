import { Component, TextInput, PropEditor, PropEditorState } from "maishu-jueying";
import "./ue-ext";
import React = require("react");
import { createEditor } from "./ue-ext";
import { guid } from "maishu-toolkit";

class HTMLEditor extends PropEditor<PropEditorState<string>, string> {
    element: HTMLElement;
    elementId = guid();
    input: any;

    componentDidMount() {
        createEditor(this.elementId, this.input, (html) => {
            this.props.updateComponentProp(html);
        })
    }

    render() {
        let html = this.props.value || "";
        return <div key={this.elementId} className="form-group">
            <script id={this.elementId} type="text/html" dangerouslySetInnerHTML={{ __html: this.props.value || '' }} />
            <input type="hidden" value={html} ref={(e: HTMLInputElement) => this.input = e || this.input} />
        </div>
    }
}

Component.setPropEditor({
    displayName: "内容",
    componentType: "HtmlView",
    propName: "html",
    editorType: HTMLEditor
})