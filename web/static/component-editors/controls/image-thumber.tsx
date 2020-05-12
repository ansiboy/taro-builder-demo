import React = require("react");
import * as ui from "maishu-ui-toolkit";
import { Less } from 'maishu-ui-toolkit';

import websiteConfig from "json!websiteConfig";
import { pathContact } from "maishu-toolkit";
import common from "./common";
let contextName = websiteConfig.requirejs.context;

type ImageThumberProps = React.Props<ImageThumber> & {
    imagePath: string, remove?: (imagePath: string) => Promise<any>,
    className?: string, onClick?: (sender: ImageThumber, e: React.MouseEvent) => void,
    selectedText?: string,
    text?: string, title?: string,
    disabled?: boolean
}

type ImageThumberState = {
    // selectedText: string
}

Less.renderByRequireJS(pathContact(common.path, "image-thumber.less"), { contextName });
export default class ImageThumber extends React.Component<ImageThumberProps, ImageThumberState>{
    constructor(props) {
        super(props);
        this.state = { selectedText: '' }
    }
    private setDeleteButton(e: HTMLButtonElement, imagePath: string) {
        if (!e) return;
        ui.buttonOnClick(e,
            (e) => {
                e.stopPropagation();
                e.cancelBubble = true;
                return this.props.remove(imagePath)
            },
            {
                confirm: '确定删除该图片吗？'
            });
    }
    render() {
        let { imagePath, className, onClick, selectedText, text, title, disabled } = this.props;
        className = className || '';
        text = text || '';
        return (
            <div className={`image-thumber ${className}`} title={title} data-url={imagePath}
                onClick={(e) => {
                    if (disabled)
                        return

                    this.props.onClick ? this.props.onClick(this, e) : null
                }}>
                <div className={`item text-center  ${selectedText ? 'selected' : ''}`}>
                    <div className="triangle"></div>
                    <div className="top">
                        {selectedText}
                    </div>
                    {this.props.remove ?
                        <div className="remove">
                            <i className="icon-remove" ref={(e: any) => this.setDeleteButton(e, imagePath)} />
                        </div> : null}
                    <img src={imagePath}
                        ref={(e: HTMLImageElement) => e ? ui.renderImage(e, { imageSize: { width: 150, height: 150 } }) : null} />
                    <div className="bottom">
                        {text}
                    </div>
                    {disabled ? <div className="disabled"></div> : null}
                </div>
            </div>
        );
    }
}
