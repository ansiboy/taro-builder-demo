import { PropEditor, PropEditorState } from "maishu-jueying";
import { showImageDialog } from "./image-manager";
import { ImageService } from "../../services/image-service";
import { errorHandle } from "maishu-chitu-admin/static";
import React from "react";

export class ImageInput extends PropEditor<PropEditorState<string>, string> {
    selectImage() {
        showImageDialog(1, (imageIds) => {
            let s = new ImageService(err => errorHandle(err));
            let url = s.imageSource(imageIds[0], 200, 200);
            this.props.updateComponentProp(url);
        })
    }
    render() {
        return <div className="input-group">
            <input type="text" className="form-control" value={this.props.value || ""}
                onChange={e => {
                    this.props.updateComponentProp(e.target.value);
                }} />
            <span className="input-group-btn">
                <button className="btn btn-default" type="button"
                    onClick={() => this.selectImage()} >
                    选择图片
                </button>
            </span>
        </div>
    }
}
