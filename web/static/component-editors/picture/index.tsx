import { PropEditor, PropEditorState, Component } from "maishu-jueying";
import React from "react";
import Picture, { Props as PictureProps } from "app/components/picture";
import { ImageInput } from "../controls/image-input";
import { ItemsEditor } from "../carousel/items-editor";
import { createItemsEditor } from "../controls/items-editor";
import { showPageDialog } from "../controls/select-dialogs/page-select-dialog";

let sourceProp: keyof PictureProps = "source";
Component.setPropEditor({
    displayName: "图片",
    componentType: "Picture",
    propName: sourceProp,
    editorType: ImageInput
})

type T = PictureProps["targetPages"][0]
let urlProp: keyof PictureProps = "targetPages";
Component.setPropEditor({
    displayName: "页面链接",
    componentType: "Picture",
    propName: urlProp,
    editorType: createItemsEditor<T>({
        nameField: "name",
        add: async () => {
            return new Promise<T>((resolve, reject) => {
                showPageDialog(item => {
                    resolve({ name: item.name, id: item.id });
                })
            })
        }
    }),
    defaultValue: []
})


